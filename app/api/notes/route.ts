import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/auth";
import { noteSchema } from "@/features/notes/note-schema";
import { prisma } from "@/lib/prisma";

const noteInclude = { course: { select: { id: true, courseCode: true, title: true, color: true } } } as const;

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.trim();
  const courseId = searchParams.get("courseId");
  const pinned = searchParams.get("pinned");

  const notes = await prisma.note.findMany({
    where: {
      userId: session.user.id,
      ...(courseId === "personal" ? { courseId: null } : courseId ? { courseId } : {}),
      ...(pinned === "true" ? { pinned: true } : {}),
      ...(search ? { OR: [{ title: { contains: search, mode: "insensitive" } }, { content: { contains: search, mode: "insensitive" } }] } : {}),
    },
    include: noteInclude,
    orderBy: [{ pinned: "desc" }, { updatedAt: "desc" }],
  });

  return NextResponse.json({ notes });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const parsed = noteSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid note data." }, { status: 400 });

    if (parsed.data.courseId) {
      const course = await prisma.course.findFirst({ where: { id: parsed.data.courseId, userId: session.user.id } });
      if (!course) return NextResponse.json({ error: "Select one of your courses." }, { status: 400 });
    }

    const note = await prisma.note.create({ data: { ...parsed.data, userId: session.user.id }, include: noteInclude });
    return NextResponse.json({ note }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create note." }, { status: 500 });
  }
}