import Link from "next/link";
import { Bell, Search, Sparkles } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

interface TopNavProps {
  onMenuOpen: () => void;
}

export function TopNav({ onMenuOpen }: TopNavProps) {
  const { data: session } = useSession();
  const userName = session?.user?.name ?? "Student";
  const initials = userName
    .split(" ")
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2) || "ST";

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open side navigation"
            onClick={onMenuOpen}
          >
            <Sparkles className="h-4 w-4" />
          </Button>

          <Link href="/search" className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 md:flex" aria-label="Open global search">
            <Search className="h-3.5 w-3.5" />
            Quick search
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>
          <ThemeToggle />
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
              {initials}
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-xs text-slate-500 dark:text-slate-400">Student</p>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{userName}</p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="hidden sm:inline-flex"
          >
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
}
