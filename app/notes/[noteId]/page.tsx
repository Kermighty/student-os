import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { AppShell } from "@/components/layout/app-shell";
import { NoteDetail } from "@/features/notes/note-detail";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NoteDetailPage({ params }: { params: Promise<{ noteId: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  const note = await prisma.note.findFirst({ where: { id: (await params).noteId, userId: session.user.id }, include: { course: { select: { id: true, courseCode: true, title: true, color: true } } } });
  if (!note) notFound();
  return <AppShell><NoteDetail note={{ ...note, createdAt: note.createdAt.toISOString(), updatedAt: note.updatedAt.toISOString() }} /></AppShell>;
}