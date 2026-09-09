export function SearchBar() {
  return (
    <label className="relative block">
      <span className="sr-only">Search tasks and notes</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="11" cy="11" r="5.5" />
        <path d="M16 16L21 21" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        aria-label="Search tasks and notes"
        placeholder="Search courses, tasks, notes..."
        className="h-12 w-full rounded-2xl border border-slate-200 bg-white/80 pl-11 pr-4 text-sm text-slate-700 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:ring-blue-500/20"
      />
    </label>
  );
}
