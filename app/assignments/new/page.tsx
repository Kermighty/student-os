import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { AppShell } from "@/components/layout/app-shell";
import { AssignmentForm } from "@/features/assignments/assignment-form";
import { PageHeader } from "@/components/ui/page-header";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NewAssignmentPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  const courses = await prisma.course.findMany({ where: { userId: session.user.id }, select: { id: true, courseCode: true, title: true, color: true }, orderBy: { courseCode: "asc" } });

  return <AppShell><div className="space-y-6"><PageHeader title="New assignment" description="Capture the next piece of work before it gets lost in the semester." /><AssignmentForm courses={courses} mode="create" /></div></AppShell>;
}