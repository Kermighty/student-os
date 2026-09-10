import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/auth";
import { eventTypes, scheduleEventSchema } from "@/features/schedule/schedule-schema";
import { prisma } from "@/lib/prisma";

const eventInclude = { course: { select: { id: true, courseCode: true, title: true, color: true } } } as const;

async function hasConflict(userId: string, values: { dayOfWeek: number; startTime: string; endTime: string }, excludeId?: string) {
  return prisma.scheduleEvent.findFirst({
    where: {
      userId,
      dayOfWeek: values.dayOfWeek,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
      startTime: { lt: values.endTime },
      endTime: { gt: values.startTime },
    },
    select: { id: true, title: true, startTime: true, endTime: true },
  });
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get("courseId");
  const eventType = searchParams.get("eventType");
  const validEventType = eventTypes.includes(eventType as (typeof eventTypes)[number]) ? eventType : undefined;
  const events = await prisma.scheduleEvent.findMany({
    where: { userId: session.user.id, ...(courseId ? { courseId } : {}), ...(validEventType ? { eventType: validEventType as "CLASS" | "STUDY" | "EXAM" | "PERSONAL" } : {}) },
    include: eventInclude,
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });
  return NextResponse.json({ events });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = scheduleEventSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid event data." }, { status: 400 });
    if (parsed.data.courseId) {
      const course = await prisma.course.findFirst({ where: { id: parsed.data.courseId, userId: session.user.id } });
      if (!course) return NextResponse.json({ error: "Select one of your courses." }, { status: 400 });
    }
    const conflict = await hasConflict(session.user.id, parsed.data);
    if (conflict) return NextResponse.json({ error: `This overlaps with ${conflict.title} (${conflict.startTime}–${conflict.endTime}).` }, { status: 409 });
    const event = await prisma.scheduleEvent.create({ data: { ...parsed.data, userId: session.user.id }, include: eventInclude });
    return NextResponse.json({ event }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create event." }, { status: 500 });
  }
}