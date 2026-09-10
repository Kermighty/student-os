"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { courseColorOptions, coursePalette, courseSchema, type CourseFormValues } from "@/features/courses/course-schema";

interface CourseFormProps {
  mode: "create" | "edit";
  defaultValues?: Partial<CourseFormValues>;
  courseId?: string;
}

export function CourseForm({ mode, defaultValues, courseId }: CourseFormProps) {
  const router = useRouter();
  const [submitState, setSubmitState] = useState<{ type: "idle" | "success" | "error"; message: string }>(
    { type: "idle", message: "" },
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courseCode: defaultValues?.courseCode ?? "",
      title: defaultValues?.title ?? "",
      instructor: defaultValues?.instructor ?? "",
      room: defaultValues?.room ?? "",
      semester: defaultValues?.semester ?? "",
      credits: defaultValues?.credits ?? 3,
      color: defaultValues?.color ?? "blue",
    },
  });

  // React Hook Form's watch API is intentionally used here to keep the color preview live.
  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedColor = watch("color");
  const selectedSwatch = useMemo(
    () => courseColorOptions.find((option) => option.value === selectedColor)?.swatch ?? "#2563EB",
    [selectedColor],
  );

  const onSubmit = async (values: CourseFormValues) => {
    setSubmitState({ type: "idle", message: "" });

    const method = mode === "create" ? "POST" : "PATCH";
    const endpoint = mode === "create" ? "/api/courses" : `/api/courses/${courseId}`;

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const payload = await response.json();

    if (!response.ok) {
      setSubmitState({
        type: "error",
        message: payload.error ?? "Something went wrong while saving the course.",
      });
      return;
    }

    setSubmitState({
      type: "success",
      message:
        mode === "create"
          ? "Course created successfully. Redirecting..."
          : "Course updated successfully. Redirecting...",
    });

    window.setTimeout(() => {
      router.push(`/courses/${payload.course.id}`);
      router.refresh();
    }, 700);
  };

  return (
    <Card className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_45px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            {mode === "create" ? "New course" : "Course details"}
          </p>
          <h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">
            {mode === "create" ? "Create a new course" : "Edit course"}
          </h2>
        </div>

        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
          <span className={`h-3.5 w-3.5 rounded-full ${coursePalette[selectedColor]}`} style={{ backgroundColor: selectedSwatch }} />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Selected color</span>
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Course code</label>
            <Input {...register("courseCode")} placeholder="CS 301" />
            {errors.courseCode ? <p className="text-xs text-red-500">{errors.courseCode.message}</p> : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Credits</label>
            <Input type="number" min={1} max={12} {...register("credits", { valueAsNumber: true })} placeholder="3" />
            {errors.credits ? <p className="text-xs text-red-500">{errors.credits.message}</p> : null}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Course title</label>
          <Input {...register("title")} placeholder="Data Structures" />
          {errors.title ? <p className="text-xs text-red-500">{errors.title.message}</p> : null}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Instructor</label>
            <Input {...register("instructor")} placeholder="Dr. Alvarez" />
            {errors.instructor ? <p className="text-xs text-red-500">{errors.instructor.message}</p> : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Room</label>
            <Input {...register("room")} placeholder="Room 204" />
            {errors.room ? <p className="text-xs text-red-500">{errors.room.message}</p> : null}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Semester</label>
            <Input {...register("semester")} placeholder="Fall 2026" />
            {errors.semester ? <p className="text-xs text-red-500">{errors.semester.message}</p> : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Color</label>
            <select
              {...register("color")}
              className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
            >
              {courseColorOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Course color</label>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {courseColorOptions.map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center gap-2 rounded-2xl border p-2 transition ${selectedColor === option.value ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10" : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950"}`}
              >
                <input type="radio" value={option.value} {...register("color")} className="sr-only" />
                <span className="h-5 w-5 rounded-full" style={{ backgroundColor: option.swatch }} />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {submitState.type !== "idle" ? (
          <div
            className={submitState.type === "success" ? "rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200" : "rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200"}
          >
            {submitState.message}
          </div>
        ) : null}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (mode === "create" ? "Creating course..." : "Saving changes...") : mode === "create" ? "Create course" : "Save changes"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
