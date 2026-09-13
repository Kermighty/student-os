import Link from "next/link";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: { href: string; label: string };
}

export function EmptyState({
  title = "Nothing on the radar",
  description = "Your upcoming work list is clear. Add a new assignment to keep momentum going.",
  action,
}: EmptyStateProps) {
  return (
    <div className="mx-auto flex-col items-center justify-center rounded-[26px] border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center dark:border-slate-700 dark:bg-slate-950/40">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M7 12h10M12 7v10" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>
      {action ? (
        <Link
          href={action.href}
          className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-medium text-white shadow-sm shadow-blue-500/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98]"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
