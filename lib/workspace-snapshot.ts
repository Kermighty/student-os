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
  return getWorkspaceSnapshot(session.user.id);
}
