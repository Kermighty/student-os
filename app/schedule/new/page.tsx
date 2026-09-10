import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/ui/page-header";
import { ScheduleForm } from "@/features/schedule/schedule-form";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NewSchedulePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  const courses = await prisma.course.findMany({ where: { userId: session.user.id }, select: { id: true, courseCode: true, title: true, color: true }, orderBy: { courseCode: "asc" } });
  return <AppShell><div className="space-y-6"><PageHeader title="New event" description="Shape your week with classes, study sessions, and personal time." /><ScheduleForm courses={courses} mode="create" /></div></AppShell>;
}