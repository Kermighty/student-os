import { AppShell } from "@/components/layout/app-shell";
import { getSessionWorkspaceSnapshot } from "@/lib/workspace-snapshot";

/**
 * Server wrapper around the client `AppShell`. Reads the authenticated user's
 * workspace snapshot (course count + preferred currency) so both the desktop
 * sidebar and the mobile drawer render real PostgreSQL data.
 */
export async function AppShellServer({ children }: { children: React.ReactNode }) {
  const { courseCount, currency } = await getSessionWorkspaceSnapshot();
  return (
    <AppShell courseCount={courseCount} currency={currency}>
      {children}
    </AppShell>
  );
}
