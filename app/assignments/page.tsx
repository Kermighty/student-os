import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { AppShell } from "@/components/layout/app-shell";
import { AssignmentOverview } from "@/features/assignments/assignment-overview";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AssignmentsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const [assignments, courses] = await Promise.all([
    prisma.assignment.findMany({ where: { userId: session.user.id }, include: { course: { select: { id: true, courseCode: true, title: true, color: true } } }, orderBy: { dueDate: "asc" } }),
    prisma.course.findMany({ where: { userId: session.user.id }, select: { id: true, courseCode: true, title: true, color: true }, orderBy: { courseCode: "asc" } }),
  ]);

  return <AppShell><AssignmentOverview initialAssignments={assignments.map((assignment) => ({ ...assignment, dueDate: assignment.dueDate.toISOString(), createdAt: assignment.createdAt.toISOString(), updatedAt: assignment.updatedAt.toISOString() }))} courses={courses} /></AppShell>;
}