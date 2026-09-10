import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/auth";
import { scheduleEventSchema } from "@/features/schedule/schedule-schema";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ eventId: string }> };
const eventInclude = { course: { select: { id: true, courseCode: true, title: true, color: true } } } as const;

async function findOwnedEvent(eventId: string, userId: string) {
  return prisma.scheduleEvent.findFirst({ where: { id: eventId, userId }, include: eventInclude });
}

async function hasConflict(userId: string, values: { dayOfWeek: number; startTime: string; endTime: string }, excludeId: string) {
  return prisma.scheduleEvent.findFirst({ where: { userId, dayOfWeek: values.dayOfWeek, NOT: { id: excludeId }, startTime: { lt: values.endTime }, endTime: { gt: values.startTime } }, select: { title: true, startTime: true, endTime: true } });
}

export async function GET(_: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const event = await findOwnedEvent((await params).eventId, session.user.id);
  if (!event) return NextResponse.json({ error: "Schedule event not found." }, { status: 404 });
  return NextResponse.json({ event });
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const parsed = scheduleEventSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid event data." }, { status: 400 });
    const { eventId } = await params;
    const existingEvent = await findOwnedEvent(eventId, session.user.id);
    if (!existingEvent) return NextResponse.json({ error: "Schedule event not found." }, { status: 404 });
    if (parsed.data.courseId) {
      const course = await prisma.course.findFirst({ where: { id: parsed.data.courseId, userId: session.user.id } });
      if (!course) return NextResponse.json({ error: "Select one of your courses." }, { status: 400 });
    }
    const conflict = await hasConflict(session.user.id, parsed.data, eventId);
    if (conflict) return NextResponse.json({ error: `This overlaps with ${conflict.title} (${conflict.startTime}–${conflict.endTime}).` }, { status: 409 });
    const event = await prisma.scheduleEvent.update({ where: { id: eventId }, data: parsed.data, include: eventInclude });
    return NextResponse.json({ event });
  } catch {
    return NextResponse.json({ error: "Unable to update event." }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { eventId } = await params;
  const event = await findOwnedEvent(eventId, session.user.id);
  if (!event) return NextResponse.json({ error: "Schedule event not found." }, { status: 404 });
  await prisma.scheduleEvent.delete({ where: { id: eventId } });
  return NextResponse.json({ success: true });
}