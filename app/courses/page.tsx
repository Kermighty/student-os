import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { AppShell } from "@/components/layout/app-shell";
import { authOptions } from "@/auth";
import { CourseCard } from "@/features/courses/course-card";
import { CourseEmptyState } from "@/features/courses/course-empty-state";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const courses = await prisma.course.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Courses"
          description="Manage your semester and keep your academic foundation organized."
          action={
            <Link href="/courses/new">
              <Button type="button">Add course</Button>
            </Link>
          }
        />

        {courses.length === 0 ? (
          <CourseEmptyState />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={{
                  id: course.id,
                  courseCode: course.courseCode,
                  title: course.title,
                  instructor: course.instructor,
                  room: course.room,
                  semester: course.semester,
                  color: course.color as "blue" | "emerald" | "violet" | "rose" | "amber" | "cyan",
                  credits: course.credits,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
