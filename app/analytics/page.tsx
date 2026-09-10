import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { AppShell } from "@/components/layout/app-shell";
import { AnalyticsDashboard } from "@/features/analytics/analytics-dashboard";
import { getAnalyticsData } from "@/lib/server-data";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  return <AppShell><AnalyticsDashboard data={await getAnalyticsData(session.user.id)} /></AppShell>;
}