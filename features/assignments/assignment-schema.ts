import { z } from "zod";

export const assignmentPriorities = ["LOW", "MEDIUM", "HIGH"] as const;
export const assignmentStatuses = ["TODO", "IN_PROGRESS", "COMPLETED"] as const;

export const assignmentPriorityLabels = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
} as const;

export const assignmentStatusLabels = {
  TODO: "To do",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
} as const;

export const assignmentSchema = z.object({
  courseId: z.string().cuid("Select a course."),
  title: z.string().trim().min(2, "Title must be at least 2 characters.").max(160),
  description: z.string().trim().max(2000, "Description must be 2,000 characters or fewer."),
  dueDate: z.string().min(1, "Choose a due date.").refine((value) => !Number.isNaN(Date.parse(value)), "Choose a valid due date."),
  priority: z.enum(assignmentPriorities),
  status: z.enum(assignmentStatuses),
});

export type AssignmentFormValues = z.infer<typeof assignmentSchema>;

export function formatAssignmentDate(value: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatDateTimeLocal(value: Date | string) {
  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60_000);
  return localDate.toISOString().slice(0, 16);
}