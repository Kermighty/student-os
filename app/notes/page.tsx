import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { AppShell } from "@/components/layout/app-shell";
import { NoteOverview } from "@/features/notes/note-overview";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NotesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  const [notes, courses] = await Promise.all([
    prisma.note.findMany({ where: { userId: session.user.id }, include: { course: { select: { id: true, courseCode: true, title: true, color: true } } }, orderBy: [{ pinned: "desc" }, { updatedAt: "desc" }] }),
    prisma.course.findMany({ where: { userId: session.user.id }, select: { id: true, courseCode: true, title: true, color: true }, orderBy: { courseCode: "asc" } }),
  ]);
  return <AppShell><NoteOverview initialNotes={notes.map((note) => ({ ...note, createdAt: note.createdAt.toISOString(), updatedAt: note.updatedAt.toISOString() }))} courses={courses} /></AppShell>;
}