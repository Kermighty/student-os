"use client";

import Link from "next/link";
import { CalendarClock, Check } from "lucide-react";

import { Card } from "@/components/ui/card";
import { formatAssignmentDate } from "@/features/assignments/assignment-schema";
import { PriorityBadge, StatusBadge } from "@/features/assignments/assignment-badges";
import { courseColorClasses, type AssignmentRecord } from "@/features/assignments/assignment-types";

export function AssignmentCard({ assignment, onStatusChange }: { assignment: AssignmentRecord; onStatusChange: (status: "TODO" | "COMPLETED") => void }) {
  const completed = assignment.status === "COMPLETED";

  return (
    <Card className="group relative overflow-hidden rounded-[24px] p-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_35px_rgba(15,23,42,0.08)] dark:bg-slate-900 dark:hover:shadow-[0_20px_35px_rgba(2,6,23,0.35)]">
      <div className={`absolute inset-y-0 left-0 w-1.5 ${courseColorClasses[assignment.course.color] ?? "bg-blue-500"}`} aria-hidden="true" />
      <div className="p-5 pl-7">
        <div className="flex items-start gap-4">
          <label className="mt-1 flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-300 bg-white transition hover:border-blue-500 dark:border-slate-700 dark:bg-slate-950" title={completed ? "Mark as to do" : "Mark complete"}>
            <input type="checkbox" checked={completed} onChange={() => onStatusChange(completed ? "TODO" : "COMPLETED")} className="sr-only" aria-label={`${completed ? "Mark" : "Complete"} ${assignment.title}`} />
            <Check className={`h-3.5 w-3.5 transition ${completed ? "text-blue-600" : "text-transparent"}`} strokeWidth={3} />
          </label>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{assignment.course.courseCode}</span>
              <PriorityBadge priority={assignment.priority} />
              <StatusBadge status={assignment.status} />
            </div>
            <Link href={`/assignments/${assignment.id}`} className="mt-2 block text-lg font-semibold text-slate-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-300">
              {assignment.title}
            </Link>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{assignment.description || "No description added."}</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <CalendarClock className="h-3.5 w-3.5" />
              <span>Due {formatAssignmentDate(assignment.dueDate)}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}