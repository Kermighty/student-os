import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

interface QuickActionButtonProps {
  label: string;
  icon: ReactNode;
  variant?: "primary" | "secondary";
}

export function QuickActionButton({ label, icon, variant = "primary" }: QuickActionButtonProps) {
  return (
    <Button
      type="button"
      variant={variant === "primary" ? "default" : "secondary"}
      className="h-11 rounded-2xl px-4 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
}
