import type { LucideIcon } from "lucide-react";
import { CalendarRange, ChartNoAxesCombined, FileText, GraduationCap, LayoutGrid, NotebookPen, Search, Settings, Wallet } from "lucide-react";

export const navigationItems: Array<{ href: string; label: string; icon: LucideIcon }> = [
  { href: "/", label: "Overview", icon: LayoutGrid },
  { href: "/courses", label: "Courses", icon: GraduationCap },
  { href: "/assignments", label: "Assignments", icon: FileText },
  { href: "/notes", label: "Notes", icon: NotebookPen },
  { href: "/schedule", label: "Schedule", icon: CalendarRange },
  { href: "/expenses", label: "Expenses", icon: Wallet },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/reports", label: "Reports", icon: ChartNoAxesCombined },
  { href: "/analytics", label: "Analytics", icon: ChartNoAxesCombined },
  { href: "/search", label: "Search", icon: Search },
];
