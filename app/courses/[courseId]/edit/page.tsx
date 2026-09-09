import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { AppShell } from "@/components/layout/app-shell";
import { authOptions } from "@/auth";
import { CourseForm } from "@/features/courses/course-form";
import { PageHeader } from "@/components/ui/page-header";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditCoursePage({ params }: { params: Promise<{ courseId: string }> }) {
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
      <div className="space-y-6">
        <PageHeader
          title="Edit course"
          description="Update the course details and keep your semester information accurate."
        />
        <CourseForm
          mode="edit"
          courseId={course.id}
          defaultValues={{
            courseCode: course.courseCode,
            title: course.title,
            instructor: course.instructor,
            room: course.room,
            semester: course.semester,
            credits: course.credits,
            color: course.color as "blue" | "emerald" | "violet" | "rose" | "amber" | "cyan",
          }}
        />
      </div>
    </AppShell>
  );
}
