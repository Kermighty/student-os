import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/auth";
import { courseSchema } from "@/features/courses/course-schema";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: Promise<{ courseId: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { courseId } = await params;
  const course = await prisma.course.findUnique({ where: { id: courseId } });

  if (!course) {
    return NextResponse.json({ error: "Course not found." }, { status: 404 });
  }

  if (course.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ course });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ courseId: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = courseSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid course data." }, { status: 400 });
    }

    const { courseId } = await params;
    const course = await prisma.course.findUnique({ where: { id: courseId } });

    if (!course) {
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    if (course.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updatedCourse = await prisma.course.update({
      where: { id: courseId },
      data: {
        courseCode: parsed.data.courseCode,
        title: parsed.data.title,
        instructor: parsed.data.instructor,
        room: parsed.data.room,
        semester: parsed.data.semester,
        color: parsed.data.color,
        credits: parsed.data.credits,
      },
    });

    return NextResponse.json({ course: updatedCourse });
  } catch {
    return NextResponse.json({ error: "Unable to update course." }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ courseId: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { courseId } = await params;
  const course = await prisma.course.findUnique({ where: { id: courseId } });

  if (!course) {
    return NextResponse.json({ error: "Course not found." }, { status: 404 });
  }

  if (course.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.course.delete({ where: { id: courseId } });

  return NextResponse.json({ success: true });
}
