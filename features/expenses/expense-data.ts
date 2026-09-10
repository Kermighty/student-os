import { prisma } from "@/lib/prisma";
import { builtInCategories } from "@/features/expenses/expense-schema";

export async function ensureBuiltInCategories(userId: string) {
  await prisma.$transaction(builtInCategories.map((category) => prisma.expenseCategory.upsert({ where: { userId_name: { userId, name: category.name } }, update: {}, create: { userId, name: category.name, color: category.color } })));
}

export function serializeExpense(expense: { id: string; title: string; amount: unknown; type: "EXPENSE" | "INCOME"; transactionDate: Date; paymentMethod: string; notes: string; createdAt: Date; updatedAt: Date; category: { id: string; name: string; color: string; createdAt: Date } }) {
  return { ...expense, amount: Number(expense.amount), transactionDate: expense.transactionDate.toISOString(), createdAt: expense.createdAt.toISOString(), updatedAt: expense.updatedAt.toISOString(), category: { ...expense.category, createdAt: expense.category.createdAt.toISOString() } };
}

export function monthRange(month: string | null) {
  if (!month || !/^\d{4}-\d{2}$/.test(month)) return undefined;
  const [year, monthNumber] = month.split("-").map(Number);
  const start = new Date(Date.UTC(year, monthNumber - 1, 1));
  const end = new Date(Date.UTC(year, monthNumber, 1));
  return { gte: start, lt: end };
}