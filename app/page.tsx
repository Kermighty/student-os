import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { AppShell } from "@/components/layout/app-shell";
import { authOptions } from "@/auth";
import { DashboardPage } from "@/features/dashboard/dashboard-page";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const [pendingAssignments, completedAssignments, upcomingAssignments] = await Promise.all([
    prisma.assignment.count({ where: { userId: session.user.id, status: { not: "COMPLETED" } } }),
    prisma.assignment.count({ where: { userId: session.user.id, status: "COMPLETED" } }),
    prisma.assignment.findMany({
      where: { userId: session.user.id, status: { not: "COMPLETED" } },
      include: { course: { select: { id: true, courseCode: true, title: true, color: true } } },
      orderBy: { dueDate: "asc" },
      take: 4,
    }),
  ]);

  return (
    <AppShell>
      <DashboardPage
        name={session.user?.name ?? "Student"}
        assignmentSummary={{ pending: pendingAssignments, completed: completedAssignments }}
        upcomingAssignments={upcomingAssignments.map((assignment) => ({
          ...assignment,
          dueDate: assignment.dueDate.toISOString(),
          createdAt: assignment.createdAt.toISOString(),
          updatedAt: assignment.updatedAt.toISOString(),
        }))}
      />
    </AppShell>
  );
}
