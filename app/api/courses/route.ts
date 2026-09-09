import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/auth";
import { courseSchema } from "@/features/courses/course-schema";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const courses = await prisma.course.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ courses });
}

export async function POST(request: Request) {
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

    const course = await prisma.course.create({
      data: {
        userId: session.user.id,
        courseCode: parsed.data.courseCode,
        title: parsed.data.title,
        instructor: parsed.data.instructor,
        room: parsed.data.room,
        semester: parsed.data.semester,
        color: parsed.data.color,
        credits: parsed.data.credits,
      },
    });

    return NextResponse.json({ course }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create course." }, { status: 500 });
  }
}
