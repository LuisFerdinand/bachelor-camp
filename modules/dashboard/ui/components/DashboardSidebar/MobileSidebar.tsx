"use client";
import React, { useEffect, useState } from "react";

import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

// import ResponsiveSidebarContent from "./ResponsiveSidebarContent";

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant={"secondary"} className="lg:hidden">
          <MenuIcon className="size-4 text-neutral-500"></MenuIcon>
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0">
        {/* <ResponsiveSidebarContent></ResponsiveSidebarContent> */}
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
