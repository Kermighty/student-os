import Link from "next/link";
import { BookOpen, CalendarDays, GraduationCap, MapPin, NotebookPen, PencilLine, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DeleteCourseDialog } from "@/features/courses/delete-course-dialog";
import { coursePalette } from "@/features/courses/course-schema";

export type CourseDetailRecord = {
  id: string;
  courseCode: string;
  title: string;
  instructor: string;
  room: string;
  semester: string;
  color: keyof typeof coursePalette;
  credits: number;
};

export function CourseDetail({ course }: { course: CourseDetailRecord }) {
  return (
    <div className="space-y-6">
      <section className={`overflow-hidden rounded-[30px] border border-slate-200 bg-gradient-to-br ${coursePalette[course.color]} p-[1px] shadow-[0_20px_45px_rgba(15,23,42,0.06)]`}>
        <div className="rounded-[29px] bg-white/95 p-5 dark:bg-slate-950/85 sm:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <BookOpen className="h-3.5 w-3.5" />
                {course.courseCode}
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{course.title}</h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href={`/courses/${course.id}/edit`}>
                <Button type="button" variant="secondary">
                  <PencilLine className="h-4 w-4" />
                  Edit
                </Button>
              </Link>
              <DeleteCourseDialog courseId={course.id} courseTitle={course.title} />
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_360px]">
        <section className="space-y-6">
          <Card className="rounded-[26px] p-5 dark:bg-slate-900 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Course overview</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <UserRound className="h-4 w-4" />
                  Instructor
                </div>
                <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{course.instructor}</p>
              </div>
              <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <MapPin className="h-4 w-4" />
                  Room
                </div>
                <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{course.room}</p>
              </div>
              <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <CalendarDays className="h-4 w-4" />
                  Semester
                </div>
                <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{course.semester}</p>
              </div>
              <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <GraduationCap className="h-4 w-4" />
                  Credits
                </div>
                <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{course.credits} units</p>
              </div>
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            {[{ label: "Assignments", icon: BookOpen, text: "Coming in future sprint" }, { label: "Notes", icon: NotebookPen, text: "Coming in future sprint" }, { label: "Schedule", icon: CalendarDays, text: "Coming in future sprint" }].map(({ label, icon: Icon, text }) => (
              <Card key={label} className="rounded-[24px] p-4 dark:bg-slate-900">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                  <Icon className="h-4 w-4" />
                  {label}
                </div>
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{text}</p>
              </Card>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <Card className="rounded-[24px] p-5 dark:bg-slate-900">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Quick facts</p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2 dark:bg-slate-950/60">
                <span className="text-sm text-slate-600 dark:text-slate-300">Code</span>
                <Badge variant="neutral">{course.courseCode}</Badge>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2 dark:bg-slate-950/60">
                <span className="text-sm text-slate-600 dark:text-slate-300">Semester</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">{course.semester}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2 dark:bg-slate-950/60">
                <span className="text-sm text-slate-600 dark:text-slate-300">Credits</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">{course.credits}</span>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
