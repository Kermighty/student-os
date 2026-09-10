"use client";

import { useState } from "react";
import { BarChart3, BookOpen, CalendarDays, CheckCircle2, Download, FileJson, FileText, NotebookPen, Printer, Receipt, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatPHP } from "@/lib/currency";

type ReportsData = Awaited<ReturnType<typeof import("@/lib/server-data").getReportsData>>;

function downloadBlob(content: string, filename: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function csvCell(value: unknown) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

export function ReportsWorkspace({ data, accountName }: { data: ReportsData; accountName: string }) {
  const [exporting, setExporting] = useState<"json" | "csv" | null>(null);

  const exportJson = async () => {
    setExporting("json");
    const response = await fetch("/api/settings/profile");
    if (response.ok) downloadBlob(JSON.stringify(await response.json(), null, 2), "student-os-report-export.json", "application/json");
    setExporting(null);
  };

  const exportCsv = async () => {
    setExporting("csv");
    const response = await fetch("/api/settings/profile");
    if (response.ok) {
      const payload = await response.json();
      const rows = [
        ["Assignments"],
        ["Title", "Status", "Priority", "Due Date"],
        ...payload.assignments.map((item: { title: string; status: string; priority: string; dueDate: string }) => [item.title, item.status, item.priority, item.dueDate]),
        [],
        ["Notes"],
        ["Title", "Pinned", "Updated"],
        ...payload.notes.map((item: { title: string; pinned: boolean; updatedAt: string }) => [item.title, item.pinned ? "Yes" : "No", item.updatedAt]),
        [],
        ["Expenses"],
        ["Title", "Amount", "Type", "Date", "Payment Method"],
        ...payload.expenses.map((item: { title: string; amount: string | number; type: string; transactionDate: string; paymentMethod: string }) => [item.title, item.amount, item.type, item.transactionDate, item.paymentMethod]),
      ];
      downloadBlob(rows.map((row) => row.map(csvCell).join(",")).join("\n"), "student-os-report-export.csv", "text/csv;charset=utf-8");
    }
    setExporting(null);
  };

  const demandingCourse = data.academic.mostDemandingCourse;
  const topCategory = data.finance.topSpendingCategory;
  return <div className="reports-workspace space-y-6"><div className="reports-toolbar flex flex-col gap-4 border-b border-slate-200 pb-6 dark:border-slate-800 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-sm font-medium text-blue-600 dark:text-blue-300">Printable workspace</p><h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Reports</h1><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">A clear, exportable summary of your Student OS workspace.</p></div><div className="flex flex-wrap gap-2"><Button type="button" variant="secondary" onClick={() => window.print()}><Printer className="h-4 w-4" />Print report</Button><Button type="button" variant="secondary" onClick={exportJson} disabled={exporting !== null}><FileJson className="h-4 w-4" />{exporting === "json" ? "Exporting..." : "JSON"}</Button><Button type="button" onClick={exportCsv} disabled={exporting !== null}><Download className="h-4 w-4" />{exporting === "csv" ? "Exporting..." : "CSV"}</Button></div></div><div className="grid gap-6 xl:grid-cols-2"><Card className="report-card rounded-[24px] p-5 dark:bg-slate-900 sm:p-6"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Academic progress</p><h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">A semester at a glance</h2></div><BookOpen className="h-5 w-5 text-blue-600" /></div><div className="mt-6 grid grid-cols-2 gap-4"><Metric label="Courses" value={data.academic.totalCourses} /><Metric label="Assignments" value={data.academic.totalAssignments} /><Metric label="Completed" value={data.academic.completedAssignments} /><Metric label="Pending" value={data.academic.pendingAssignments} /></div><div className="mt-6"><div className="flex justify-between text-xs text-slate-500"><span>Completion rate</span><span>{data.academic.completionRate}%</span></div><div className="mt-2 h-3 rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-3 rounded-full bg-blue-600" style={{ width: `${data.academic.completionRate}%` }} /></div></div><p className="mt-5 text-sm text-slate-600 dark:text-slate-300">Most demanding course: <strong className="text-slate-900 dark:text-white">{demandingCourse ? `${demandingCourse.code} · ${demandingCourse.title}` : "Not enough data yet"}</strong></p></Card><Card className="report-card rounded-[24px] p-5 dark:bg-slate-900 sm:p-6"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Weekly productivity</p><h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">Your weekly rhythm</h2></div><BarChart3 className="h-5 w-5 text-emerald-600" /></div><div className="mt-6 grid grid-cols-2 gap-4"><Metric label="Study sessions" value={data.productivity.studySessions} /><Metric label="Classes attended" value={data.productivity.classesAttended} /><Metric label="Notes created" value={data.productivity.notesCreated} /><Metric label="Activity score" value={`${data.productivity.weeklyActivityScore}/100`} /></div><div className="mt-6 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-500/10"><CheckCircle2 className="h-5 w-5 text-emerald-600" /><p className="text-sm text-emerald-800 dark:text-emerald-200">Your activity score combines study sessions, class schedule, notes, and assignment momentum.</p></div></Card><Card className="report-card rounded-[24px] p-5 dark:bg-slate-900 sm:p-6"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Financial summary</p><h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">Monthly money flow</h2></div><Wallet className="h-5 w-5 text-violet-600" /></div><div className="mt-6 grid grid-cols-2 gap-4"><Metric label="Monthly income" value={formatPHP(data.finance.income)} tone="positive" /><Metric label="Monthly expenses" value={formatPHP(data.finance.spending)} /><Metric label="Remaining balance" value={formatPHP(data.finance.savings)} tone="accent" /><Metric label="Top category" value={topCategory?.name ?? "None yet"} /></div></Card><Card className="report-card rounded-[24px] p-5 dark:bg-slate-900 sm:p-6"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Student overview</p><h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">Portfolio profile sheet</h2></div><FileText className="h-5 w-5 text-rose-500" /></div><div className="mt-6 grid grid-cols-2 gap-4"><Metric label="Account" value={accountName} /><Metric label="Theme" value="System-aware" /><Metric label="Courses" value={data.overview.courses} icon={<BookOpen className="h-4 w-4" />} /><Metric label="Assignments" value={data.overview.assignments} icon={<CheckCircle2 className="h-4 w-4" />} /><Metric label="Notes" value={data.overview.notes} icon={<NotebookPen className="h-4 w-4" />} /><Metric label="Schedule events" value={data.overview.scheduleEvents} icon={<CalendarDays className="h-4 w-4" />} /><Metric label="Expenses" value={data.overview.expenses} icon={<Receipt className="h-4 w-4" />} /><Metric label="Export date" value={new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date())} /></div></Card></div><p className="text-xs text-slate-500 dark:text-slate-400">Generated from your authenticated PostgreSQL workspace. Print or export this report for your records.</p></div>;
}

function Metric({ label, value, tone, icon }: { label: string; value: string | number; tone?: "positive" | "accent"; icon?: React.ReactNode }) {
  return <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950"><p className="flex items-center gap-2 text-xs text-slate-500">{icon}{label}</p><p className={`mt-2 truncate text-lg font-semibold ${tone === "positive" ? "text-emerald-600 dark:text-emerald-300" : tone === "accent" ? "text-blue-600 dark:text-blue-300" : "text-slate-900 dark:text-white"}`}>{value}</p></div>;
}