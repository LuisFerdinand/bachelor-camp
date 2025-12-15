import { ROLES } from "@/db/schema/enums";
import { trpc } from "@/trpc/server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const user = await trpc.users.getUserWithRoles({ clerkId: userId });

  if (!user) redirect("/complete-profile");

  const roles = user.roles.map((r) => r.name);
  const last = user.lastActiveRole;

  // 1️⃣ Redirect to last active role if still valid
  if (last && roles.includes(last)) {
    redirect(`/dashboard/${last}`);
  }

  // 2️⃣ Otherwise redirect to highest priority role
  const highestRole = ROLES.find((role) => roles.includes(role));

  if (highestRole) {
    redirect(`/dashboard/${highestRole}`);
  }

  // 3️⃣ Safety fallback (should never happen)
  redirect("/no-role");
}
