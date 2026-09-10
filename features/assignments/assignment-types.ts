export type AssignmentPriority = "LOW" | "MEDIUM" | "HIGH";
export type AssignmentStatus = "TODO" | "IN_PROGRESS" | "COMPLETED";

export type AssignmentCourse = {
  id: string;
  courseCode: string;
  title: string;
  color: string;
};

export type AssignmentRecord = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: AssignmentPriority;
  status: AssignmentStatus;
  createdAt: string;
  updatedAt: string;
  course: AssignmentCourse;
};

export type AssignmentCourseOption = AssignmentCourse;

export const courseColorClasses: Record<string, string> = {
  blue: "bg-blue-500",
  emerald: "bg-emerald-500",
  violet: "bg-violet-500",
  rose: "bg-rose-500",
  amber: "bg-amber-500",
  cyan: "bg-cyan-500",
};