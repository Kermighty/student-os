import Link from "next/link";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

import { formatExpenseDate } from "@/features/expenses/expense-schema";
import { categoryColorClasses, type ExpenseRecord } from "@/features/expenses/expense-types";
import { formatPHP } from "@/lib/currency";

export function ExpensePreviewCard({ expense }: { expense: ExpenseRecord }) {
  const income = expense.type === "INCOME";
  return <Link href={`/expenses/${expense.id}`} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 p-3 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/50"><span className={`h-9 w-1.5 rounded-full ${categoryColorClasses[expense.category.color] ?? "bg-slate-500"}`} /><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">{income ? <ArrowUpRight className="h-4 w-4 text-emerald-600" /> : <ArrowDownLeft className="h-4 w-4 text-rose-500" />}</span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium text-slate-900 dark:text-white">{expense.title}</span><span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">{expense.category.name} · {formatExpenseDate(expense.transactionDate)}</span></span><span className={`text-sm font-semibold ${income ? "text-emerald-600 dark:text-emerald-300" : "text-slate-900 dark:text-white"}`}>{income ? "+" : "-"}{formatPHP(expense.amount)}</span></Link>;
}