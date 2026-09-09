"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function DeleteCourseDialog({ courseId, courseTitle }: { courseId: string; courseTitle: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleDelete = async () => {
    setSubmitting(true);

    const response = await fetch(`/api/courses/${courseId}`, {
      method: "DELETE",
    });

    setSubmitting(false);

    if (!response.ok) {
      return;
    }

    router.push("/courses");
    router.refresh();
  };

  if (!open) {
    return (
      <Button type="button" variant="danger" onClick={() => setOpen(true)}>
        Delete course
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <Card className="w-full max-w-md rounded-[26px] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Delete course</p>
        <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Remove {courseTitle}?</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          This permanently removes the course and its academic records from your account. This action cannot be undone.
        </p>

        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="button" variant="danger" onClick={handleDelete} disabled={submitting}>
            {submitting ? "Deleting..." : "Confirm delete"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
