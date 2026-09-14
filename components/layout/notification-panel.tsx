"use client";

import Link from "next/link";
import { Bell, X } from "lucide-react";
import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { useFocusTrap } from "@/hooks/use-focus-trap";

export type NotificationData = {
  today: { classes: Array<{ id: string; title: string; startTime: string; location: string }>; assignments: Array<{ id: string; title: string; dueDate: string }> };
  recent: { notes: Array<{ id: string; title: string; createdAt: string }>; expenses: Array<{ id: string; title: string; transactionDate: string }> };
};

function NotificationSections({ data }: { data: NotificationData }) {
  const sections = [
    { label: "Upcoming classes", items: data.today.classes.map((item) => `${item.title} · ${item.startTime}`), href: "/schedule" },
    { label: "Due assignments", items: data.today.assignments.map((item) => item.title), href: "/assignments" },
    { label: "New notes", items: data.recent.notes.map((item) => item.title), href: "/notes" },
    { label: "Recent expenses", items: data.recent.expenses.map((item) => item.title), href: "/expenses" },
  ];
  const hasItems = sections.some((section) => section.items.length > 0);

  if (!hasItems) {
    return (
      <div className="py-10 text-center">
        <Bell className="mx-auto h-6 w-6 text-slate-400" />
        <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-200">You’re all caught up</p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">No new updates right now.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4 md:max-h-[60vh] md:overflow-y-auto">
      {sections
        .filter((section) => section.items.length)
        .map((section) => (
          <section key={section.label}>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{section.label}</h3>
              <Link href={section.href} className="shrink-0 text-xs font-medium text-blue-600 dark:text-blue-300">
                Open
              </Link>
            </div>
            <ul className="mt-2 space-y-1">
              {section.items.map((item) => (
                <li key={item} className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700 dark:bg-[#0b1220] dark:text-slate-200">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
    </div>
  );
}

/**
 * Notification surface for the top navigation.
 *
 * Desktop keeps the anchored popover. Mobile gets a full-width bottom sheet
 * that scrolls with its content, has a grab handle and touch-sized close
 * button, and dismisses on Escape or outside click via the focus-trap hook.
 *
 * The panel is rendered through a portal to <body>: the sticky header uses
 * `backdrop-blur`, and `backdrop-filter` establishes a containing block for
 * `position: fixed` descendants. Without the portal the sheet would be
 * positioned against the 64px header instead of the viewport and render
 * partially off-screen.
 */
export function NotificationPanel({
  open,
  onClose,
  loading,
  data,
}: {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  data: NotificationData | null;
}) {
  const panelRef = useFocusTrap(open, onClose);
  // Portals cannot render during SSR; mirror the ThemeToggle mount check.
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  if (!open || !mounted) return null;

  const body = loading ? (
    <p className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">Loading updates...</p>
  ) : data ? (
    <NotificationSections data={data} />
  ) : null;

  return createPortal(
    <>
      {/* Mobile: dimmed backdrop + bottom sheet */}
      <div className="fixed inset-0 z-40 bg-slate-950/50 md:hidden" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Notifications"
        className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] w-full flex-col rounded-t-[28px] border-t border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-[#111a2b] md:absolute md:inset-x-auto md:bottom-auto md:right-0 md:top-14 md:max-h-none md:w-[min(22rem,calc(100vw-2rem))] md:rounded-2xl md:border md:p-4"
      >
        <div className="mx-auto mb-3 h-1.5 w-10 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700 md:hidden" />
        <div className="flex shrink-0 items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Inbox</p>
            <h2 className="mt-1 text-base font-semibold text-slate-900 dark:text-white">Notifications</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close notifications"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto md:overflow-visible">{body}</div>
      </div>
    </>,
    document.body,
  );
}
