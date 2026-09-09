import Link from "next/link";
import { BookOpen, GraduationCap, MapPin, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { coursePalette, type CourseFormValues } from "@/features/courses/course-schema";

export type CourseRecord = {
  id: string;
  courseCode: string;
  title: string;
  instructor: string;
  room: string;
  semester: string;
  color: CourseFormValues["color"];
  credits: number;
};

export function CourseCard({ course }: { course: CourseRecord }) {
  return (
    <Link href={`/courses/${course.id}`} className="block">
      <Card className="group h-full rounded-[24px] border border-slate-200 bg-white p-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_35px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-[0_20px_35px_rgba(2,6,23,0.35)]">
        <div className={`h-2 w-full rounded-t-[24px] ${coursePalette[course.color]}`} />

        <div className="space-y-4 p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-2.5 py-1 dark:bg-slate-800">
              <BookOpen className="h-3.5 w-3.5 text-slate-600 dark:text-slate-300" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600 dark:text-slate-300">
                {course.courseCode}
              </span>
            </div>
            <Badge variant="neutral" className="rounded-full">
              {course.semester}
            </Badge>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{course.title}</h3>
          </div>

          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <UserRound className="h-3.5 w-3.5" />
              <span>{course.instructor}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              <span>{course.room}</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-3.5 w-3.5" />
              <span>{course.credits} credits</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
