import type { AssignmentPriority } from "@/features/dashboard/data";

const styles: Record<AssignmentPriority, string> = {
  High: "bg-rose-100 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-200 dark:ring-rose-500/20",
  Medium: "bg-amber-100 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-200 dark:ring-amber-500/20",
  Low: "bg-emerald-100 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-200 dark:ring-emerald-500/20",
};

export function PriorityBadge({ priority }: { priority: AssignmentPriority }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ring-1 ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}
