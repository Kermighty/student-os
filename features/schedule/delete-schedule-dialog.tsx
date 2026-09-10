"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function DeleteScheduleDialog({ eventId, title }: { eventId: string; title: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const handleDelete = async () => { setSubmitting(true); const response = await fetch(`/api/schedule/${eventId}`, { method: "DELETE" }); if (!response.ok) { setError("Unable to delete this event."); setSubmitting(false); return; } router.push("/schedule"); router.refresh(); };
  if (!open) return <Button type="button" variant="danger" onClick={() => setOpen(true)}>Delete</Button>;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4" role="dialog" aria-modal="true" aria-labelledby="delete-event-title"><Card className="w-full max-w-md rounded-[24px] p-6"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">Permanent deletion</p><h2 id="delete-event-title" className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Delete {title}?</h2><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">This schedule event will be permanently removed. This action cannot be undone.</p>{error ? <p role="alert" className="mt-3 text-sm text-rose-600">{error}</p> : null}<div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button type="button" variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button type="button" variant="danger" onClick={handleDelete} disabled={submitting}>{submitting ? "Deleting..." : "Delete permanently"}</Button></div></Card></div>;
}