import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { AppShell } from "@/components/layout/app-shell";
import { authOptions } from "@/auth";
import { CourseDetail } from "@/features/courses/course-detail";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const { courseId } = await params;
  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course || course.userId !== session.user.id) {
    notFound();
  }

  return (
    <AppShell>
      <CourseDetail
        course={{
          id: course.id,
          courseCode: course.courseCode,
          title: course.title,
          instructor: course.instructor,
          room: course.room,
          semester: course.semester,
          color: course.color as keyof typeof import("@/features/courses/course-schema").coursePalette,
          credits: course.credits,
        }}
      />
    </AppShell>
  );
}
