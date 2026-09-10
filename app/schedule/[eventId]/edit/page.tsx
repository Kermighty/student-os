import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/ui/page-header";
import { ScheduleForm } from "@/features/schedule/schedule-form";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditSchedulePage({ params }: { params: Promise<{ eventId: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  const eventId = (await params).eventId;
  const [event, courses] = await Promise.all([
    prisma.scheduleEvent.findFirst({ where: { id: eventId, userId: session.user.id } }),
    prisma.course.findMany({ where: { userId: session.user.id }, select: { id: true, courseCode: true, title: true, color: true }, orderBy: { courseCode: "asc" } }),
  ]);
  if (!event) notFound();
  return <AppShell><div className="space-y-6"><PageHeader title="Edit event" description="Keep your weekly rhythm accurate and conflict-free." /><ScheduleForm courses={courses} mode="edit" eventId={event.id} defaultValues={{ courseId: event.courseId ?? "", title: event.title, eventType: event.eventType, dayOfWeek: event.dayOfWeek, startTime: event.startTime, endTime: event.endTime, location: event.location, color: event.color as "blue" | "emerald" | "rose" | "violet" }} /></div></AppShell>;
}