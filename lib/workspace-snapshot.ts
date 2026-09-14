import { cache } from "react";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";

export type WorkspaceSnapshot = {
  courseCount: number;
  currency: string;
};

export async function getWorkspaceSnapshot(userId: string): Promise<WorkspaceSnapshot> {
  const [courseCount, user] = await Promise.all([
    prisma.course.count({ where: { userId } }),
    prisma.user.findUnique({ where: { id: userId }, select: { preferredCurrency: true } }),
  ]);

  return { courseCount, currency: user?.preferredCurrency ?? "PHP" };
}

export async function getSessionWorkspaceSnapshot(): Promise<WorkspaceSnapshot> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { courseCount: 0, currency: "PHP" };
  return loadWorkspaceSnapshot(session.user.id);
}

/**
 * Snapshot lookup memoized per request. Pages already hold the authenticated
 * `userId`, so the shell can reuse it instead of reading the session a second
 * time and re-querying the same two rows during one render pass.
 */
export const loadWorkspaceSnapshot = cache(async (userId: string): Promise<WorkspaceSnapshot> => {
  return getWorkspaceSnapshot(userId);
});
