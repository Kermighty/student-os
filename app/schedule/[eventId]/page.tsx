import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { AppShell } from "@/components/layout/app-shell";
import { ScheduleDetail } from "@/features/schedule/schedule-detail";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ScheduleDetailPage({ params }: { params: Promise<{ eventId: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  const event = await prisma.scheduleEvent.findFirst({ where: { id: (await params).eventId, userId: session.user.id }, include: { course: { select: { id: true, courseCode: true, title: true, color: true } } } });
  if (!event) notFound();
  return <AppShell><ScheduleDetail event={{ ...event, createdAt: event.createdAt.toISOString(), updatedAt: event.updatedAt.toISOString() }} /></AppShell>;
}