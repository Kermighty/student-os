import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/auth";
import { assignmentSchema } from "@/features/assignments/assignment-schema";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ assignmentId: string }> };

async function findOwnedAssignment(assignmentId: string, userId: string) {
  return prisma.assignment.findFirst({ where: { id: assignmentId, userId }, include: { course: true } });
}

export async function GET(_: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { assignmentId } = await params;
  const assignment = await findOwnedAssignment(assignmentId, session.user.id);

  if (!assignment) return NextResponse.json({ error: "Assignment not found." }, { status: 404 });

  return NextResponse.json({ assignment });
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const parsed = assignmentSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid assignment data." }, { status: 400 });
    }

    const { assignmentId } = await params;
    const existingAssignment = await findOwnedAssignment(assignmentId, session.user.id);

    if (!existingAssignment) return NextResponse.json({ error: "Assignment not found." }, { status: 404 });

    const course = await prisma.course.findFirst({ where: { id: parsed.data.courseId, userId: session.user.id } });

    if (!course) return NextResponse.json({ error: "Select one of your courses." }, { status: 400 });

    const assignment = await prisma.assignment.update({
      where: { id: assignmentId },
      data: {
        courseId: parsed.data.courseId,
        title: parsed.data.title,
        description: parsed.data.description,
        dueDate: new Date(parsed.data.dueDate),
        priority: parsed.data.priority,
        status: parsed.data.status,
      },
      include: { course: true },
    });

    return NextResponse.json({ assignment });
  } catch {
    return NextResponse.json({ error: "Unable to update assignment." }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { assignmentId } = await params;
  const assignment = await findOwnedAssignment(assignmentId, session.user.id);

  if (!assignment) return NextResponse.json({ error: "Assignment not found." }, { status: 404 });

  await prisma.assignment.delete({ where: { id: assignmentId } });

  return NextResponse.json({ success: true });
}