import { CalendarDays, NotebookPen, Plus } from "lucide-react";

import { SearchBar } from "@/features/dashboard/components/search-bar";
import { QuickActionButton } from "@/features/dashboard/components/quick-action-button";

interface DashboardHeaderProps {
  name: string;
  greeting: string;
  todayLabel: string;
}

export function DashboardHeader({ name, greeting, todayLabel }: DashboardHeaderProps) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50 p-5 shadow-[0_20px_45px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 sm:p-6 lg:p-7">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200">
            <CalendarDays className="h-3.5 w-3.5" />
            Semester overview
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{greeting}, {name}</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-[2rem]">
              {todayLabel}
            </h1>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300">Fall 2026 • Your momentum is strong and your next priorities are clear.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <QuickActionButton icon={<Plus className="h-4 w-4" />} label="New Assignment" />
          <QuickActionButton icon={<NotebookPen className="h-4 w-4" />} label="New Note" variant="secondary" />
        </div>
      </div>

      <div className="mt-6">
        <SearchBar />
      </div>
    </section>
  );
}
