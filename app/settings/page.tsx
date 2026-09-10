import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { AppShell } from "@/components/layout/app-shell";
import { SettingsPage } from "@/features/settings/settings-page";

export default async function SettingsRoute() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  return <AppShell><SettingsPage user={{ name: session.user.name ?? "Student", email: session.user.email ?? "" }} /></AppShell>;
}