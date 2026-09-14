import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { AppShellServer as AppShell } from "@/components/layout/app-shell-server";
import { SettingsPage } from "@/features/settings/settings-page";

export default async function SettingsRoute() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  return <AppShell userId={session.user.id}><SettingsPage user={{ name: session.user.name ?? "Student", email: session.user.email ?? "" }} /></AppShell>;
}