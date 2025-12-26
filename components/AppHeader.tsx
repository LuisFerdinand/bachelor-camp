"use client";

import Image from "next/image";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Crown,
  ShieldCheck,
  Key,
  GraduationCap,
  Bed,
  PenTool,
  UserCircle,
  type LucideIcon,
} from "lucide-react";

type Role =
  | "super_admin"
  | "admin"
  | "room_master"
  | "teacher"
  | "accommodation_staff"
  | "author";

type AppHeaderProps = {
  activeRole?: Role | null;
};

const ROLE_CONFIG: Record<
  Role,
  { label: string; color: string; icon: LucideIcon }
> = {
  super_admin: {
    label: "Super Admin",
    color:
      "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
    icon: Crown,
  },
  admin: {
    label: "Admin",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    icon: ShieldCheck,
  },
  room_master: {
    label: "Room Master",
    color: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
    icon: Key,
  },
  teacher: {
    label: "Teacher",
    color:
      "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
    icon: GraduationCap,
  },
  accommodation_staff: {
    label: "Accommodation Staff",
    color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
    icon: Bed,
  },
  author: {
    label: "Author",
    color: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
    icon: PenTool,
  },
};

export function AppHeader({ activeRole }: AppHeaderProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const roleConfig = activeRole ? ROLE_CONFIG[activeRole] : null;
  const RoleIcon = roleConfig?.icon || UserCircle;
  const roleLabel = roleConfig?.label || "Personal Dashboard";

  // Collapsed view with tooltip
  if (isCollapsed) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="justify-center data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  aria-label="Application logo"
                >
                  <div className="flex items-center justify-center w-8 h-8 relative">
                    <Image
                      src="/Logo.png"
                      alt="App Logo"
                      width={32}
                      height={32}
                      className="object-contain"
                      priority
                    />
                  </div>
                </SidebarMenuButton>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-semibold">
                <p>Your App Name</p>
                <p className="text-xs text-muted-foreground font-normal">
                  {roleLabel}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  // Expanded view
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-transparent cursor-default"
          aria-label="Application header"
        >
          <div className="flex items-center gap-3 w-full">
            {/* Logo with name */}
            <div className="relative h-10 flex-1 transition-all duration-200">
              <Image
                src="/Logo1.png"
                alt="App Logo with Name"
                width={150}
                height={40}
                className="object-contain object-left"
                priority
              />
            </div>
          </div>
        </SidebarMenuButton>

        {/* Role Context Badge */}
        <div className="px-2 pb-2 pt-1">
          <div
            className={`
              flex items-center gap-2 px-2.5 py-1.5 rounded-lg
              transition-all duration-200
              ${roleConfig?.color || "bg-muted text-muted-foreground"}
            `}
          >
            <RoleIcon className="size-3.5 flex-shrink-0" />
            <span className="text-xs font-semibold truncate">{roleLabel}</span>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
