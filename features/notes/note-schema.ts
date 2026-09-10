import { z } from "zod";

export const noteSchema = z.object({
  courseId: z.string().cuid("Select a valid course.").nullable(),
  title: z.string().trim().min(2, "Title must be at least 2 characters.").max(160),
  content: z.string().trim().min(1, "Content cannot be empty.").max(20000),
  pinned: z.boolean(),
});

export const noteFormSchema = z.object({
  courseId: z.string().cuid("Select a valid course.").or(z.literal("")),
  title: noteSchema.shape.title,
  content: noteSchema.shape.content,
  pinned: noteSchema.shape.pinned,
});

export type NoteFormValues = z.infer<typeof noteFormSchema>;

export function formatNoteDate(value: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}