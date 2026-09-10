"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6 dark:bg-slate-950"><div className="max-w-md rounded-3xl border border-rose-200 bg-white p-8 text-center shadow-xl dark:border-rose-500/30 dark:bg-slate-900"><h1 className="text-xl font-semibold text-slate-900 dark:text-white">Something went wrong</h1><p className="mt-2 text-sm text-slate-600 dark:text-slate-300">The workspace could not load this view.</p><button type="button" onClick={reset} className="mt-5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white">Try again</button></div></main>;
}