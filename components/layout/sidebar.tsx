import Link from "next/link";

import { BrandLockup } from "@/components/brand/brand-mark";
import { navigationItems } from "@/components/layout/navigation";

export function Sidebar({ courseCount = 0 }: { courseCount?: number }) {
  return (
    <aside className="hidden h-full w-72 shrink-0 border-r border-slate-200/80 bg-white/80 p-5 backdrop-blur-xl md:flex md:flex-col dark:border-slate-800 dark:bg-[#0b1220]/80">
      <div className="mb-8 px-2">
        <BrandLockup />
      </div>

      <nav className="space-y-1.5">
        {navigationItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            prefetch
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-[#111a2b]/80">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Semester snapshot</p>
        <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{courseCount}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">{courseCount === 1 ? "course this term" : "courses this term"}</p>
      </div>
    </aside>
  );
}
