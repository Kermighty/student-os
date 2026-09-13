import type { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface QuickActionButtonProps {
  href: string;
  label: string;
  icon: ReactNode;
  variant?: "primary" | "secondary";
}

const variantStyles = {
  primary: "bg-blue-600 text-white shadow-sm shadow-blue-500/20 hover:bg-blue-500",
  secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
};

export function QuickActionButton({ href, label, icon, variant = "primary" }: QuickActionButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-medium shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98]",
        variantStyles[variant],
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
