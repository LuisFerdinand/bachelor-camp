import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { trpc } from "@/trpc/server";
import { DashboardLayout } from "@/modules/dashboard/ui/layouts/DashboardLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await trpc.users.getUserWithRoles({ clerkId: userId });
  if (!user) redirect("/sign-in");

  return <DashboardLayout user={user}>{children}</DashboardLayout>;
}
