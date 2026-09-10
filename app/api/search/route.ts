import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/auth";
import { searchWorkspace } from "@/lib/server-data";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const query = new URL(request.url).searchParams.get("q") ?? "";
  if (query.trim().length < 2) return NextResponse.json({ results: { courses: [], assignments: [], notes: [], scheduleEvents: [], expenses: [] } });
  return NextResponse.json({ results: await searchWorkspace(session.user.id, query) });
}