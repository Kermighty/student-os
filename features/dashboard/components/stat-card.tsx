import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: string;
  description: string;
  trend: string;
  icon: ReactNode;
  tone: "blue" | "amber" | "emerald" | "violet";
}

const toneStyles = {
  blue: "bg-blue-500/10 text-blue-600 ring-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300",
  amber: "bg-amber-500/10 text-amber-600 ring-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300",
  emerald: "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300",
  violet: "bg-violet-500/10 text-violet-600 ring-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300",
};

export function StatCard({ label, value, description, trend, icon, tone }: StatCardProps) {
  return (
    <Card className="group rounded-[24px] p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(15,23,42,0.08)] dark:hover:shadow-[0_18px_35px_rgba(2,6,23,0.4)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{value}</p>
        </div>

        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ring-1 ${toneStyles[tone]}`}>
          {icon}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs text-slate-600 dark:text-slate-300">{description}</p>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {trend}
        </span>
      </div>
    </Card>
  );
}
