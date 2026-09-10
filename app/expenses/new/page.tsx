import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/ui/page-header";
import { ensureBuiltInCategories } from "@/features/expenses/expense-data";
import { ExpenseForm } from "@/features/expenses/expense-form";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NewExpensePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  await ensureBuiltInCategories(session.user.id);
  const categories = await prisma.expenseCategory.findMany({ where: { userId: session.user.id }, orderBy: { name: "asc" } });
  return <AppShell><div className="space-y-6"><PageHeader title="New transaction" description="Record where your money went or what came in." /><ExpenseForm categories={categories.map((category) => ({ ...category, createdAt: category.createdAt.toISOString() }))} mode="create" /></div></AppShell>;
}