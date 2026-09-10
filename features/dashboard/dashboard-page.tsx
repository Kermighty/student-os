import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  FolderKanban,
  Wallet,
} from "lucide-react";

import { AssignmentItem } from "@/features/dashboard/components/assignment-item";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import { MiniCalendar } from "@/features/dashboard/components/mini-calendar";
import { MotivationCard } from "@/features/dashboard/components/motivation-card";
import { NotePreviewCard } from "@/features/dashboard/components/note-preview-card";
import { ExpensePreviewCard } from "@/features/dashboard/components/expense-preview-card";
import { ProgressRing } from "@/features/dashboard/components/progress-ring";
import { ScheduleTimeline } from "@/features/dashboard/components/schedule-timeline";
import { StatCard } from "@/features/dashboard/components/stat-card";
import { statCards } from "@/features/dashboard/data";
import type { AssignmentRecord } from "@/features/assignments/assignment-types";
import type { NoteRecord } from "@/features/notes/note-types";
import type { ScheduleEventRecord } from "@/features/schedule/schedule-types";
import type { ExpenseRecord } from "@/features/expenses/expense-types";
import Link from "next/link";

interface DashboardPageProps {
  name: string;
  assignmentSummary: { pending: number; completed: number };
  upcomingAssignments: AssignmentRecord[];
  recentNotes: NoteRecord[];
  todaySchedule: ScheduleEventRecord[];
  financeSummary: { income: number; expenses: number };
  recentExpenses: ExpenseRecord[];
}

function getGreeting(date: Date) {
  const hour = date.getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function getIcon(name: string) {
  const icons = {
    BookOpen,
    ClipboardList,
    CalendarDays,
    Wallet,
  } as const;

  return icons[name as keyof typeof icons] ?? BookOpen;
}

export function DashboardPage({ name, assignmentSummary, upcomingAssignments, recentNotes, todaySchedule, financeSummary, recentExpenses }: DashboardPageProps) {
  const today = new Date();
  const greeting = getGreeting(today);
  const todayLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(today);

  return (
    <div className="space-y-6 pb-8">
      <DashboardHeader name={name} greeting={greeting} todayLabel={todayLabel} />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        {[...statCards.map((card) => card.label === "Pending Assignments" ? { ...card, value: String(assignmentSummary.pending), description: `${assignmentSummary.pending === 1 ? "1 assignment" : `${assignmentSummary.pending} assignments`} still in progress`, trend: "Live from PostgreSQL" } : card.label === "Monthly Expenses" ? { ...card, value: `$${financeSummary.expenses.toFixed(2)}`, description: "This month", trend: "Live from PostgreSQL" } : card), {
          label: "Completed Assignments",
          value: String(assignmentSummary.completed),
          description: "Finished assignments",
          trend: "Live from PostgreSQL",
          icon: "ClipboardList",
          tone: "emerald" as const,
        }].map((card) => {
          const Icon = getIcon(card.icon);

          return (
            <StatCard
              key={card.label}
              label={card.label}
              value={card.value}
              description={card.description}
              trend={card.trend}
              icon={<Icon className="h-5 w-5" />}
              tone={card.tone}
            />
          );
        })}
        {[{ label: "Monthly Balance", value: `$${(financeSummary.income - financeSummary.expenses).toFixed(2)}`, description: "Income minus expenses", trend: "Live from PostgreSQL", icon: "Wallet", tone: "blue" as const }].map((card) => { const Icon = getIcon(card.icon); return <StatCard key={card.label} label={card.label} value={card.value} description={card.description} trend={card.trend} icon={<Icon className="h-5 w-5" />} tone={card.tone} />; })}
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_360px]">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_38px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Upcoming</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">Assignments</h2>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <FolderKanban className="h-3.5 w-3.5" />
                View all
              </button>
            </div>

            <div className="mt-5">
              {upcomingAssignments.length > 0 ? (
                <ul className="space-y-3">
                  {upcomingAssignments.map((item) => (
                    <AssignmentItem key={item.id} item={item} />
                  ))}
                </ul>
              ) : (
                <EmptyState />
              )}
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_38px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="flex items-center justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Money flow</p><h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">Recent transactions</h2></div><Link href="/expenses" className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">Open expenses</Link></div>
            <div className="mt-5 space-y-3">{recentExpenses.length ? recentExpenses.map((expense) => <ExpensePreviewCard key={expense.id} expense={expense} />) : <EmptyState />}</div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_38px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Agenda</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">Today’s schedule</h2>
              </div>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
                {todaySchedule.length} {todaySchedule.length === 1 ? "session" : "sessions"}
              </span>
            </div>

            <div className="mt-5">
              {todaySchedule.length ? <ScheduleTimeline items={todaySchedule} /> : <EmptyState />}
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_38px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Workspace</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">Recent notes</h2>
              </div>
              <Link href="/notes" className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                Open notes
              </Link>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {recentNotes.length > 0 ? recentNotes.map((note) => (
                <NotePreviewCard key={note.id} note={note} />
              )) : <div className="md:col-span-2"><EmptyState /></div>}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <MiniCalendar />

          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_38px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Progress</p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">Study progress</h3>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <ProgressRing value={72} label="Semester progress" detail="63 hours completed" />
            </div>
          </div>

          <MotivationCard />
        </aside>
      </div>
    </div>
  );
}
