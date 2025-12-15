"use client";

import {
  IconCreditCard,
  IconDashboard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
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
import { HomeIcon, Tv2Icon } from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const handleSignout = async () => {
    await signOut();
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center gap-3 p-2">
        <div className="animate-pulse w-10 h-10 rounded-lg bg-gray-300" />
        <div className="flex flex-col gap-1">
          <div className="animate-pulse h-3 w-24 bg-gray-300 rounded" />
          <div className="animate-pulse h-3 w-32 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  const email = user?.primaryEmailAddress?.emailAddress;
  const fullName = user?.fullName;
  const displayName =
    fullName && fullName.length > 0 ? fullName : email?.split("@")[0];

  const initial =
    fullName && fullName.length > 0
      ? fullName.charAt(0).toUpperCase()
      : email?.charAt(0).toUpperCase();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.imageUrl} alt={displayName} />
                <AvatarFallback className="rounded-lg">
                  {initial}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{displayName}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <div className="h-full text-wrap w-20">
              {JSON.stringify({ user })}
            </div>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.imageUrl} alt={displayName} />
                  <AvatarFallback className="rounded-lg">
                    {initial}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{displayName}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={"/"}>
                  <HomeIcon />
                  Home
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href={"/dashboard"}>
                  <IconDashboard />
                  Dashboard
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href={"/dashboard/courses"}>
                  <Tv2Icon />
                  Courses
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleSignout}>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
