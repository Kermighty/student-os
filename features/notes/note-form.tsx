"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Pin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { noteFormSchema, type NoteFormValues } from "@/features/notes/note-schema";
import type { NoteCourse } from "@/features/notes/note-types";

export function NoteForm({ courses, mode, noteId, defaultValues }: { courses: NoteCourse[]; mode: "create" | "edit"; noteId?: string; defaultValues?: Partial<NoteFormValues> }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [autosave, setAutosave] = useState("All changes saved locally");
  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm<NoteFormValues>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: { courseId: defaultValues?.courseId ?? "", title: defaultValues?.title ?? "", content: defaultValues?.content ?? "", pinned: defaultValues?.pinned ?? false },
  });
  useEffect(() => {
    const warnBeforeUnload = (event: BeforeUnloadEvent) => { if (!isDirty) return; event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warnBeforeUnload);
    return () => window.removeEventListener("beforeunload", warnBeforeUnload);
  }, [isDirty]);

  const onSubmit = async (values: NoteFormValues) => {
    setError("");
    setSuccess("");
    setAutosave("Saving...");
    const response = await fetch(mode === "create" ? "/api/notes" : `/api/notes/${noteId}`, { method: mode === "create" ? "POST" : "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...values, courseId: values.courseId || null }) });
    const payload = await response.json();
    if (!response.ok) { setError(payload.error ?? "Unable to save note."); setAutosave("Save failed"); return; }
    setAutosave("Saved just now");
    setSuccess(mode === "create" ? "Note created. Opening note..." : "Note updated. Opening note...");
    window.setTimeout(() => { router.push(`/notes/${payload.note.id}`); router.refresh(); }, 500);
  };

  const cancel = () => { if (isDirty && !window.confirm("You have unsaved changes. Leave this page?")) return; router.back(); };

  return <Card className="rounded-[24px] p-5 dark:bg-slate-900 sm:p-7"><form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
    <div className="flex items-center justify-between gap-3"><span className="text-xs font-medium text-slate-500 dark:text-slate-400" role="status" aria-live="polite">{autosave}</span><label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"><input type="checkbox" {...register("pinned")} className="sr-only peer" /><Pin className="h-4 w-4 text-slate-400 peer-checked:text-blue-600" /><span>Pin note</span></label></div>
    <div className="space-y-2"><label htmlFor="title" className="text-sm font-medium text-slate-700 dark:text-slate-200">Title</label><Input id="title" {...register("title")} placeholder="A thoughtful note title" />{errors.title ? <p className="text-xs text-rose-600">{errors.title.message}</p> : null}</div>
    <div className="space-y-2"><label htmlFor="courseId" className="text-sm font-medium text-slate-700 dark:text-slate-200">Course <span className="font-normal text-slate-400">(optional)</span></label><select id="courseId" {...register("courseId")} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"><option value="">Personal note</option>{courses.map((course) => <option key={course.id} value={course.id}>{course.courseCode} - {course.title}</option>)}</select>{errors.courseId ? <p className="text-xs text-rose-600">{errors.courseId.message}</p> : null}</div>
    <div className="space-y-2"><label htmlFor="content" className="text-sm font-medium text-slate-700 dark:text-slate-200">Note</label><textarea id="content" {...register("content")} rows={18} placeholder="Start writing..." className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-4 text-base leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />{errors.content ? <p className="text-xs text-rose-600">{errors.content.message}</p> : null}</div>
    {error ? <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">{error}</div> : null}
    {success ? <div role="status" aria-live="polite" className="fixed bottom-5 right-5 z-40 max-w-sm rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 shadow-[0_18px_35px_rgba(15,23,42,0.12)] dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">{success}</div> : null}
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button type="button" variant="secondary" onClick={cancel}>Cancel</Button><Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save note"}</Button></div>
  </form></Card>;
}