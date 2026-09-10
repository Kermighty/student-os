import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/ui/page-header";
import { ensureBuiltInCategories, serializeExpense } from "@/features/expenses/expense-data";
import { formatDateInput } from "@/features/expenses/expense-schema";
import { ExpenseForm } from "@/features/expenses/expense-form";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditExpensePage({ params }: { params: Promise<{ expenseId: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  await ensureBuiltInCategories(session.user.id);
  const [expense, categories] = await Promise.all([
    prisma.expense.findFirst({ where: { id: (await params).expenseId, userId: session.user.id }, include: { category: true } }),
    prisma.expenseCategory.findMany({ where: { userId: session.user.id }, orderBy: { name: "asc" } }),
  ]);
  if (!expense) notFound();
  const serialized = serializeExpense(expense);
  return <AppShell><div className="space-y-6"><PageHeader title="Edit transaction" description="Keep your money history accurate and useful." /><ExpenseForm categories={categories.map((category) => ({ ...category, createdAt: category.createdAt.toISOString() }))} mode="edit" expenseId={expense.id} defaultValues={{ categoryId: expense.categoryId, title: expense.title, amount: serialized.amount, type: expense.type, transactionDate: formatDateInput(expense.transactionDate), paymentMethod: expense.paymentMethod, notes: expense.notes }} /></div></AppShell>;
}