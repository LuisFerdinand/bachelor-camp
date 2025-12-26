// app/(auth)/sign-up/page.tsx
import { auth } from "@/lib/auth";
import { SignUpForm } from "./_components/SignUpForm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SignUpPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect("/");
  }

  return <SignUpForm />;
}
