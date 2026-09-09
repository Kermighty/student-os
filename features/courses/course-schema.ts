import { z } from "zod";

export const courseColorOptions = [
  { value: "blue", label: "Blue", swatch: "#2563EB" },
  { value: "emerald", label: "Emerald", swatch: "#10B981" },
  { value: "violet", label: "Violet", swatch: "#8B5CF6" },
  { value: "rose", label: "Rose", swatch: "#F43F5E" },
  { value: "amber", label: "Amber", swatch: "#F59E0B" },
  { value: "cyan", label: "Cyan", swatch: "#06B6D4" },
] as const;

export const courseSchema = z.object({
  courseCode: z.string().trim().min(2, "Course code is required.").max(20),
  title: z.string().trim().min(2, "Course title is required.").max(120),
  instructor: z.string().trim().min(2, "Instructor is required.").max(80),
  room: z.string().trim().min(2, "Room is required.").max(40),
  semester: z.string().trim().min(2, "Semester is required.").max(40),
  credits: z.number().int().min(1).max(12),
  color: z.enum(["blue", "emerald", "violet", "rose", "amber", "cyan"]),
});

export type CourseFormValues = z.infer<typeof courseSchema>;

export const coursePalette = {
  blue: "bg-blue-500",
  emerald: "bg-emerald-500",
  violet: "bg-violet-500",
  rose: "bg-rose-500",
  amber: "bg-amber-500",
  cyan: "bg-cyan-500",
} as const;
