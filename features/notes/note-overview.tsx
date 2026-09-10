"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Filter, Pin, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NoteCard } from "@/features/notes/note-card";
import type { NoteCourse, NoteRecord } from "@/features/notes/note-types";

export function NoteOverview({ initialNotes, courses }: { initialNotes: NoteRecord[]; courses: NoteCourse[] }) {
  const [search, setSearch] = useState("");
  const [courseId, setCourseId] = useState("all");
  const [filter, setFilter] = useState<"all" | "pinned">("all");
  const [notes] = useState(initialNotes);

  const visibleNotes = useMemo(() => {
    const query = search.trim().toLowerCase();
    return notes.filter((note) => courseId === "all" || (courseId === "personal" ? !note.courseId : note.courseId === courseId)).filter((note) => filter === "all" || note.pinned).filter((note) => !query || `${note.title} ${note.content}`.toLowerCase().includes(query)).sort((left, right) => Number(right.pinned) - Number(left.pinned) || new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime());
  }, [courseId, filter, notes, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3"><h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Notes</h1><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-200">{notes.length} total</span></div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Keep your ideas, class notes, and personal thinking in one calm workspace.</p>
        </div>
        <Link href="/notes/new"><Button><Plus className="h-4 w-4" />New note</Button></Link>
      </div>

      <div className="grid gap-3 rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-[minmax(220px,1fr)_repeat(2,minmax(0,220px))]">
        <label className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search title or content" className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white" aria-label="Search notes" /></label>
        <label className="relative"><Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><select value={courseId} onChange={(event) => setCourseId(event.target.value)} className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200" aria-label="Filter notes by course"><option value="all">All courses</option><option value="personal">Personal notes</option>{courses.map((course) => <option key={course.id} value={course.id}>{course.courseCode}</option>)}</select></label>
        <button type="button" onClick={() => setFilter(filter === "all" ? "pinned" : "all")} className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-medium transition ${filter === "pinned" ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200" : "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"}`} aria-pressed={filter === "pinned"}><Pin className="h-4 w-4" />{filter === "pinned" ? "Pinned only" : "All notes"}</button>
      </div>

      {visibleNotes.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleNotes.map((note) => <NoteCard key={note.id} note={note} />)}</div> : <div className="rounded-[26px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center dark:border-slate-700 dark:bg-slate-950/40"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300"><Pin className="h-5 w-5" /></div><h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">No notes found</h2><p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Adjust your filters or create a note to start your knowledge hub.</p></div>}
    </div>
  );
}