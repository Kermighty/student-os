export type ExpenseCategoryRecord = { id: string; name: string; color: string; createdAt: string };

export type ExpenseRecord = {
  id: string;
  title: string;
  amount: number;
  type: "EXPENSE" | "INCOME";
  transactionDate: string;
  paymentMethod: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  category: ExpenseCategoryRecord;
};

export const categoryColorClasses: Record<string, string> = {
  orange: "bg-orange-500",
  blue: "bg-blue-500",
  emerald: "bg-emerald-500",
  violet: "bg-violet-500",
  rose: "bg-rose-500",
  amber: "bg-amber-500",
  cyan: "bg-cyan-500",
  slate: "bg-slate-500",
  green: "bg-green-500",
};