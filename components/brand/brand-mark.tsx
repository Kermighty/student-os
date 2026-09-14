import { cn } from "@/lib/utils";

/**
 * Student OS monogram — a minimal rounded-square mark with a clean "SO"
 * letterpair in the brand navy/blue gradient.
 *
 * Rendered as inline SVG so it stays crisp at every size, reads clearly from
 * favicon scale up to hero scale, and can be reused by the landing navbar,
 * sidebar, auth surfaces, and the generated favicon.
 *
 * Geometry notes: the two glyphs are laid out on a 48x48 grid and the pair is
 * optically centered as a group, with clear separation between the S and the O
 * so neither letter collides at small sizes.
 */
export function BrandMark({ className, size = 36 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      role="img"
      aria-label="Student OS"
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id="soMarkSurface" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="soMarkGlyph" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e8f0ff" />
        </linearGradient>
      </defs>

      {/* Rounded-square tile */}
      <rect x="0" y="0" width="48" height="48" rx="13" fill="url(#soMarkSurface)" />
      {/* Inner highlight for depth */}
      <rect x="0.5" y="0.5" width="47" height="47" rx="12.5" fill="none" stroke="rgba(255,255,255,0.18)" />

      {/*
        "S" — a uniform-width letterform built from two opposing arcs so the
        spine stays vertical and the terminals sit square. Reads correctly from
        24px upward. Occupies roughly x 12..23, y 15..33.
      */}
      <path
        d="M22.6 20.1c-.5-1.9-1.7-3.1-3.4-3.4-2.3-.4-4.1.8-4.5 2.8-.3 1.6.5 2.7 2.3 3.1l3.7.8c2.4.5 3.5 1.8 3.1 3.7-.5 2.4-2.7 3.7-5.4 3.2-1.8-.3-3-1.4-3.5-3"
        fill="none"
        stroke="url(#soMarkGlyph)"
        strokeWidth="2.9"
        strokeLinecap="butt"
        strokeLinejoin="round"
      />

      {/*
        "O" — a clean ring at x ~26..37, vertically centered against the S.
        Deliberately separated from the S by a clear gutter.
      */}
      <circle
        cx="32.4"
        cy="24"
        r="5.4"
        fill="none"
        stroke="url(#soMarkGlyph)"
        strokeWidth="2.9"
      />
    </svg>
  );
}

/**
 * The full brand lockup: monogram plus wordmark. Used where the product name
 * should appear next to the icon.
 */
export function BrandLockup({ subtitle = "Life dashboard", className }: { subtitle?: string | null; className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <BrandMark />
      <span className="leading-tight">
        <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Student OS</span>
        {subtitle ? <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">{subtitle}</span> : null}
      </span>
    </span>
  );
}
