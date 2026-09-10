import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/auth";
import { ensureBuiltInCategories } from "@/features/expenses/expense-data";
import { categorySchema } from "@/features/expenses/expense-schema";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureBuiltInCategories(session.user.id);
  const categories = await prisma.expenseCategory.findMany({ where: { userId: session.user.id }, orderBy: { name: "asc" } });
  return NextResponse.json({ categories });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = categorySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid category data." }, { status: 400 });
  try {
    const category = await prisma.expenseCategory.create({ data: { ...parsed.data, userId: session.user.id } });
    return NextResponse.json({ category }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "A category with this name already exists." }, { status: 409 });
  }
}