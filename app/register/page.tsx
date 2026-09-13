import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { RegisterForm } from "@/components/auth/register-form";
import { authOptions } from "@/auth";
import { isGoogleProviderEnabled } from "@/lib/auth-providers";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return <RegisterForm hasGoogleProvider={isGoogleProviderEnabled()} />;
}
