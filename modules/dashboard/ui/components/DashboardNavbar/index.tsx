"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileSidebar from "../DashboardSidebar/MobileSidebar";
import Link from "next/link";
import Image from "next/image";
import AuthButton from "@/modules/auth/ui/components/AuthButton";

export const DashboardNavbar = () => {
  const isMobile = useIsMobile();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50 border-b shadow-md">
      <div className="flex items-center gap-4 w-full">
        {/* Menu & Logo */}
        <div className="flex items-center flex-shrink-0">
          {!isMobile ? <SidebarTrigger /> : <MobileSidebar></MobileSidebar>}
          <Link prefetch href="/dashboard">
            <div className="hidden md:block items-center gap-1 p-4">
              <Image
                src="/header/Logo1.png"
                alt="Logo"
                height={30}
                width={150}
              />
            </div>
            <div className="block md:hidden items-center pl-2">
              <Image
                src="/header/Logo1.png"
                alt="Logo"
                height={150}
                width={150}
              />
            </div>
          </Link>
        </div>

        <div className="flex-1" />

        {/* Profile & Auth */}
        <div className="flex-shrink-0 items-center flex gap-4">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};
