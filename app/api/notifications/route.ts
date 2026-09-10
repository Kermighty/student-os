import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const now = new Date();
  const today = now.getDay() || 7;
  const nextWeek = new Date(now);
  nextWeek.setDate(now.getDate() + 7);
  const recentStart = new Date(now);
  recentStart.setDate(now.getDate() - 7);

  const [classes, assignments, notes, expenses] = await Promise.all([
    prisma.scheduleEvent.findMany({ where: { userId: session.user.id, dayOfWeek: today }, orderBy: { startTime: "asc" }, take: 5, select: { id: true, title: true, startTime: true, location: true } }),
    prisma.assignment.findMany({ where: { userId: session.user.id, status: { not: "COMPLETED" }, dueDate: { gte: now, lte: nextWeek } }, orderBy: { dueDate: "asc" }, take: 5, select: { id: true, title: true, dueDate: true } }),
    prisma.note.findMany({ where: { userId: session.user.id, createdAt: { gte: recentStart } }, orderBy: { createdAt: "desc" }, take: 5, select: { id: true, title: true, createdAt: true } }),
    prisma.expense.findMany({ where: { userId: session.user.id, createdAt: { gte: recentStart } }, orderBy: { createdAt: "desc" }, take: 5, select: { id: true, title: true, createdAt: true } }),
  ]);

  return NextResponse.json({
    today: { classes, assignments },
    recent: { notes, expenses },
  });
}
