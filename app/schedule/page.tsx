import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { AppShell } from "@/components/layout/app-shell";
import { ScheduleCalendar } from "@/features/schedule/schedule-calendar";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  const [events, courses] = await Promise.all([
    prisma.scheduleEvent.findMany({ where: { userId: session.user.id }, include: { course: { select: { id: true, courseCode: true, title: true, color: true } } }, orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }] }),
    prisma.course.findMany({ where: { userId: session.user.id }, select: { id: true, courseCode: true, title: true, color: true }, orderBy: { courseCode: "asc" } }),
  ]);
  return <AppShell><ScheduleCalendar initialEvents={events.map((event) => ({ ...event, createdAt: event.createdAt.toISOString(), updatedAt: event.updatedAt.toISOString() }))} courses={courses} /></AppShell>;
}