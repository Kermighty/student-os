import Link from "next/link";
import { CalendarRange, ChartNoAxesCombined, FileText, GraduationCap, LayoutGrid, NotebookPen, Search, Settings, Wallet } from "lucide-react";

const items = [
  { href: "/", label: "Overview", icon: LayoutGrid },
  { href: "/courses", label: "Courses", icon: GraduationCap },
  { href: "/assignments", label: "Assignments", icon: FileText },
  { href: "/notes", label: "Notes", icon: NotebookPen },
  { href: "/schedule", label: "Schedule", icon: CalendarRange },
  { href: "/expenses", label: "Expenses", icon: Wallet },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/reports", label: "Reports", icon: ChartNoAxesCombined },
  { href: "/analytics", label: "Analytics", icon: ChartNoAxesCombined },
  { href: "/search", label: "Search", icon: Search },
];

export function Sidebar() {
  return (
    <aside className="hidden h-full w-72 shrink-0 border-r border-slate-200/80 bg-white/80 p-5 backdrop-blur-xl md:flex md:flex-col dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-sm shadow-blue-500/30">
          SO
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Student OS</p>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Life dashboard</p>
        </div>
      </div>

      <nav className="space-y-1.5">
        {items.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/80">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Semester snapshot</p>
        <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">14</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">classes this term</p>
      </div>
    </aside>
  );
}
