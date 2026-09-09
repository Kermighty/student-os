import Link from "next/link";

import { Button } from "@/components/ui/button";
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
        <Link href="/courses/new">
          <Button type="button">Add your first course</Button>
        </Link>
      </div>
    </Card>
  );
}
