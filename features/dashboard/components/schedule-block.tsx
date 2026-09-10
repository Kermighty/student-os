import Link from "next/link";
import { Clock3, MapPin } from "lucide-react";

import { eventTypeLabels, formatTime } from "@/features/schedule/schedule-schema";
import type { ScheduleEventRecord } from "@/features/schedule/schedule-types";

export function ScheduleBlock({ item }: { item: ScheduleEventRecord }) {
  const color = item.color === "emerald" ? "bg-emerald-500" : item.color === "rose" ? "bg-rose-500" : item.color === "violet" ? "bg-violet-500" : "bg-blue-500";
  return (
    <Link href={`/schedule/${item.id}`} className="relative block rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60">
      <div className="flex items-start gap-3">
        <div className={`mt-1 h-10 w-1.5 rounded-full ${color}`} aria-hidden="true" />

        <div className="flex-1">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{formatTime(item.startTime)} – {formatTime(item.endTime)}</p>
              <h3 className="mt-1 text-base font-semibold text-slate-900 dark:text-white">{item.title}</h3>
            </div>
          </div>

          <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              <span>{item.location || "No location"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock3 className="h-3.5 w-3.5" />
              <span>{item.course?.courseCode ?? eventTypeLabels[item.eventType]}</span>
            </div>
          </div>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
          <Clock3 className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
