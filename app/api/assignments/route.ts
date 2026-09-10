import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/auth";
import { assignmentPriorities, assignmentSchema, assignmentStatuses } from "@/features/assignments/assignment-schema";
import { prisma } from "@/lib/prisma";

const priorityRank = { HIGH: 0, MEDIUM: 1, LOW: 2 } as const;

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.trim();
  const courseId = searchParams.get("courseId");
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const sort = searchParams.get("sort") ?? "dueDate";
  const validStatus = assignmentStatuses.includes(status as (typeof assignmentStatuses)[number]) ? status : undefined;
  const validPriority = assignmentPriorities.includes(priority as (typeof assignmentPriorities)[number]) ? priority : undefined;

  const assignments = await prisma.assignment.findMany({
    where: {
      userId: session.user.id,
      ...(courseId ? { courseId } : {}),
      ...(validStatus ? { status: validStatus as "TODO" | "IN_PROGRESS" | "COMPLETED" } : {}),
      ...(validPriority ? { priority: validPriority as "LOW" | "MEDIUM" | "HIGH" } : {}),
      ...(search
        ? { OR: [{ title: { contains: search, mode: "insensitive" } }, { description: { contains: search, mode: "insensitive" } }] }
        : {}),
    },
    include: { course: { select: { id: true, courseCode: true, title: true, color: true } } },
    orderBy: sort === "createdAt" ? { createdAt: "desc" } : sort === "priority" ? { priority: "asc" } : { dueDate: "asc" },
  });

  const orderedAssignments = sort === "priority"
    ? assignments.sort((left, right) => priorityRank[left.priority] - priorityRank[right.priority])
    : assignments;

  return NextResponse.json({ assignments: orderedAssignments });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const parsed = assignmentSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid assignment data." }, { status: 400 });
    }

    const course = await prisma.course.findFirst({ where: { id: parsed.data.courseId, userId: session.user.id } });

    if (!course) {
      return NextResponse.json({ error: "Select one of your courses." }, { status: 400 });
    }

    const assignment = await prisma.assignment.create({
      data: {
        userId: session.user.id,
        courseId: parsed.data.courseId,
        title: parsed.data.title,
        description: parsed.data.description,
        dueDate: new Date(parsed.data.dueDate),
        priority: parsed.data.priority,
        status: parsed.data.status,
      },
      include: { course: true },
    });

    return NextResponse.json({ assignment }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create assignment." }, { status: 500 });
  }
}