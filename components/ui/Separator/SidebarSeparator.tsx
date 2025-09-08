// components/ui/sidebar-separator.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SidebarSeparatorProps {
  className?: string;
}

export const SidebarSeparator = ({ className }: SidebarSeparatorProps) => {
  return (
    <div
      className={cn(
        "my-3 w-full border-t border-muted-foreground/20",
        className
      )}
    />
  );
};

export const GradientSeparator = ({ className }: SidebarSeparatorProps) => {
  return (
    <>
      <div
        className={cn(
          "w-full h-[2px] bg-gradient-to-r from-transparent via-black/30 to-transparent",
          className
        )}
      />
    </>
  );
};
