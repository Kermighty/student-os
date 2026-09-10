import Link from "next/link";
import { ArrowDownLeft, ArrowUpRight, CreditCard } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatExpenseDate } from "@/features/expenses/expense-schema";
import { categoryColorClasses, type ExpenseRecord } from "@/features/expenses/expense-types";
import { formatPHP } from "@/lib/currency";

export function ExpenseCard({ expense }: { expense: ExpenseRecord }) {
  const income = expense.type === "INCOME";
  return <Link href={`/expenses/${expense.id}`} className="block"><Card className="group rounded-[24px] p-0 transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_35px_rgba(15,23,42,0.08)] dark:bg-slate-900 dark:hover:border-slate-700"><div className="flex items-stretch"><div className={`w-1.5 shrink-0 rounded-l-[24px] ${categoryColorClasses[expense.category.color] ?? "bg-slate-500"}`} /><div className="flex min-w-0 flex-1 items-center gap-4 p-5"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">{income ? <ArrowUpRight className="h-5 w-5 text-emerald-600" /> : <ArrowDownLeft className="h-5 w-5 text-rose-500" />}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{expense.category.name}</span><Badge variant={income ? "success" : "neutral"}>{income ? "Income" : "Expense"}</Badge></div><h2 className="mt-1 truncate text-base font-semibold text-slate-900 dark:text-white">{expense.title}</h2><div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400"><span>{formatExpenseDate(expense.transactionDate)}</span><span className="inline-flex items-center gap-1"><CreditCard className="h-3 w-3" />{expense.paymentMethod}</span></div></div><p className={`shrink-0 text-base font-semibold ${income ? "text-emerald-600 dark:text-emerald-300" : "text-slate-900 dark:text-white"}`}>{income ? "+" : "-"}{formatPHP(expense.amount)}</p></div></div></Card></Link>;
}