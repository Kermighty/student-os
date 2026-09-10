import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { AppShell } from "@/components/layout/app-shell";
import { AssignmentDetail } from "@/features/assignments/assignment-detail";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AssignmentDetailPage({ params }: { params: Promise<{ assignmentId: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  const { assignmentId } = await params;
  const assignment = await prisma.assignment.findFirst({ where: { id: assignmentId, userId: session.user.id }, include: { course: true } });
  if (!assignment) notFound();

  return <AppShell><AssignmentDetail assignment={{ ...assignment, dueDate: assignment.dueDate.toISOString(), createdAt: assignment.createdAt.toISOString(), updatedAt: assignment.updatedAt.toISOString() }} /></AppShell>;
}