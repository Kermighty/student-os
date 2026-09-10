import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { AppShell } from "@/components/layout/app-shell";
import { NoteForm } from "@/features/notes/note-form";
import { PageHeader } from "@/components/ui/page-header";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditNotePage({ params }: { params: Promise<{ noteId: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  const [note, courses] = await Promise.all([
    prisma.note.findFirst({ where: { id: (await params).noteId, userId: session.user.id } }),
    prisma.course.findMany({ where: { userId: session.user.id }, select: { id: true, courseCode: true, title: true, color: true }, orderBy: { courseCode: "asc" } }),
  ]);
  if (!note) notFound();
  return <AppShell><div className="space-y-6"><PageHeader title="Edit note" description="Refine your thinking and keep the important details close." /><NoteForm courses={courses} mode="edit" noteId={note.id} defaultValues={{ courseId: note.courseId ?? "", title: note.title, content: note.content, pinned: note.pinned }} /></div></AppShell>;
}