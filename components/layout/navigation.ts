import type { LucideIcon } from "lucide-react";
import { CalendarRange, ChartNoAxesCombined, FileText, GraduationCap, LayoutGrid, NotebookPen, ScrollText, Search, Settings, Wallet } from "lucide-react";

export const navigationItems: Array<{ href: string; label: string; icon: LucideIcon }> = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/courses", label: "Courses", icon: GraduationCap },
  { href: "/assignments", label: "Assignments", icon: FileText },
  { href: "/notes", label: "Notes", icon: NotebookPen },
  { href: "/schedule", label: "Schedule", icon: CalendarRange },
  { href: "/expenses", label: "Expenses", icon: Wallet },
  { href: "/analytics", label: "Analytics", icon: ChartNoAxesCombined },
  { href: "/reports", label: "Reports", icon: ScrollText },
  { href: "/search", label: "Search", icon: Search },
  { href: "/settings", label: "Settings", icon: Settings },
];
