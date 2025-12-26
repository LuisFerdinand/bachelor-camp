// DashboardSidebar.tsx
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import Link from "next/link";
import ResponsiveSidebarContent from "./ResponsiveSidebarContent";
import { UserMenu } from "@/components/UserMenu";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { NavUser } from "./NavUser";
import { Role } from "@/db/schema/enums";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRightIcon, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn, resolveDashboardHref } from "@/lib/utils";
import { usePathname } from "next/navigation";

type RoleType = {
  id: string;
  name: Role;
};

type UserDashboardProps = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  image: string | null;
  email: string | null;
  phone: string | null;
  lastActiveRole: string | null;
  roles: RoleType[];
};
interface DashboardSidebarProps {
  user: UserDashboardProps;
}

export const DashboardSidebar = ({ user }: DashboardSidebarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const closeMenus = () => {
    setIsMenuOpen(false);
  };
  return (
    <>
      {!isMobile && (
        <Sidebar className="pt-16 z-40 scrollbar-custom" collapsible="icon">
          <SidebarContent className="gap-0">
            <div className="flex justify-between items-center">
              <Link prefetch href="/dashboard" className="block md:hidden">
                <div className="p-2 mb-2">
                  <Image src="/Logo.png" alt="Logo" height={30} width={150} />
                </div>
              </Link>
            </div>
            <ResponsiveSidebarContent />
          </SidebarContent>
          <SidebarFooter>
            <NavUser></NavUser>
          </SidebarFooter>
        </Sidebar>
      )}
    </>
  );
};

export type NavItem = {
  label: string;
  url: string;
  icon: LucideIcon;
  roles?: Role[];
};

export type NavSubGroup = {
  label: string;
  icon?: LucideIcon;
  url?: string; // if present → direct link
  items?: NavItem[]; // if present → dropdown
  roles?: Role[];
};

export type NavGroup = {
  label: string;
  icon?: LucideIcon;
  roles: Role[]; // visibility of group
  items: NavItem[];
};

type SidebarNavItemProps = {
  items: NavItem[];
  activeRole: Role | "personal";
};

export function SidebarNavItem({ items, activeRole }: SidebarNavItemProps) {
  const pathname = usePathname();

  return (
    <SidebarMenu className="">
      {items.map((item) => {
        const href = resolveDashboardHref(item.url, activeRole, {
          roleScoped: item.url === "/dashboard",
        });

        const isActive = pathname === href || pathname.startsWith(`${href}/`);

        return (
          <SidebarMenuItem key={item.label}>
            <SidebarMenuButton
              asChild
              tooltip={item.label}
              data-active={isActive}
              className="
    flex items-center gap-2
    data-[collapsible=icon]:justify-center
    data-[active=true]:bg-accent
    data-[active=true]:text-accent-foreground
    data-[active=true]:font-medium
  "
            >
              <Link href={href} className="">
                <item.icon className="" />
                <span className="data-[collapsible=icon]:hidden">
                  {item.label}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

type SidebarNavGroupProps = {
  label: string;
  items: NavSubGroup[];
  activeRole: Role | "personal";
  defaultOpen?: boolean;
};

export function SidebarNavGroup({
  label,
  items,
  activeRole,
  defaultOpen = false,
}: SidebarNavGroupProps) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  if (items.length === 0) return null;

  return (
    <SidebarGroup
      className={cn(
        "relative px-0 py-2 mt-5",
        !isCollapsed && "border rounded-xl bg-muted/20",
        isCollapsed && "p-0 border rounded-xl"
      )}
    >
      {!isCollapsed && (
        <SidebarGroupLabel
          className="
        absolute -top-4 left-2
        bg-background
        px-2 py-0
        text-[10px] font-medium uppercase tracking-wider
        rounded-md border 
      "
        >
          {label}
        </SidebarGroupLabel>
      )}

      <SidebarMenu className={`mt-2 px-2 ${isCollapsed ? "mt-0" : "mx-2"}`}>
        {items.map((group) => {
          const isDirectLink = group.url && !group.items;

          // ─────────────────────────
          // COLLAPSED STATE
          // ─────────────────────────
          if (isCollapsed) {
            // 1️⃣ Direct link → centered icon
            if (isDirectLink) {
              const href = resolveDashboardHref(group.url!, activeRole);
              const isActive =
                pathname === href || pathname.startsWith(`${href}/`);

              return (
                <SidebarMenuItem key={group.label}>
                  <SidebarMenuButton
                    asChild
                    tooltip={group.label}
                    data-active={isActive}
                    className="justify-center"
                  >
                    <Link href={href}>
                      {group.icon && <group.icon className="h-5 w-5" />}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            }

            // 2️⃣ Group → dropdown
            if (group.items) {
              return (
                <SidebarMenuItem key={group.label}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton
                        tooltip={group.label}
                        className="relative justify-center"
                      >
                        {/* Icon */}
                        {group.icon && <group.icon className="h-5 w-5" />}

                        {/* Dropdown indicator */}
                        <ChevronRightIcon
                          className="
                absolute
                -right-1
                top-2
                h-3
                w-3
                text-muted-foreground
              "
                        />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent side="right" align="start">
                      {group.items.map((item) => {
                        const href = resolveDashboardHref(item.url, activeRole);
                        return (
                          <DropdownMenuItem key={item.url} asChild>
                            <Link
                              href={href}
                              className="flex items-center gap-2"
                            >
                              <item.icon className="h-4 w-4" />
                              <span>{item.label}</span>
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              );
            }
          }

          // ─────────────────────────
          // EXPANDED STATE (DEFAULT)
          // ─────────────────────────
          if (isDirectLink) {
            const href = resolveDashboardHref(group.url!, activeRole);
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);

            return (
              <SidebarMenuItem key={group.label}>
                <SidebarMenuButton
                  asChild
                  tooltip={group.label}
                  data-active={isActive}
                  className="
                    data-[active=true]:bg-accent
                    data-[active=true]:text-accent-foreground
                  "
                >
                  <Link href={href}>
                    {group.icon && <group.icon />}
                    <span>{group.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          // Expanded → accordion group
          if (group.items) {
            const isGroupActive = group.items.some((item) => {
              const href = resolveDashboardHref(item.url, activeRole);
              return pathname === href || pathname.startsWith(`${href}/`);
            });

            return (
              <Collapsible
                key={group.label}
                asChild
                defaultOpen={defaultOpen || isGroupActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {group.icon && <group.icon />}
                      <span>{group.label}</span>
                      <ChevronRightIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {group.items.map((item) => {
                        const href = resolveDashboardHref(item.url, activeRole);
                        const isActive =
                          pathname === href || pathname.startsWith(`${href}/`);

                        return (
                          <SidebarMenuSubItem key={item.url}>
                            <SidebarMenuSubButton
                              asChild
                              data-active={isActive}
                            >
                              <Link href={href}>
                                <item.icon />
                                <span>{item.label}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          }

          return null;
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
