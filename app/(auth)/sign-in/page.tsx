import { auth } from "@/lib/auth";
import { LoginForm } from "./_components/LoginForm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect("/");
  }

  return <LoginForm></LoginForm>;
}
