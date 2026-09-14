import Link from "next/link";
import { Plus } from "lucide-react";

import { Card } from "@/components/ui/card";

export function CourseEmptyState() {
  return (
    <Card className="rounded-[30px] border border-dashed border-slate-300 bg-slate-50/90 px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-950/40">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] bg-white text-blue-600 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M7 12h10M12 7v10" strokeLinecap="round" />
          <rect x="3" y="4" width="18" height="16" rx="3" />
        </svg>
      </div>
      <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">No courses yet</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
        Start your semester by creating your first course and building a clean academic foundation.
      </p>
      <div className="mt-6 flex justify-center">
        <Link
          href="/courses/new"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-medium text-white shadow-sm shadow-blue-500/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          Add your first course
        </Link>
      </div>
    </Card>
  );
}
