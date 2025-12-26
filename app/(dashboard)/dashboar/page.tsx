import { auth } from "@/lib/auth";
import UserDashboard from "@/modules/dashboard/ui/components/UserDashboard";
import { trpc } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const user = await trpc.users.getUserWithRoles();
  // if (!user) redirect("/sign-in");

  console.log({ user });

  const roles = user.roles.map((r) => r.name);
  const last = user.lastActiveRole;

  // 🟢 No roles → normal user dashboard
  if (roles.length === 0) {
    return <UserDashboard user={user} />;
  }

  // 1️⃣ Redirect to last active operational role
  if (last && roles.includes(last)) {
    redirect(`/dashboard/${last}`);
  }

  // 3️⃣ Fallback: stay on user dashboard
  return <UserDashboard user={user} />;
}
