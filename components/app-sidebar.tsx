"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { RoleSwitcher } from "./team-switcher";
import { NavUser } from "@/modules/dashboard/ui/components/DashboardSidebar/NavUser";
import {
  NavItem,
  NavSubGroup,
  SidebarNavGroup,
  SidebarNavItem,
} from "@/modules/dashboard/ui/components/DashboardSidebar";
import {
  articlesRoutes,
  contentRoutes,
  engagementRoutes,
  mainRoutes,
  personalRoutes,
  servicesRoutes,
  systemRoutes,
  userRoutes,
} from "@/constants";
import { Role } from "@/db/schema/enums";
import { usePathname } from "next/navigation";
import { getActiveRoleFromPathname } from "@/lib/utils";

function hasAccess(
  routeRoles: Role[] | undefined,
  activeRole: Role | "personal"
) {
  // Personal dashboard → only routes without role restriction
  if (activeRole === "personal") {
    return !routeRoles || routeRoles.length === 0;
  }

  // Role dashboard
  if (!routeRoles || routeRoles.length === 0) return false;

  return routeRoles.includes(activeRole);
}

function filterNavItems(items: NavItem[], activeRole: Role | "personal") {
  return items.filter((item) => hasAccess(item.roles, activeRole));
}

function filterNavSubGroups(
  groups: NavSubGroup[],
  activeRole: Role | "personal"
): NavSubGroup[] {
  return groups
    .map((group) => {
      // direct link
      if (group.url) {
        return hasAccess(group.roles, activeRole) ? group : null;
      }

      // dropdown
      if (group.items) {
        const visibleItems = group.items.filter((item) =>
          hasAccess(item.roles, activeRole)
        );

        if (visibleItems.length === 0) return null;

        return {
          ...group,
          items: visibleItems,
        };
      }

      return null;
    })
    .filter(Boolean) as NavSubGroup[];
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const activeRole = getActiveRoleFromPathname(pathname);

  return (
    <Sidebar collapsible="icon" {...props} className="h-screen">
      <SidebarHeader className="shrink-0">
        <RoleSwitcher />
      </SidebarHeader>
      <SidebarContent className="flex-1 min-h-0">
        <div className="h-full overflow-y-auto mx-2 hide-scrollbar">
          <SidebarNavItem activeRole={activeRole} items={mainRoutes} />
          {/* {activeRole === "personal" && (
          <SidebarNavGroup
            activeRole={activeRole}
            label="Dashboard"
            items={filterNavSubGroups(personalRoutes, activeRole)}
          />
        )} */}
          <SidebarNavGroup
            activeRole={activeRole}
            label="Dashboard"
            items={personalRoutes}
          />
          {/* <SidebarNavGroup
          activeRole={activeRole}
          label="CMS"
          items={filterNavSubGroups(contentRoutes, activeRole)}
        /> */}
          <SidebarNavGroup
            activeRole={activeRole}
            label="CMS"
            items={contentRoutes}
          />
          {/* <SidebarNavGroup
          activeRole={activeRole}
          label="Services"
          items={filterNavSubGroups(servicesRoutes, activeRole)}
        /> */}
          <SidebarNavGroup
            activeRole={activeRole}
            label="Services"
            items={servicesRoutes}
          />{" "}
          {/* <SidebarNavGroup
          activeRole={activeRole}
          label="Articles"
          items={filterNavSubGroups(articlesRoutes, activeRole)}
        /> */}
          <SidebarNavGroup
            activeRole={activeRole}
            label="Articles"
            items={articlesRoutes}
          />{" "}
          {/* <SidebarNavGroup
          activeRole={activeRole}
          label="Engagement"
          items={filterNavSubGroups(engagementRoutes, activeRole)}
        /> */}
          <SidebarNavGroup
            activeRole={activeRole}
            label="Engagement"
            items={engagementRoutes}
          />
          {/* <SidebarNavGroup
          activeRole={activeRole}
          label="Users"
          items={filterNavSubGroups(userRoutes, activeRole)}
        /> */}
          <SidebarNavGroup
            activeRole={activeRole}
            label="Users"
            items={userRoutes}
          />
          {/* <NavSingle projects={data.projects} />
        <NavGroup items={data.navMain} /> */}
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t shrink-0">
        <SidebarNavItem activeRole={activeRole} items={systemRoutes} />
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
