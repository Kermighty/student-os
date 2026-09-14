/**
 * The Student OS mark, shared by the landing header and footer. Mirrors the
 * sidebar badge so the brand reads consistently across the app.
 */
export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-sm shadow-blue-500/30">
        SO
      </span>
      <span className="leading-tight">
        <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Student OS</span>
        <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">Life dashboard</span>
      </span>
    </span>
  );
}
