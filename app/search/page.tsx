import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { AppShellServer as AppShell } from "@/components/layout/app-shell-server";
import { GlobalSearch } from "@/features/search/global-search";

export default async function SearchPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  return <AppShell><GlobalSearch /></AppShell>;
}