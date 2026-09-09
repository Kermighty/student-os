export function MotivationCard() {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-slate-50 shadow-[0_20px_35px_rgba(15,23,42,0.15)] dark:border-slate-700 dark:from-slate-900 dark:to-slate-950">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300">Momentum</p>
      <blockquote className="mt-4 text-lg leading-7 text-white/90">
        “Consistency compounds faster than intensity. Show up for the next 20 minutes.”
      </blockquote>
    </div>
  );
}
