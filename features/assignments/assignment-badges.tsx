import { assignmentPriorityLabels, assignmentStatusLabels } from "@/features/assignments/assignment-schema";
import type { AssignmentPriority, AssignmentStatus } from "@/features/assignments/assignment-types";

const priorityStyles: Record<AssignmentPriority, string> = {
  HIGH: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-200",
  MEDIUM: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200",
  LOW: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

const statusStyles: Record<AssignmentStatus, string> = {
  TODO: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  IN_PROGRESS: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-200",
  COMPLETED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200",
};

export function PriorityBadge({ priority }: { priority: AssignmentPriority }) {
  return <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${priorityStyles[priority]}`}>{assignmentPriorityLabels[priority]}</span>;
}

export function StatusBadge({ status }: { status: AssignmentStatus }) {
  return <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${statusStyles[status]}`}>{assignmentStatusLabels[status]}</span>;
}