import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { AppShell } from "@/components/layout/app-shell";
import { authOptions } from "@/auth";
import { DashboardPage } from "@/features/dashboard/dashboard-page";
import { serializeExpense } from "@/features/expenses/expense-data";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const today = new Date().getDay() || 7;
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const nextMonthStart = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);
  const [pendingAssignments, completedAssignments, upcomingAssignments, recentNotes, todaySchedule, monthlyExpenses, recentExpenses] = await Promise.all([
    prisma.assignment.count({ where: { userId: session.user.id, status: { not: "COMPLETED" } } }),
    prisma.assignment.count({ where: { userId: session.user.id, status: "COMPLETED" } }),
    prisma.assignment.findMany({
      where: { userId: session.user.id, status: { not: "COMPLETED" } },
      include: { course: { select: { id: true, courseCode: true, title: true, color: true } } },
      orderBy: { dueDate: "asc" },
      take: 4,
    }),
    prisma.note.findMany({
      where: { userId: session.user.id },
      include: { course: { select: { id: true, courseCode: true, title: true, color: true } } },
      orderBy: [{ pinned: "desc" }, { updatedAt: "desc" }],
      take: 4,
    }),
    prisma.scheduleEvent.findMany({
      where: { userId: session.user.id, dayOfWeek: today },
      include: { course: { select: { id: true, courseCode: true, title: true, color: true } } },
      orderBy: { startTime: "asc" },
    }),
    prisma.expense.findMany({
      where: { userId: session.user.id, transactionDate: { gte: monthStart, lt: nextMonthStart } },
      include: { category: true },
    }),
    prisma.expense.findMany({
      where: { userId: session.user.id },
      include: { category: true },
      orderBy: { transactionDate: "desc" },
      take: 3,
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
        recentNotes={recentNotes.map((note) => ({
          ...note,
          createdAt: note.createdAt.toISOString(),
          updatedAt: note.updatedAt.toISOString(),
        }))}
        todaySchedule={todaySchedule.map((event) => ({
          ...event,
          createdAt: event.createdAt.toISOString(),
          updatedAt: event.updatedAt.toISOString(),
        }))}
        financeSummary={{
          expenses: monthlyExpenses.filter((expense) => expense.type === "EXPENSE").reduce((sum, expense) => sum + Number(expense.amount), 0),
          income: monthlyExpenses.filter((expense) => expense.type === "INCOME").reduce((sum, expense) => sum + Number(expense.amount), 0),
        }}
        recentExpenses={recentExpenses.map(serializeExpense)}
      />
    </AppShell>
  );
}
