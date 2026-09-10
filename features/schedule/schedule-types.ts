export type ScheduleCourse = {
  id: string;
  courseCode: string;
  title: string;
  color: string;
};

export type ScheduleEventRecord = {
  id: string;
  title: string;
  eventType: "CLASS" | "STUDY" | "EXAM" | "PERSONAL";
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  location: string;
  color: "blue" | "emerald" | "rose" | "violet" | string;
  courseId: string | null;
  createdAt: string;
  updatedAt: string;
  course: ScheduleCourse | null;
};

export const eventColorClasses = {
  blue: "bg-blue-500 border-blue-600 text-white",
  emerald: "bg-emerald-500 border-emerald-600 text-white",
  rose: "bg-rose-500 border-rose-600 text-white",
  violet: "bg-violet-500 border-violet-600 text-white",
} as const;