import { Circle, Clock3 } from "lucide-react";

import { PriorityBadge } from "@/features/dashboard/components/priority-badge";
import { formatAssignmentDate } from "@/features/assignments/assignment-schema";
import type { AssignmentRecord } from "@/features/assignments/assignment-types";

export function AssignmentItem({ item }: { item: AssignmentRecord }) {
  return (
    <li className="group flex items-center gap-4 rounded-[22px] border border-slate-200 bg-white/80 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_18px_28px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950/50 dark:hover:border-slate-700">
      <div className={`h-12 w-1.5 rounded-full ${item.course.color === "emerald" ? "bg-emerald-500" : item.course.color === "violet" ? "bg-violet-500" : item.course.color === "rose" ? "bg-rose-500" : item.course.color === "amber" ? "bg-amber-500" : item.course.color === "cyan" ? "bg-cyan-500" : "bg-blue-500"}`} aria-hidden="true" />

      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{item.course.courseCode}</span>
            <PriorityBadge priority={item.priority === "HIGH" ? "High" : item.priority === "LOW" ? "Low" : "Medium"} />
          </div>
          <p className="mt-1 truncate text-sm font-medium text-slate-900 dark:text-slate-100">{item.title}</p>
        </div>

        <div className="hidden items-center gap-2 text-right text-xs text-slate-500 sm:flex dark:text-slate-400">
          <Clock3 className="h-3.5 w-3.5" />
          <span>{formatAssignmentDate(item.dueDate)}</span>
        </div>
      </div>

      <label className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-slate-300 bg-white transition hover:border-blue-500 dark:border-slate-700 dark:bg-slate-900">
        <input type="checkbox" checked={item.status === "COMPLETED"} readOnly className="peer sr-only" aria-label={`Mark ${item.title} complete`} />
        <Circle className="h-3.5 w-3.5 text-transparent transition peer-checked:text-blue-600" fill="currentColor" stroke="currentColor" />
      </label>
    </li>
  );
}
