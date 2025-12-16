import { ROLES } from "@/db/schema/enums";
import UserDashboard from "@/modules/dashboard/ui/components/UserDashboard";
import { trpc } from "@/trpc/server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await trpc.users.getUserWithRoles({ clerkId: userId });

  if (!user) redirect("/sign-in");

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
