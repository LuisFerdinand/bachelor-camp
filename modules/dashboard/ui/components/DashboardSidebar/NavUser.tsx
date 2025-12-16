"use client";

import {
  IconDashboard,
  IconLogout,
  IconUserCircle,
  IconChevronRight,
  IconCheck,
  IconLoader2,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Home, Tv2, Building2 } from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { Role } from "@/db/schema/enums";
import { useState } from "react";

type RoleType = {
  id: string;
  name: Role;
};

type UserDashboardProps = {
  id: string;
  clerkId: string;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  email: string | null;
  phone: string | null;
  roles: RoleType[];
  lastActiveRole: Role | null;
};

interface NavUserProps {
  user: UserDashboardProps;
}

const ROLE_CONFIG: Record<Role, { label: string; color: string }> = {
  super_admin: {
    label: "Super Admin",
    color: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  },
  admin: {
    label: "Admin",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },
  room_master: {
    label: "Room Master",
    color: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  },
  teacher: {
    label: "Teacher",
    color: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  },
  accommodation_staff: {
    label: "Accommodation Staff",
    color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
  },
  author: {
    label: "Author",
    color: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
  },
};

export function NavUser({clerkId}: {clerkId: string}) {
  const { isMobile } = useSidebar();
  const { isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const utils = trpc.useUtils();
  const [isOpen, setIsOpen] = useState(false);

  const userQuery = trpc.users.getUserWithRoles.useQuery({clerkId});

  const setActiveRole = trpc.users.setActiveRole.useMutation({
    onSuccess: async () => {
      await utils.users.getUserWithRoles.invalidate();
    },
  });
if (userQuery.isLoading) {
    return <NavUserSkeleton />;
  }

  const user = userQuery.data;
  if (!user) return null;


  const handleSignout = async () => {
    await signOut();
  };

  const switchRole = async (role: Role | null) => {
    if (setActiveRole.isPending) return;

    await setActiveRole.mutateAsync({ role });
    setIsOpen(false);

    router.push(role ? `/dashboard/${role}` : "/dashboard");
  };

  // Loading state
  if (!isLoaded) {
    return (
      <div className="flex items-center gap-3 p-2">
        <div className="animate-pulse w-10 h-10 rounded-full bg-muted" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="animate-pulse h-3 w-24 bg-muted rounded" />
          <div className="animate-pulse h-2 w-32 bg-muted/60 rounded" />
        </div>
      </div>
    );
  }

 const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
  const displayName =
    fullName || user.email?.split("@")[0] || "User";

  const initial = displayName.charAt(0).toUpperCase();
  const avatarSrc =
    user.avatarUrl ??
    `https://api.dicebear.com/7.x/initials/svg?seed=${displayName}`;

  const roles = user.roles;
  const hasRoles = user.roles.length > 0;
  const activeRole = user.lastActiveRole;
  const isPersonal = activeRole === null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/50 transition-colors"
              aria-label="User menu"
            >
              <Avatar className="h-9 w-9 rounded-full border-2 border-background shadow-sm">
                <AvatarImage src={avatarSrc} alt={displayName} />
                <AvatarFallback className="rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-semibold">
                  {initial}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate font-semibold text-sm">
                  {displayName}
                </span>
                <span className="text-muted-foreground/80 truncate text-xs font-medium">{activeRole
                    ? ROLE_CONFIG[activeRole]?.label
                    : "Personal Dashboard"}
                </span>
              </div>
              <IconChevronRight className="ml-auto size-4 text-muted-foreground/50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-72 rounded-xl p-2"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={8}
          >
            {/* User Header */}
            <div className="flex items-center gap-3 px-2 py-3 mb-1">
              <Avatar className="h-12 w-12 rounded-full border-2 border-background shadow-sm">
                <AvatarImage src={avatarSrc} alt={displayName} />
                <AvatarFallback className="rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-semibold text-lg">
                  {initial}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left leading-tight min-w-0">
                <span className="truncate font-semibold text-sm">
                  {displayName}
                </span>
               <div className="text-xs text-muted-foreground">
                  {activeRole
                    ? ROLE_CONFIG[activeRole]?.label
                    : "Personal Dashboard"}
                </div>
              </div>
            </div>

            <DropdownMenuSeparator className="my-2" />

            {/* Context Switcher Section */}
            <div className="mb-2">
              <div className="px-2 py-1.5 mb-1">
                <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
                  Dashboard
                </span>
              </div>

              <DropdownMenuGroup>
                {/* Personal Dashboard */}
                <DropdownMenuItem
                  onClick={() => switchRole(null)}
                  disabled={setActiveRole.isPending}
                  className={`flex items-center gap-3 py-2.5 rounded-lg cursor-pointer ${
                    isPersonal ? "bg-muted/70" : ""
                  }`}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
                    <IconUserCircle className="size-4 text-primary" />
                  </div>
                  <span className="font-medium flex-1">Personal</span>
                  {setActiveRole.isPending && !activeRole ? (
                    <IconLoader2 className="size-4 animate-spin text-muted-foreground" />
                  ) : (
                    isPersonal && (
                      <IconCheck className="size-4 text-primary" />
                    )
                  )}
                </DropdownMenuItem>

                {/* Workspaces - Only show if user has roles */}
                {hasRoles && (
                  <>
                    <div className="px-2 py-2 mt-3 mb-1">
                      <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
                        Workspaces
                      </span>
                    </div>

                    {user.roles.map((role) => {
                      const isActive = role.name === activeRole;
                      const roleConfig =
  ROLE_CONFIG[role.name] ?? {
    label: role.name.replace("_", " "),
    color: "bg-muted text-muted-foreground",
  };



                      return (
                        <DropdownMenuItem
                          key={role.id}
                          onClick={() => switchRole(role.name)}
                          disabled={setActiveRole.isPending}
                          className={`flex items-center gap-3 py-2.5 rounded-lg cursor-pointer ${
                            isActive ? "bg-muted/70" : ""
                          }`}
                        >
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-lg ${roleConfig.color}`}
                          >
                            <IconDashboard className="size-4" />
                          </div>
                          <span className="font-medium flex-1">
                            {roleConfig.label}
                          </span>
                          {setActiveRole.isPending && isActive ? (
                            <IconLoader2 className="size-4 animate-spin text-muted-foreground" />
                          ) : (
                            isActive && (
                              <IconCheck className="size-4 text-primary" />
                            )
                          )}
                        </DropdownMenuItem>
                      );
                    })}
                  </>
                )}
              </DropdownMenuGroup>
            </div>

            <DropdownMenuSeparator className="my-2" />

            {/* Navigation Links */}
            <div className="px-2 py-1.5 mb-1">
              <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
                Navigation
              </span>
            </div>

            <DropdownMenuGroup>
              <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                <Link
                  href="/"
                  className="flex items-center gap-3 py-2.5"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted">
                    <Home className="size-4" />
                  </div>
                  <span className="font-medium">Home</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                <Link
                  href="/dashboard/courses"
                  className="flex items-center gap-3 py-2.5"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted">
                    <Tv2 className="size-4" />
                  </div>
                  <span className="font-medium">My Courses</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                <Link
                  href="/dashboard/accommodations"
                  className="flex items-center gap-3 py-2.5"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted">
                    <Building2 className="size-4" />
                  </div>
                  <span className="font-medium">My Accommodations</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="my-2" />

            {/* Logout */}
            <DropdownMenuItem
              onClick={handleSignout}
              className="rounded-lg cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 py-2.5"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-destructive/10">
                <IconLogout className="size-4" />
              </div>
              <span className="font-medium">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function NavUserSkeleton() {
  return (
    <div className="flex items-center gap-3 p-2">
      <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
      <div className="flex-1 space-y-1">
        <div className="h-3 w-24 bg-muted animate-pulse rounded" />
        <div className="h-2 w-32 bg-muted/60 animate-pulse rounded" />
      </div>
    </div>
  );
}