import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { AppShell } from "@/components/layout/app-shell";
import { serializeExpense } from "@/features/expenses/expense-data";
import { ExpenseDetail } from "@/features/expenses/expense-detail";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ExpenseDetailPage({ params }: { params: Promise<{ expenseId: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  const expense = await prisma.expense.findFirst({ where: { id: (await params).expenseId, userId: session.user.id }, include: { category: true } });
  if (!expense) notFound();
  return <AppShell><ExpenseDetail expense={serializeExpense(expense)} /></AppShell>;
}