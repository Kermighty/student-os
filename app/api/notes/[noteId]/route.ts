import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/auth";
import { noteSchema } from "@/features/notes/note-schema";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ noteId: string }> };
const noteInclude = { course: { select: { id: true, courseCode: true, title: true, color: true } } } as const;

async function findOwnedNote(noteId: string, userId: string) {
  return prisma.note.findFirst({ where: { id: noteId, userId }, include: noteInclude });
}

export async function GET(_: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const note = await findOwnedNote((await params).noteId, session.user.id);
  if (!note) return NextResponse.json({ error: "Note not found." }, { status: 404 });
  return NextResponse.json({ note });
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const parsed = noteSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid note data." }, { status: 400 });
    const { noteId } = await params;
    const existingNote = await findOwnedNote(noteId, session.user.id);
    if (!existingNote) return NextResponse.json({ error: "Note not found." }, { status: 404 });

    if (parsed.data.courseId) {
      const course = await prisma.course.findFirst({ where: { id: parsed.data.courseId, userId: session.user.id } });
      if (!course) return NextResponse.json({ error: "Select one of your courses." }, { status: 400 });
    }

    const note = await prisma.note.update({ where: { id: noteId }, data: parsed.data, include: noteInclude });
    return NextResponse.json({ note });
  } catch {
    return NextResponse.json({ error: "Unable to update note." }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { noteId } = await params;
  const note = await findOwnedNote(noteId, session.user.id);
  if (!note) return NextResponse.json({ error: "Note not found." }, { status: 404 });
  await prisma.note.delete({ where: { id: noteId } });
  return NextResponse.json({ success: true });
}