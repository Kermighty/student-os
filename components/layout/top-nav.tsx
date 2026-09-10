import Link from "next/link";
import { Bell, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useFocusTrap } from "@/hooks/use-focus-trap";

interface TopNavProps {
  onMenuOpen: () => void;
}

export function TopNav({ onMenuOpen }: TopNavProps) {
  const { data: session } = useSession();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationData | null>(null);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const notificationRef = useFocusTrap(notificationsOpen, () => setNotificationsOpen(false));
  const userName = session?.user?.name ?? "Student";
  const initials = userName
    .split(" ")
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2) || "ST";

  const toggleNotifications = async () => {
    const nextOpen = !notificationsOpen;
    setNotificationsOpen(nextOpen);
    if (nextOpen && !notifications) {
      setLoadingNotifications(true);
      const response = await fetch("/api/notifications");
      if (response.ok) setNotifications(await response.json());
      setLoadingNotifications(false);
    }
  };

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
          <div className="relative">
          <Button type="button" variant="ghost" size="icon" className="min-h-11 min-w-11" aria-label="Open notifications" aria-expanded={notificationsOpen} onClick={toggleNotifications}>
            <Bell className="h-4 w-4" />
          </Button>
          {notificationsOpen ? <div ref={notificationRef} className="absolute right-0 top-14 z-50 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-800 dark:bg-slate-900" role="dialog" aria-label="Notifications"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Inbox</p><h2 className="mt-1 text-base font-semibold text-slate-900 dark:text-white">Notifications</h2></div><button type="button" onClick={() => setNotificationsOpen(false)} className="min-h-11 min-w-11 rounded-xl text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close notifications">×</button></div>{loadingNotifications ? <p className="py-8 text-center text-sm text-slate-500">Loading updates...</p> : notifications && <NotificationSections data={notifications} />}</div> : null}
          </div>
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

type NotificationData = {
  today: { classes: Array<{ id: string; title: string; startTime: string; location: string }>; assignments: Array<{ id: string; title: string; dueDate: string }> };
  recent: { notes: Array<{ id: string; title: string; createdAt: string }>; expenses: Array<{ id: string; title: string; createdAt: string }> };
};

function NotificationSections({ data }: { data: NotificationData }) {
  const sections = [
    { label: "Upcoming classes", items: data.today.classes.map((item) => `${item.title} · ${item.startTime}`), href: "/schedule" },
    { label: "Due assignments", items: data.today.assignments.map((item) => item.title), href: "/assignments" },
    { label: "New notes", items: data.recent.notes.map((item) => item.title), href: "/notes" },
    { label: "Recent expenses", items: data.recent.expenses.map((item) => item.title), href: "/expenses" },
  ];
  const hasItems = sections.some((section) => section.items.length > 0);
  if (!hasItems) return <div className="py-8 text-center"><Bell className="mx-auto h-6 w-6 text-slate-400" /><p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-200">You’re all caught up</p><p className="mt-1 text-xs text-slate-500">No new updates right now.</p></div>;
  return <div className="mt-4 max-h-[60vh] space-y-4 overflow-y-auto">{sections.filter((section) => section.items.length).map((section) => <section key={section.label}><div className="flex items-center justify-between"><h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{section.label}</h3><Link href={section.href} className="text-xs font-medium text-blue-600" >Open</Link></div><ul className="mt-2 space-y-1">{section.items.map((item) => <li key={item} className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700 dark:bg-slate-950 dark:text-slate-200">{item}</li>)}</ul></section>)}</div>;
}
