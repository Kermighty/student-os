"use client";

import Link from "next/link";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { useMobileNav } from "@/hooks/use-mobile-nav";
import { navigationItems } from "@/components/layout/navigation";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { isOpen, close, open } = useMobileNav();

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-30 bg-slate-950/60 md:hidden">
          <div className="h-full w-[82%] max-w-xs bg-white p-4 shadow-2xl dark:bg-slate-950">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-xs font-semibold text-white">
                  SO
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Student OS</p>
                  <p className="text-sm font-semibold">Navigation</p>
                </div>
              </div>
              <Button type="button" variant="ghost" size="icon" onClick={close} aria-label="Close navigation">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-1.5">
              {navigationItems.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} className="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white" onClick={close}>
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex min-h-screen flex-1 flex-col">
        <TopNav onMenuOpen={open} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
