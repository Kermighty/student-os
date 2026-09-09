export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-40 rounded-[28px] bg-slate-200/80 dark:bg-slate-800/80" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-32 rounded-[24px] bg-slate-200/80 dark:bg-slate-800/80" />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_360px]">
        <div className="h-[420px] rounded-[28px] bg-slate-200/80 dark:bg-slate-800/80" />
        <div className="h-[420px] rounded-[28px] bg-slate-200/80 dark:bg-slate-800/80" />
      </div>
    </div>
  );
}
