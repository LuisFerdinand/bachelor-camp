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
import {
  HomeIcon,
  Tv2Icon,
  Building2Icon,
  LayoutDashboardIcon,
  UserCircle,
} from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { Role, ROLE_CONFIG } from "@/db/schema/enums";
import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import {
  formatRoleName,
  getRoleBadgeClass,
  getRoleLabel,
  toastMutation,
} from "@/lib/utils";
import Image from "next/image";

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
  roles: RoleType[];
  lastActiveRole: Role | null;
};

interface NavUserProps {
  user: UserDashboardProps;
}

const DROPDOWN_WIDTH = "w-72";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data: session, isPending: authLoading } = authClient.useSession();
  const router = useRouter();
  const utils = trpc.useUtils();
  const [isOpen, setIsOpen] = useState(false);

  const userQuery = trpc.users.getUserWithRoles.useQuery(undefined, {
    enabled: !authLoading && !!session,
  });
  const user = userQuery.data;

  const setActiveRole = trpc.users.setActiveRole.useMutation({
    onMutate: async ({ role }) => {
      const roleLabel = getRoleLabel(role);

      const toastId = toast.loading(`Switching to ${roleLabel} dashboard…`);

      await utils.users.getUserWithRoles.cancel();

      const prev = utils.users.getUserWithRoles.getData();

      utils.users.getUserWithRoles.setData(undefined, (old) =>
        old ? { ...old, lastActiveRole: role } : old
      );

      return { prev, toastId, roleLabel };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) {
        utils.users.getUserWithRoles.setData(undefined, ctx.prev);
      }

      toast.error(`Failed to switch to ${ctx?.roleLabel ?? "dashboard"}`, {
        id: ctx?.toastId,
      });
    },

    onSuccess: (_data, _vars, ctx) => {
      toast.success(`Now using ${ctx?.roleLabel} dashboard`, {
        id: ctx?.toastId,
      });
    },

    onSettled: () => {
      utils.users.getUserWithRoles.invalidate();
    },
  });

  if (userQuery.isLoading || authLoading || !user) {
    return <NavUserSkeleton />;
  }

  const handleSignout = async () => {
    await authClient.signOut();
  };

  const switchRole = async (role: Role | null) => {
    if (setActiveRole.isPending) return;

    await setActiveRole.mutateAsync({ role });

    setIsOpen(false);
    router.push(role ? `/dashboard/${role}` : "/dashboard");
  };

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
  const displayName = fullName || user.email?.split("@")[0] || "User";
  const email = user.email;
  const initial = displayName.charAt(0).toUpperCase();
  const avatarSrc =
    user.image ??
    `https://api.dicebear.com/7.x/initials/svg?seed=${displayName}`;

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
              className="
               border rounded-lg
               cursor-pointer
               transition-colors
               hover:bg-muted/50
               active:bg-muted/80
               focus-visible:ring-2
               focus-visible:ring-primary/30
               data-[state=open]:bg-muted/70
             "
            >
              <Avatar className="h-8 w-8 rounded-full border-2 border-background shadow-sm">
                {/* <AvatarImage src={avatarSrc} alt={displayName} /> */}
                <Image
                  src={avatarSrc}
                  alt={displayName}
                  width={48}
                  height={48}
                />

                <AvatarFallback className="rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-semibold">
                  {initial}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate font-semibold text-sm">
                  {displayName}
                </span>
                <span className="text-muted-foreground/80 truncate text-xs font-medium">
                  {email}
                </span>
              </div>
              <IconChevronRight className="ml-auto size-4 text-muted-foreground/50 transition-transform duration-200 group-data-[state=open]:rotate-90" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className={`${DROPDOWN_WIDTH} rounded-xl`}
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={8}
          >
            {/* User Header */}
            <div className="flex items-center gap-2 px-1 py-1.5 ">
              <Avatar className="h-12 w-12 rounded-full border-2 border-background shadow-sm">
                <Image
                  src={avatarSrc}
                  alt={displayName}
                  width={48}
                  height={48}
                />
                {/* <AvatarFallback className="rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-semibold text-lg">
                  {initial}
                </AvatarFallback> */}
              </Avatar>
              <div className="grid flex-1 text-left leading-tight min-w-0">
                <span className=" font-semibold text-sm">{displayName}</span>
                <span className=" font-light text-xs">{email}</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <div
                    className={`
    inline-flex items-center rounded-md
    px-1.5 py-0.5
    text-[10px] font-semibold leading-none
    ${getRoleBadgeClass(activeRole)}
  `}
                  >
                    {activeRole ? ROLE_CONFIG[activeRole]?.label : "Personal"}
                  </div>
                </div>
              </div>
            </div>

            <DropdownMenuSeparator className="my-1" />

            {/* Context Switcher Section */}
            <div className="mb-1">
              <div className="px-2">
                <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
                  Dashboard
                </span>
              </div>
              <DropdownMenuGroup className="space-y-0.5">
                {/* Personal Dashboard */}
                <DropdownMenuItem
                  onClick={() => switchRole(null)}
                  disabled={setActiveRole.isPending}
                  className={`flex items-center gap-3 rounded-lg cursor-pointer transition-all duration-200 mx-2 ${
                    isPersonal ? "bg-muted/70" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
                    <UserCircle className="size-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Personal</div>
                    <div className="text-xs text-muted-foreground">
                      Your personal dashboard
                    </div>
                  </div>
                  {setActiveRole.isPending && !activeRole ? (
                    <IconLoader2 className="size-4 animate-spin text-muted-foreground" />
                  ) : (
                    isPersonal && (
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
                        <IconCheck className="size-3 text-primary" />
                      </div>
                    )
                  )}
                </DropdownMenuItem>

                {/* Workspaces - Only show if user has roles */}
                {hasRoles && (
                  <>
                    <DropdownMenuSeparator className="mt-2" />
                    <div className="mb-1 px-2">
                      <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
                        Workspaces
                      </span>
                    </div>

                    {user.roles.map((role) => {
                      const isActive = role.name === activeRole;
                      const roleConfig = ROLE_CONFIG[role.name] ?? {
                        label: formatRoleName(role.name),
                        color: "bg-muted text-muted-foreground",
                        icon: LayoutDashboardIcon,
                      };

                      const RoleIcon = roleConfig.icon;

                      return (
                        <DropdownMenuItem
                          key={role.id}
                          onClick={() => switchRole(role.name)}
                          disabled={setActiveRole.isPending}
                          className={`flex items-center gap-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 mx-2 ${
                            isActive ? "bg-muted/70" : "hover:bg-muted/50"
                          }`}
                        >
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-lg ${roleConfig.color}`}
                          >
                            <RoleIcon className="size-4 shrink-0" />
                          </div>
                          <span className="font-medium flex-1">
                            {roleConfig.label}
                          </span>
                          {setActiveRole.isPending &&
                          role.name === activeRole ? (
                            <IconLoader2 className="size-4 animate-spin text-muted-foreground" />
                          ) : (
                            isActive && (
                              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
                                <IconCheck className="size-3 text-primary" />
                              </div>
                            )
                          )}
                        </DropdownMenuItem>
                      );
                    })}
                  </>
                )}
              </DropdownMenuGroup>
            </div>

            <DropdownMenuSeparator className="my-1" />

            {/* Navigation Links */}
            <div className="px-2 mb-1">
              <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
                Quick Links
              </span>
            </div>
            <DropdownMenuGroup className="space-y-0.5">
              <DropdownMenuItem
                asChild
                className="rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <Link
                  href="/"
                  className="flex items-center gap-3 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/60">
                    <HomeIcon className="size-4" />
                  </div>
                  <span className="font-medium">Home</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className="rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <Link
                  href="/dashboard/courses"
                  className="flex items-center gap-3 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/60">
                    <Tv2Icon className="size-4" />
                  </div>
                  <span className="font-medium">My Courses</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className="rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <Link
                  href="/dashboard/accommodations"
                  className="flex items-center gap-3 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/60">
                    <Building2Icon className="size-4" />
                  </div>
                  <span className="font-medium">My Accommodations</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="my-2" />

            {/* Logout */}
            <DropdownMenuItem
              onClick={handleSignout}
              className="rounded-lg cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 hover:bg-destructive/10 transition-colors py-2.5"
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
