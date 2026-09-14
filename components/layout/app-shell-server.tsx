import { AppShell } from "@/components/layout/app-shell";
import { getSessionWorkspaceSnapshot, loadWorkspaceSnapshot } from "@/lib/workspace-snapshot";

/**
 * Server wrapper around the client `AppShell`. Reads the authenticated user's
 * workspace snapshot (course count + preferred currency) so both the desktop
 * sidebar and the mobile drawer render real PostgreSQL data.
 *
 * Pass `userId` from the page (it already read the session) to skip a second
 * session lookup. When omitted, the shell reads the session itself.
 */
export async function AppShellServer({ children, userId }: { children: React.ReactNode; userId?: string }) {
  const { courseCount, currency } = userId ? await loadWorkspaceSnapshot(userId) : await getSessionWorkspaceSnapshot();
  return (
    <AppShell courseCount={courseCount} currency={currency}>
      {children}
    </AppShell>
  );
}
