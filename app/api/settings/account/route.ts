import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";

const deleteSchema = z.object({ confirmation: z.literal("DELETE") });

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = deleteSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Type DELETE to confirm account deletion." }, { status: 400 });
  await prisma.$transaction(async (transaction) => {
    await transaction.expense.deleteMany({ where: { userId: session.user.id } });
    await transaction.expenseCategory.deleteMany({ where: { userId: session.user.id } });
    await transaction.user.delete({ where: { id: session.user.id } });
  });
  return NextResponse.json({ success: true });
}