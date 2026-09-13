import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { AppShellServer as AppShell } from "@/components/layout/app-shell-server";
import { AnalyticsDashboard } from "@/features/analytics/analytics-dashboard";
import { getAnalyticsData } from "@/lib/server-data";
import { getWorkspaceSnapshot } from "@/lib/workspace-snapshot";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  const [data, snapshot] = await Promise.all([getAnalyticsData(session.user.id), getWorkspaceSnapshot(session.user.id)]);
  return <AppShell><AnalyticsDashboard data={data} currency={snapshot.currency} /></AppShell>;
}