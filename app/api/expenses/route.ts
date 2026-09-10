import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/auth";
import { ensureBuiltInCategories, monthRange, serializeExpense } from "@/features/expenses/expense-data";
import { expenseSchema } from "@/features/expenses/expense-schema";
import { prisma } from "@/lib/prisma";

const expenseInclude = { category: true } as const;

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureBuiltInCategories(session.user.id);
  const { searchParams } = new URL(request.url);
  const month = monthRange(searchParams.get("month"));
  const categoryId = searchParams.get("categoryId");
  const type = searchParams.get("type");
  const search = searchParams.get("search")?.trim();
  const sort = searchParams.get("sort") ?? "newest";
  const expenses = await prisma.expense.findMany({ where: { userId: session.user.id, ...(month ? { transactionDate: month } : {}), ...(categoryId ? { categoryId } : {}), ...(type === "EXPENSE" || type === "INCOME" ? { type } : {}), ...(search ? { OR: [{ title: { contains: search, mode: "insensitive" } }, { notes: { contains: search, mode: "insensitive" } }] } : {}) }, include: expenseInclude, orderBy: sort === "oldest" ? { transactionDate: "asc" } : sort === "highest" ? { amount: "desc" } : sort === "lowest" ? { amount: "asc" } : { transactionDate: "desc" } });
  return NextResponse.json({ expenses: expenses.map(serializeExpense) });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const parsed = expenseSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid transaction data." }, { status: 400 });
    const category = await prisma.expenseCategory.findFirst({ where: { id: parsed.data.categoryId, userId: session.user.id } });
    if (!category) return NextResponse.json({ error: "Select one of your categories." }, { status: 400 });
    const expense = await prisma.expense.create({ data: { ...parsed.data, userId: session.user.id, transactionDate: new Date(parsed.data.transactionDate) }, include: expenseInclude });
    return NextResponse.json({ expense: serializeExpense(expense) }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create transaction." }, { status: 500 });
  }
}