"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DottedSeparator from "./ui/Separator/DottedSeparator";
import { cn } from "@/lib/utils";

interface ResponsiveModalProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;

  mode?: "single" | "double";
}

export const ResponsiveModal = ({
  children,
  open,
  onOpenChange,
  title,
  description,
  mode = "single",
}: ResponsiveModalProps) => {
  const isMobile = useIsMobile();

  const hasHeader = !!title || !!description;

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="w-full">
          {hasHeader && (
            <>
              <DrawerHeader className="flex px-7">
                {title && (
                  <DrawerTitle className="text-xl font-bold">
                    {title}
                  </DrawerTitle>
                )}
                {description && (
                  <DrawerDescription>{description}</DrawerDescription>
                )}
              </DrawerHeader>
              <DottedSeparator className="px-4" />
            </>
          )}
          <div
            className={`overflow-y-auto max-h-[calc(90vh-10rem)] scrollbar-custom ${
              hasHeader ? "px-4 pb-6 pt-4" : ""
            }`}
          >
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-full max-h-[90vh] overflow-y-auto scrollbar-custom bg-muted",
          mode === "double" ? "max-w-screen-xl" : ""
        )}
      >
        {hasHeader && (
          <div className="">
            <DialogHeader className="flex space-y-0">
              {title && (
                <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
              )}
              {description && (
                <DialogDescription className=" pt-0">
                  {description}
                </DialogDescription>
              )}
            </DialogHeader>
            <DottedSeparator className="mt-1" />
          </div>
        )}
        <div className={`${hasHeader ? "px-4 pb-6" : ""}`}>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
