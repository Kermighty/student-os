import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/auth";
import { categorySchema } from "@/features/expenses/expense-schema";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ categoryId: string }> };

export async function PATCH(request: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = categorySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid category data." }, { status: 400 });
  try {
    const category = await prisma.expenseCategory.updateMany({ where: { id: (await params).categoryId, userId: session.user.id }, data: parsed.data });
    if (!category.count) return NextResponse.json({ error: "Category not found." }, { status: 404 });
    const updated = await prisma.expenseCategory.findFirst({ where: { id: (await params).categoryId, userId: session.user.id } });
    return NextResponse.json({ category: updated });
  } catch {
    return NextResponse.json({ error: "Unable to update category." }, { status: 409 });
  }
}

export async function DELETE(_: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const result = await prisma.expenseCategory.deleteMany({ where: { id: (await params).categoryId, userId: session.user.id } });
    if (!result.count) return NextResponse.json({ error: "Category not found or still in use." }, { status: 409 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Category cannot be deleted while transactions use it." }, { status: 409 });
  }
}