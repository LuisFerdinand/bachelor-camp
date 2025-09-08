// DashboardSidebar.tsx
"use client";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import Link from "next/link";
import ResponsiveSidebarContent from "./ResponsiveSidebarContent";

// import ResponsiveSidebarContent from "./ResponsiveSidebarContent";

export const DashboardSidebar = () => {
  const isMobile = useIsMobile();
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
        </Sidebar>
      )}
    </>
  );
};
