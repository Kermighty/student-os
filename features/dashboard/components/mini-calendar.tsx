import { buildCalendarDates, calendarDays } from "@/features/dashboard/data";

export function MiniCalendar() {
  const today = new Date();
  const calendarDates = buildCalendarDates(today);
  const monthLabel = new Intl.DateTimeFormat("en-US", { month: "long" }).format(today);

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Calendar</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{monthLabel}</h3>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
        {calendarDays.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-7 gap-2 text-center text-sm">
        {calendarDates.map(({ day, muted, active }, index) => (
          <div
            key={`${day}-${index}`}
            className={[
              "flex h-8 w-8 items-center justify-center rounded-xl",
              muted ? "text-slate-300 dark:text-slate-600" : "text-slate-700 dark:text-slate-200",
              active ? "bg-blue-600 font-semibold text-white shadow-sm shadow-blue-500/35" : "hover:bg-slate-100 dark:hover:bg-slate-800",
            ].join(" ")}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
