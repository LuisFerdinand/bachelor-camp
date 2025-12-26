import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { trpc } from "@/trpc/server";
import { authClient } from "@/lib/auth-client";
import UserDashboard from "@/modules/dashboard/ui/components/UserDashboard";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { data: session, isPending: authLoading } = authClient.useSession();

  const user = await trpc.users.getUserWithRoles();

  const roles = user.roles.map((r) => r.name);
  const last = user.lastActiveRole;

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
