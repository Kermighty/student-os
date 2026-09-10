import Link from "next/link";
import { Pin } from "lucide-react";

import { Card } from "@/components/ui/card";
import { formatNoteDate } from "@/features/notes/note-schema";
import type { NoteRecord } from "@/features/notes/note-types";

export function NoteCard({ note }: { note: NoteRecord }) {
  return (
    <Link href={`/notes/${note.id}`} className="block">
      <Card className="group h-full rounded-[24px] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_35px_rgba(15,23,42,0.08)] dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:shadow-[0_20px_35px_rgba(2,6,23,0.35)]">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {note.course?.courseCode ?? "Personal"}
          </span>
          {note.pinned ? <Pin className="h-4 w-4 text-blue-600 dark:text-blue-300" aria-label="Pinned note" /> : null}
        </div>
        <h2 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">{note.title}</h2>
        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-slate-600 dark:text-slate-300">{note.content}</p>
        <div className="mt-5 flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span>{note.course?.title ?? "Personal workspace"}</span>
          <time dateTime={note.updatedAt}>{formatNoteDate(note.updatedAt)}</time>
        </div>
      </Card>
    </Link>
  );
}