"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, CalendarDays, ClipboardList, FileText, Search, Wallet } from "lucide-react";

type SearchResults = { courses: Array<{ id: string; courseCode: string; title: string }>; assignments: Array<{ id: string; title: string; course: { courseCode: string } }>; notes: Array<{ id: string; title: string; course: { courseCode: string } | null }>; scheduleEvents: Array<{ id: string; title: string; eventType: string; dayOfWeek: number }>; expenses: Array<{ id: string; title: string; category: { name: string } }> };

const emptyResults: SearchResults = { courses: [], assignments: [], notes: [], scheduleEvents: [], expenses: [] };

export function GlobalSearch({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResults>(emptyResults);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const term = query.trim();
    if (term.length < 2) return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => { setLoading(true); const response = await fetch(`/api/search?q=${encodeURIComponent(term)}`, { signal: controller.signal }); if (response.ok) setResults((await response.json()).results); setLoading(false); }, 150);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [query]);

  const groups = [
    { key: "courses", label: "Courses", icon: BookOpen, items: results.courses.map((item) => ({ id: item.id, href: `/courses/${item.id}`, title: `${item.courseCode} · ${item.title}` })) },
    { key: "assignments", label: "Assignments", icon: ClipboardList, items: results.assignments.map((item) => ({ id: item.id, href: `/assignments/${item.id}`, title: `${item.title} · ${item.course.courseCode}` })) },
    { key: "notes", label: "Notes", icon: FileText, items: results.notes.map((item) => ({ id: item.id, href: `/notes/${item.id}`, title: `${item.title} · ${item.course?.courseCode ?? "Personal"}` })) },
    { key: "scheduleEvents", label: "Schedule", icon: CalendarDays, items: results.scheduleEvents.map((item) => ({ id: item.id, href: `/schedule/${item.id}`, title: `${item.title} · ${item.eventType}` })) },
    { key: "expenses", label: "Expenses", icon: Wallet, items: results.expenses.map((item) => ({ id: item.id, href: `/expenses/${item.id}`, title: `${item.title} · ${item.category.name}` })) },
  ];
  const visibleGroups = query.trim().length < 2 ? [] : groups;
  const resultCount = visibleGroups.reduce((count, group) => count + group.items.length, 0);
  return <div className="mx-auto max-w-4xl space-y-6"><div><p className="text-sm font-medium text-blue-600 dark:text-blue-300">Workspace index</p><h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Search everything</h1><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Find courses, work, notes, time, and money from one place.</p></div><label className="relative block"><Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search your workspace" className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-base text-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.05)] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white" aria-label="Search workspace" /></label>{loading ? <div className="rounded-[24px] border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900">Searching...</div> : query.trim().length < 2 ? <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center dark:border-slate-700 dark:bg-slate-950/40"><Search className="mx-auto h-6 w-6 text-slate-400" /><p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Type at least two characters to search.</p></div> : resultCount === 0 ? <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center dark:border-slate-700 dark:bg-slate-950/40"><p className="text-lg font-semibold text-slate-900 dark:text-white">No results found</p><p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Try a course code, title, or keyword.</p></div> : <div className="space-y-4">{visibleGroups.filter((group) => group.items.length).map((group) => <section key={group.key} className="rounded-[24px] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white"><group.icon className="h-4 w-4 text-blue-600" />{group.label}<span className="text-xs font-normal text-slate-400">{group.items.length}</span></h2><div className="mt-3 divide-y divide-slate-200 dark:divide-slate-800">{group.items.map((item) => <Link key={item.id} href={item.href} className="block py-3 text-sm text-slate-700 transition hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-300">{item.title}</Link>)}</div></section>)}</div>}</div>;
}