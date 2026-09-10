import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/auth";
import { serializeExpense } from "@/features/expenses/expense-data";
import { expenseSchema } from "@/features/expenses/expense-schema";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ expenseId: string }> };
const expenseInclude = { category: true } as const;

async function findOwnedExpense(id: string, userId: string) { return prisma.expense.findFirst({ where: { id, userId }, include: expenseInclude }); }

export async function GET(_: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const expense = await findOwnedExpense((await params).expenseId, session.user.id);
  if (!expense) return NextResponse.json({ error: "Transaction not found." }, { status: 404 });
  return NextResponse.json({ expense: serializeExpense(expense) });
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const parsed = expenseSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid transaction data." }, { status: 400 });
    const expenseId = (await params).expenseId;
    const existing = await findOwnedExpense(expenseId, session.user.id);
    if (!existing) return NextResponse.json({ error: "Transaction not found." }, { status: 404 });
    const category = await prisma.expenseCategory.findFirst({ where: { id: parsed.data.categoryId, userId: session.user.id } });
    if (!category) return NextResponse.json({ error: "Select one of your categories." }, { status: 400 });
    const expense = await prisma.expense.update({ where: { id: expenseId }, data: { ...parsed.data, transactionDate: new Date(parsed.data.transactionDate) }, include: expenseInclude });
    return NextResponse.json({ expense: serializeExpense(expense) });
  } catch {
    return NextResponse.json({ error: "Unable to update transaction." }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const expenseId = (await params).expenseId;
  const expense = await findOwnedExpense(expenseId, session.user.id);
  if (!expense) return NextResponse.json({ error: "Transaction not found." }, { status: 404 });
  await prisma.expense.delete({ where: { id: expenseId } });
  return NextResponse.json({ success: true });
}