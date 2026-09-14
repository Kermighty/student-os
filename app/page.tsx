import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { LandingPage } from "@/features/landing/landing-page";
import { isGoogleProviderEnabled } from "@/lib/auth-providers";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.user?.id) {
    redirect("/dashboard");
  }

  return <LandingPage hasGoogleProvider={isGoogleProviderEnabled()} />;
}