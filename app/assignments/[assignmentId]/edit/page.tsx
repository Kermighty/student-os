import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { AppShell } from "@/components/layout/app-shell";
import { AssignmentForm } from "@/features/assignments/assignment-form";
import { formatDateTimeLocal } from "@/features/assignments/assignment-schema";
import { PageHeader } from "@/components/ui/page-header";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditAssignmentPage({ params }: { params: Promise<{ assignmentId: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  const { assignmentId } = await params;
  const [assignment, courses] = await Promise.all([
    prisma.assignment.findFirst({ where: { id: assignmentId, userId: session.user.id }, include: { course: true } }),
    prisma.course.findMany({ where: { userId: session.user.id }, select: { id: true, courseCode: true, title: true, color: true }, orderBy: { courseCode: "asc" } }),
  ]);
  if (!assignment) notFound();

  return <AppShell><div className="space-y-6"><PageHeader title="Edit assignment" description="Keep the details and deadline aligned with your actual plan." /><AssignmentForm courses={courses} mode="edit" assignmentId={assignment.id} defaultValues={{ courseId: assignment.courseId, title: assignment.title, description: assignment.description, dueDate: formatDateTimeLocal(assignment.dueDate), priority: assignment.priority, status: assignment.status }} /></div></AppShell>;
}