import { Home, Users, BarChart } from "lucide-react";
import { hasPermission } from "./permissions";
import { Role } from "@/db/schema/enums";

type SidebarContext = {
  role: Role | null;
};

export type SidebarItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  showIf?: (ctx: SidebarContext) => boolean;
};

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "User Management",
    href: "/dashboard/super_admin/users",
    icon: Users,
    showIf: ({ role }) => hasPermission(role, "manageUsers"),
  },
  {
    label: "Analytics",
    href: "/dashboard/admin/analytics",
    icon: BarChart,
    showIf: ({ role }) => hasPermission(role, "viewAnalytics"),
  },
];
