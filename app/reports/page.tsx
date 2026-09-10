import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { AppShell } from "@/components/layout/app-shell";
import { ReportsWorkspace } from "@/features/reports/reports-workspace";
import { getReportsData } from "@/lib/server-data";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  return <AppShell><ReportsWorkspace data={await getReportsData(session.user.id)} accountName={session.user.name ?? "Student"} /></AppShell>;
}