"use client";

import * as React from "react";
import {
  Check,
  ChevronsUpDown,
  LayoutDashboardIcon,
  Plus,
  UserCircle,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { trpc } from "@/trpc/client";
import { Role, ROLE_CONFIG } from "@/db/schema/enums";
import { formatRoleName, getRoleLabel, toastMutation } from "@/lib/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IconCheck, IconLoader2 } from "@tabler/icons-react";
import { authClient } from "@/lib/auth-client";

export function RoleSwitcher() {
  const { state, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed";

  const utils = trpc.useUtils();
  const router = useRouter();

  const { data: session, isPending: authLoading } = authClient.useSession();

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

  const switchRole = async (role: Role | null) => {
    if (setActiveRole.isPending) return;

    await setActiveRole.mutateAsync({ role });

    // setIsOpen(false);
    router.push(role ? `/dashboard/${role}` : "/dashboard");
  };

  if (authLoading || userQuery.isLoading || !user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center gap-2 px-2 py-2 rounded-lg animate-pulse">
            <div className="w-8 h-8 rounded-lg bg-muted" />
            {!isCollapsed && (
              <div className="flex-1 space-y-1">
                <div className="h-3 w-24 bg-muted rounded" />
                <div className="h-3 w-16 bg-muted rounded" />
              </div>
            )}
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  const hasRoles = user.roles.length > 0;
  const activeRole = user.lastActiveRole;
  const isPersonal = activeRole === null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
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
              disabled={setActiveRole.isPending}
            >
              {/* Logo */}
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-transparent text-sidebar-primary-foreground">
                {setActiveRole.isPending ? (
                  <IconLoader2 className="size-4 animate-spin" />
                ) : (
                  <Image src="/Logo.png" width={50} height={50} alt="Logo" />
                )}
              </div>

              {/* Text (only when expanded) */}
              {!isCollapsed && (
                <>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Bachelor</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {activeRole
                        ? ROLE_CONFIG[activeRole as Role]?.label
                        : "Personal Dashboard"}
                    </span>
                  </div>

                  <ChevronsUpDown className="ml-auto size-4" />
                </>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Dashboard
            </DropdownMenuLabel>

            <DropdownMenuGroup>
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

                <span className="flex-1 font-medium">Personal</span>
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

              {hasRoles && (
                <>
                  <DropdownMenuSeparator className="mt-2" />
                  <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider">
                    Workspaces
                  </DropdownMenuLabel>

                  {user.roles.map((role, index) => {
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
                        className={`flex items-center gap-3 mb-1 py-2 rounded-lg cursor-pointer transition-all duration-200 mx-2 ${
                          isActive ? "bg-muted/70" : "hover:bg-muted/50"
                        }`}
                        disabled={setActiveRole.isPending}
                      >
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 ${isActive ? roleConfig.color : ""}`}
                        >
                          <RoleIcon className="size-4 shrink-0" />
                        </div>
                        <span className="flex-1 font-medium">
                          {roleConfig.label}
                        </span>
                        {setActiveRole.isPending && isActive ? (
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
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
