import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { AppShell } from "@/components/layout/app-shell";
import { authOptions } from "@/auth";
import { DashboardPage } from "@/features/dashboard/dashboard-page";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <AppShell>
      <DashboardPage name={session.user?.name ?? "Student"} />
    </AppShell>
  );
}
