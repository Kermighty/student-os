"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Filter, Plus, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AssignmentCard } from "@/features/assignments/assignment-card";
import { assignmentPriorityLabels, assignmentStatusLabels } from "@/features/assignments/assignment-schema";
import type { AssignmentCourseOption, AssignmentRecord, AssignmentPriority, AssignmentStatus } from "@/features/assignments/assignment-types";

type SortOption = "dueDate" | "priority" | "createdAt";

export function AssignmentOverview({ initialAssignments, courses }: { initialAssignments: AssignmentRecord[]; courses: AssignmentCourseOption[] }) {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [search, setSearch] = useState("");
  const [courseId, setCourseId] = useState("all");
  const [status, setStatus] = useState<"all" | AssignmentStatus>("all");
  const [priority, setPriority] = useState<"all" | AssignmentPriority>("all");
  const [sort, setSort] = useState<SortOption>("dueDate");

  const visibleAssignments = useMemo(() => {
    const query = search.trim().toLowerCase();
    return assignments
      .filter((assignment) => courseId === "all" || assignment.course.id === courseId)
      .filter((assignment) => status === "all" || assignment.status === status)
      .filter((assignment) => priority === "all" || assignment.priority === priority)
      .filter((assignment) => !query || `${assignment.title} ${assignment.description} ${assignment.course.courseCode}`.toLowerCase().includes(query))
      .sort((left, right) => {
        if (sort === "priority") {
          const rank = { HIGH: 0, MEDIUM: 1, LOW: 2 };
          return rank[left.priority] - rank[right.priority];
        }
        const leftValue = sort === "createdAt" ? left.createdAt : left.dueDate;
        const rightValue = sort === "createdAt" ? right.createdAt : right.dueDate;
        return new Date(leftValue).getTime() - new Date(rightValue).getTime();
      });
  }, [assignments, courseId, priority, search, sort, status]);

  const updateStatus = async (assignment: AssignmentRecord, nextStatus: "TODO" | "COMPLETED") => {
    const response = await fetch(`/api/assignments/${assignment.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId: assignment.course.id,
        title: assignment.title,
        description: assignment.description,
        dueDate: assignment.dueDate,
        priority: assignment.priority,
        status: nextStatus,
      }),
    });

    if (!response.ok) return;
    setAssignments((current) => current.map((item) => item.id === assignment.id ? { ...item, status: nextStatus, updatedAt: new Date().toISOString() } : item));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Assignments</h1>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-200">{assignments.length} total</span>
          </div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Keep every deadline visible, prioritized, and connected to a course.</p>
        </div>
        <Link href="/assignments/new"><Button><Plus className="h-4 w-4" />New assignment</Button></Link>
      </div>

      <div className="grid gap-3 rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1.5fr)_repeat(4,minmax(0,1fr))]">
        <label className="relative sm:col-span-2 xl:col-span-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search assignments" className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white" aria-label="Search assignments" />
        </label>
        <label className="relative">
          <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <select value={courseId} onChange={(event) => setCourseId(event.target.value)} className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200" aria-label="Filter by course">
            <option value="all">All courses</option>
            {courses.map((course) => <option key={course.id} value={course.id}>{course.courseCode}</option>)}
          </select>
        </label>
        <select value={status} onChange={(event) => setStatus(event.target.value as typeof status)} className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200" aria-label="Filter by status">
          <option value="all">All statuses</option>
          {Object.entries(assignmentStatusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        <select value={priority} onChange={(event) => setPriority(event.target.value as typeof priority)} className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200" aria-label="Filter by priority">
          <option value="all">All priorities</option>
          {Object.entries(assignmentPriorityLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        <label className="relative">
          <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <select value={sort} onChange={(event) => setSort(event.target.value as SortOption)} className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200" aria-label="Sort assignments">
            <option value="dueDate">Sort by due date</option>
            <option value="priority">Sort by priority</option>
            <option value="createdAt">Recently created</option>
          </select>
        </label>
      </div>

      {visibleAssignments.length ? <div className="grid gap-4 lg:grid-cols-2">{visibleAssignments.map((assignment) => <AssignmentCard key={assignment.id} assignment={assignment} onStatusChange={(nextStatus) => updateStatus(assignment, nextStatus)} />)}</div> : <div className="rounded-[26px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center dark:border-slate-700 dark:bg-slate-950/40"><h2 className="text-lg font-semibold text-slate-900 dark:text-white">No assignments found</h2><p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Adjust your filters or add a new assignment to start your queue.</p></div>}
    </div>
  );
}