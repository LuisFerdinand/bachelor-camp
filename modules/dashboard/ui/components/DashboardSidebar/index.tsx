// DashboardSidebar.tsx
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
  lastActiveRole: string |  null,
  roles: RoleType[];
};
interface DashboardSidebarProps {
  user: UserDashboardProps;
}

export const DashboardSidebar = ({ user }: DashboardSidebarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();
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
            <NavUser clerkId={user.clerkId}></NavUser>
          </SidebarFooter>
        </Sidebar>
      )}
    </>
  );
};
