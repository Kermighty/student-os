import { z } from "zod";

export const eventTypes = ["CLASS", "STUDY", "EXAM", "PERSONAL"] as const;
export const eventColors = ["blue", "emerald", "rose", "violet"] as const;
export const dayOptions = [
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
  { value: 7, label: "Sunday" },
] as const;

export const eventTypeLabels = { CLASS: "Class", STUDY: "Study", EXAM: "Exam", PERSONAL: "Personal" } as const;

const timeSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use a valid time.");

const scheduleEventBaseSchema = z.object({
  courseId: z.string().cuid("Select a valid course.").nullable(),
  title: z.string().trim().min(2, "Title must be at least 2 characters.").max(160),
  eventType: z.enum(eventTypes),
  dayOfWeek: z.number().int().min(1).max(7),
  startTime: timeSchema,
  endTime: timeSchema,
  location: z.string().trim().max(120),
  color: z.enum(eventColors),
});

const timeOrderRefinement = {
  message: "End time must be after start time.",
  path: ["endTime"],
};

export const scheduleEventSchema = scheduleEventBaseSchema.refine((values) => values.endTime > values.startTime, timeOrderRefinement);

export const scheduleEventFormSchema = scheduleEventBaseSchema.extend({
  courseId: z.string().cuid("Select a valid course.").or(z.literal("")),
}).refine((values) => values.endTime > values.startTime, timeOrderRefinement);

export type ScheduleEventFormValues = z.infer<typeof scheduleEventFormSchema>;

export function getDayLabel(dayOfWeek: number) {
  return dayOptions.find((day) => day.value === dayOfWeek)?.label ?? "Unknown day";
}

export function formatTime(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`;
}

export function timeToMinutes(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}