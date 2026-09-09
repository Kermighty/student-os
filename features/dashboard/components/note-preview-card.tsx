import { Pin } from "lucide-react";

import type { NoteItem } from "@/features/dashboard/data";

export function NotePreviewCard({ note }: { note: NoteItem }) {
  return (
    <article className="group rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_32px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
      <div className={`rounded-[18px] bg-gradient-to-br ${note.accent} p-3`}>
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-white/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700 dark:bg-slate-950/80 dark:text-slate-200">
            {note.course}
          </span>
          {note.pinned ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/90 px-2 py-1 text-[10px] font-medium text-white dark:bg-white dark:text-slate-900">
              <Pin className="h-2.5 w-2.5" />
              Pinned
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">{note.title}</h3>
        <p className="line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{note.preview}</p>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>Last edited</span>
        <span>{note.updatedAt}</span>
      </div>
    </article>
  );
}
