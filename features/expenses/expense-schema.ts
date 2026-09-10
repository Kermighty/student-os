import { z } from "zod";

export const transactionTypes = ["EXPENSE", "INCOME"] as const;
export const categoryColors = ["orange", "blue", "emerald", "violet", "rose", "amber", "cyan", "slate", "green"] as const;

export const builtInCategories = [
  { name: "Food", color: "orange" },
  { name: "Transportation", color: "emerald" },
  { name: "School", color: "blue" },
  { name: "Rent", color: "slate" },
  { name: "Entertainment", color: "violet" },
  { name: "Shopping", color: "rose" },
  { name: "Salary", color: "green" },
  { name: "Other", color: "slate" },
] as const;

export const expenseSchema = z.object({
  categoryId: z.string().cuid("Select a category."),
  title: z.string().trim().min(2, "Title must be at least 2 characters.").max(160),
  amount: z.number().positive("Amount must be greater than zero.").max(99999999.99),
  type: z.enum(transactionTypes),
  transactionDate: z.string().min(1, "Choose a transaction date.").refine((value) => !Number.isNaN(Date.parse(value)), "Choose a valid date."),
  paymentMethod: z.string().trim().min(2, "Payment method is required.").max(80),
  notes: z.string().trim().max(2000, "Notes must be 2,000 characters or fewer."),
});

export const categorySchema = z.object({
  name: z.string().trim().min(2, "Category name must be at least 2 characters.").max(60),
  color: z.enum(categoryColors),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;
export type CategoryFormValues = z.infer<typeof categorySchema>;

export function formatCurrency(amount: number | string) {
  return new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(Number(amount));
}

export function formatExpenseDate(value: Date | string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

export function formatDateInput(value: Date | string) {
  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 10);
}