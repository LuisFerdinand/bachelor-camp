import { auth } from "@/lib/auth";
import { DashboardLayout } from "@/modules/dashboard/ui/layouts/DashboardLayout";
import { trpc } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const user = await trpc.users.getUserWithRoles();
  if (!user) redirect("/sign-in");

  return <DashboardLayout>{children}</DashboardLayout>;
}
