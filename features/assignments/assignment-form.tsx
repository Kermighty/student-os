"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { assignmentPriorityLabels, assignmentSchema, assignmentStatusLabels, type AssignmentFormValues } from "@/features/assignments/assignment-schema";
import type { AssignmentCourseOption } from "@/features/assignments/assignment-types";

export function AssignmentForm({ courses, mode, assignmentId, defaultValues }: { courses: AssignmentCourseOption[]; mode: "create" | "edit"; assignmentId?: string; defaultValues?: Partial<AssignmentFormValues> }) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm<AssignmentFormValues>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: { courseId: defaultValues?.courseId ?? courses[0]?.id ?? "", title: defaultValues?.title ?? "", description: defaultValues?.description ?? "", dueDate: defaultValues?.dueDate ?? "", priority: defaultValues?.priority ?? "MEDIUM", status: defaultValues?.status ?? "TODO" },
  });

  useEffect(() => {
    const warnBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warnBeforeUnload);
    return () => window.removeEventListener("beforeunload", warnBeforeUnload);
  }, [isDirty]);

  const onSubmit = async (values: AssignmentFormValues) => {
    setServerError("");
    setSuccess("");
    const response = await fetch(mode === "create" ? "/api/assignments" : `/api/assignments/${assignmentId}`, { method: mode === "create" ? "POST" : "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
    const payload = await response.json();
    if (!response.ok) {
      setServerError(payload.error ?? "Unable to save assignment.");
      return;
    }
    setSuccess(mode === "create" ? "Assignment created. Opening details..." : "Assignment updated. Opening details...");
    window.setTimeout(() => { router.push(`/assignments/${payload.assignment.id}`); router.refresh(); }, 500);
  };

  const cancel = () => {
    if (isDirty && !window.confirm("You have unsaved changes. Leave this page?")) return;
    router.back();
  };

  return <Card className="rounded-[24px] p-5 dark:bg-slate-900 sm:p-7"><form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
    <div className="grid gap-5 md:grid-cols-2">
      <div className="space-y-2"><label htmlFor="courseId" className="text-sm font-medium text-slate-700 dark:text-slate-200">Course</label><select id="courseId" {...register("courseId")} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"><option value="">Select a course</option>{courses.map((course) => <option key={course.id} value={course.id}>{course.courseCode} - {course.title}</option>)}</select>{errors.courseId ? <p className="text-xs text-rose-600">{errors.courseId.message}</p> : null}</div>
      <div className="space-y-2"><label htmlFor="dueDate" className="text-sm font-medium text-slate-700 dark:text-slate-200">Due date</label><Input id="dueDate" type="datetime-local" {...register("dueDate")} />{errors.dueDate ? <p className="text-xs text-rose-600">{errors.dueDate.message}</p> : null}</div>
    </div>
    <div className="space-y-2"><label htmlFor="title" className="text-sm font-medium text-slate-700 dark:text-slate-200">Title</label><Input id="title" {...register("title")} placeholder="Systems design proposal" />{errors.title ? <p className="text-xs text-rose-600">{errors.title.message}</p> : null}</div>
    <div className="space-y-2"><label htmlFor="description" className="text-sm font-medium text-slate-700 dark:text-slate-200">Description</label><textarea id="description" {...register("description")} rows={5} placeholder="What needs to be done?" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />{errors.description ? <p className="text-xs text-rose-600">{errors.description.message}</p> : null}</div>
    <div className="grid gap-5 md:grid-cols-2"><div className="space-y-2"><label htmlFor="priority" className="text-sm font-medium text-slate-700 dark:text-slate-200">Priority</label><select id="priority" {...register("priority")} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-950"><option value="HIGH">{assignmentPriorityLabels.HIGH}</option><option value="MEDIUM">{assignmentPriorityLabels.MEDIUM}</option><option value="LOW">{assignmentPriorityLabels.LOW}</option></select></div><div className="space-y-2"><label htmlFor="status" className="text-sm font-medium text-slate-700 dark:text-slate-200">Status</label><select id="status" {...register("status")} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-950"><option value="TODO">{assignmentStatusLabels.TODO}</option><option value="IN_PROGRESS">{assignmentStatusLabels.IN_PROGRESS}</option><option value="COMPLETED">{assignmentStatusLabels.COMPLETED}</option></select></div></div>
    {serverError ? <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">{serverError}</div> : null}
    {success ? <div role="status" aria-live="polite" className="fixed bottom-5 right-5 z-40 max-w-sm rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 shadow-[0_18px_35px_rgba(15,23,42,0.12)] dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">{success}</div> : null}
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button type="button" variant="secondary" onClick={cancel}>Cancel</Button><Button type="submit" disabled={isSubmitting || courses.length === 0}>{isSubmitting ? "Saving..." : mode === "create" ? "Create assignment" : "Save changes"}</Button></div>
  </form></Card>;
}