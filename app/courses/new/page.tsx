import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { AppShell } from "@/components/layout/app-shell";
import { authOptions } from "@/auth";
import { CourseForm } from "@/features/courses/course-form";
import { PageHeader } from "@/components/ui/page-header";

export default async function NewCoursePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="New course"
          description="Create a subject that will anchor your semester and future planning."
        />
        <CourseForm mode="create" />
      </div>
    </AppShell>
  );
}
