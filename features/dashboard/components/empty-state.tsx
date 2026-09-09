export function EmptyState() {
  return (
    <div className="rounded-[26px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-950/40">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M7 12h10M12 7v10" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">Nothing on the radar</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Your upcoming work list is clear. Add a new assignment to keep momentum going.</p>
    </div>
  );
}
