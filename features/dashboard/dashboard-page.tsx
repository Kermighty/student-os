import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  FolderKanban,
  Plus,
  Wallet,
} from "lucide-react";

import { AssignmentItem } from "@/features/dashboard/components/assignment-item";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import { MiniCalendar } from "@/features/dashboard/components/mini-calendar";
import { MotivationCard } from "@/features/dashboard/components/motivation-card";
import { NotePreviewCard } from "@/features/dashboard/components/note-preview-card";
import { ExpensePreviewCard } from "@/features/dashboard/components/expense-preview-card";
import { formatCurrency, DEFAULT_CURRENCY } from "@/lib/currency";
import { ProgressRing } from "@/features/dashboard/components/progress-ring";
import { ScheduleTimeline } from "@/features/dashboard/components/schedule-timeline";
import { StatCard } from "@/features/dashboard/components/stat-card";

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
  currency?: string;
  courseCount: number;
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

export function DashboardPage({ name, assignmentSummary, upcomingAssignments, recentNotes, todaySchedule, financeSummary, recentExpenses, currency = DEFAULT_CURRENCY, courseCount }: DashboardPageProps) {
  const formatMoney = (value: number | string) => formatCurrency(value, currency);
  const today = new Date();
  const greeting = getGreeting(today);
  const todayLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(today);

  const totalAssignments = assignmentSummary.pending + assignmentSummary.completed;
  const nextDue = upcomingAssignments[0];
  const nextDueLabel = nextDue
    ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(nextDue.dueDate))
    : null;

  const statCards = [
    {
      label: "Active Courses",
      value: String(courseCount),
      description: courseCount === 1 ? "1 course enrolled" : `${courseCount} courses enrolled`,
      trend: "Always up to date",
      icon: "BookOpen",
      tone: "blue" as const,
    },
    {
      label: "Pending Assignments",
      value: String(assignmentSummary.pending),
      description: assignmentSummary.pending === 1 ? "1 assignment in progress" : `${assignmentSummary.pending} assignments in progress`,
      trend: nextDueLabel ? `Next due ${nextDueLabel}` : "Nothing due soon",
      icon: "ClipboardList",
      tone: "amber" as const,
    },
    {
      label: "Completed Assignments",
      value: String(assignmentSummary.completed),
      description: `Of ${totalAssignments} ${totalAssignments === 1 ? "assignment" : "assignments"} total`,
      trend: "Synced automatically",
      icon: "CalendarDays",
      tone: "emerald" as const,
    },
    {
      label: "Monthly Expenses",
      value: formatMoney(financeSummary.expenses),
      description: "Spent this month",
      trend: "Updated just now",
      icon: "Wallet",
      tone: "violet" as const,
    },
    {
      label: "Monthly Balance",
      value: formatMoney(financeSummary.income - financeSummary.expenses),
      description: "Income minus expenses",
      trend: "Your latest data",
      icon: "Wallet",
      tone: "blue" as const,
    },
  ];

  const completionRate = totalAssignments ? Math.round((assignmentSummary.completed / totalAssignments) * 100) : 0;
  const progressDetail = totalAssignments
    ? `${assignmentSummary.completed} of ${totalAssignments} completed`
    : "No assignments yet";

  const headerSummary = totalAssignments
    ? `You have ${assignmentSummary.pending} pending and ${assignmentSummary.completed} completed ${totalAssignments === 1 ? "assignment" : "assignments"} across ${courseCount} ${courseCount === 1 ? "course" : "courses"}.`
    : `You have ${courseCount} ${courseCount === 1 ? "course" : "courses"} set up. Add your first assignment to get started.`;

  return (
    <div className="space-y-6 pb-8">
      <DashboardHeader name={name} greeting={greeting} todayLabel={todayLabel} summary={headerSummary} />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        {statCards.map((card) => {
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
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_360px]">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_38px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Upcoming</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">Assignments</h2>
              </div>
              <div className="flex items-center gap-2"><Link href="/assignments/new" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98]"><Plus className="h-3.5 w-3.5" />Add</Link><Link href="/assignments" className="inline-flex items-center gap-2 rounded-full border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"><FolderKanban className="h-3.5 w-3.5" />View all</Link></div>
            </div>

            <div className="mt-5">
              {upcomingAssignments.length > 0 ? (
                <ul className="space-y-3">
                  {upcomingAssignments.map((item) => (
                    <AssignmentItem key={item.id} item={item} />
                  ))}
                </ul>
              ) : (
                <EmptyState title="No upcoming assignments" description="Your work list is clear. Add an assignment to keep momentum going." action={{ href: "/assignments/new", label: "Add assignment" }} />
              )}
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_38px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="flex items-center justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Money flow</p><h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">Recent transactions</h2></div><div className="flex items-center gap-2"><Link href="/expenses/new" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:-translate-y-0.5 hover:bg-blue-500 active:translate-y-0 active:scale-[0.98]"><Plus className="h-3.5 w-3.5" />Add</Link><Link href="/expenses" className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">Open expenses</Link></div></div>
            <div className="mt-5 space-y-3">{recentExpenses.length ? recentExpenses.map((expense) => <ExpensePreviewCard key={expense.id} expense={expense} />) : <EmptyState title="No transactions yet" description="Track your first income or expense to see your monthly balance at a glance." action={{ href: "/expenses/new", label: "Add expense" }} />}</div>
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
              {todaySchedule.length ? <ScheduleTimeline items={todaySchedule} /> : <EmptyState title="Nothing scheduled today" description="Your day is open. Add a class, study block, or exam to plan it out." action={{ href: "/schedule/new", label: "Add event" }} />}
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
              )) : <div className="md:col-span-2"><EmptyState title="No notes yet" description="Capture lecture ideas, research, or reminders in one place." action={{ href: "/notes/new", label: "Add note" }} /></div>}
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
              <ProgressRing value={completionRate} label="Assignment progress" detail={progressDetail} />
            </div>
          </div>

          <MotivationCard />
        </aside>
      </div>
    </div>
  );
}
