import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { AppShell } from "@/components/layout/app-shell";
import { ensureBuiltInCategories, serializeExpense } from "@/features/expenses/expense-data";
import { ExpenseOverview } from "@/features/expenses/expense-overview";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ExpensesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  await ensureBuiltInCategories(session.user.id);
  const [expenses, categories] = await Promise.all([
    prisma.expense.findMany({ where: { userId: session.user.id }, include: { category: true }, orderBy: { transactionDate: "desc" } }),
    prisma.expenseCategory.findMany({ where: { userId: session.user.id }, orderBy: { name: "asc" } }),
  ]);
  return <AppShell><ExpenseOverview initialExpenses={expenses.map(serializeExpense)} initialCategories={categories.map((category) => ({ ...category, createdAt: category.createdAt.toISOString() }))} /></AppShell>;
}