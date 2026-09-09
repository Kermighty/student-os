interface ProgressRingProps {
  value: number;
  label: string;
  detail: string;
}

export function ProgressRing({ value, label, detail }: ProgressRingProps) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dash = (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative flex h-32 w-32 items-center justify-center">
        <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90" aria-label={`${label} progress`} role="img">
          <circle cx="70" cy="70" r={radius} stroke="rgba(148,163,184,0.2)" strokeWidth="10" fill="transparent" />
          <circle
            cx="70"
            cy="70"
            r={radius}
            stroke="url(#progressGradient)"
            strokeWidth="10"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference - dash}`}
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-slate-900 dark:text-white">{value}%</span>
        </div>
      </div>

      <p className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-300">{label}</p>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{detail}</p>
    </div>
  );
}
