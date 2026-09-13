export const calendarDays = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;

export type CalendarCell = { day: number; muted?: boolean; active?: boolean };

/** Builds a real calendar grid for the given month, with today highlighted. */
export function buildCalendarDates(reference = new Date()): CalendarCell[] {
  const year = reference.getFullYear();
  const month = reference.getMonth();
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();

  const cells: CalendarCell[] = [];

  for (let index = firstWeekday; index > 0; index -= 1) {
    cells.push({ day: daysInPreviousMonth - index + 1, muted: true });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const isToday =
      reference.getDate() === day &&
      reference.getMonth() === month &&
      reference.getFullYear() === year;
    cells.push({ day, active: isToday });
  }

  let nextMonthDay = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ day: nextMonthDay, muted: true });
    nextMonthDay += 1;
  }

  return cells;
}
