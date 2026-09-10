import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { authOptions } from "@/auth";
import { exportUserData } from "@/lib/server-data";
import { prisma } from "@/lib/prisma";

const profileSchema = z.object({ name: z.string().trim().min(2).max(80) });
const passwordSchema = z.object({ currentPassword: z.string().min(8), newPassword: z.string().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/) });

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  if (body.currentPassword || body.newPassword) {
    const parsed = passwordSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Password must be at least 8 characters and include upper, lower, and numeric characters." }, { status: 400 });
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user?.password || !(await bcrypt.compare(parsed.data.currentPassword, user.password))) return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
    await prisma.user.update({ where: { id: session.user.id }, data: { password: await bcrypt.hash(parsed.data.newPassword, 12) } });
    return NextResponse.json({ message: "Password updated." });
  }
  const parsed = profileSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Display name must be between 2 and 80 characters." }, { status: 400 });
  const user = await prisma.user.update({ where: { id: session.user.id }, data: { name: parsed.data.name }, select: { id: true, name: true, email: true } });
  return NextResponse.json({ user });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await exportUserData(session.user.id));
}