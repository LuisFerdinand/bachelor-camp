// components/navigation/NavigationSection.tsx
"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Suspense, useState } from "react";
import { GradientSeparator } from "@/components/ui/Separator/SidebarSeparator";
import DottedSeparator from "@/components/ui/Separator/DottedSeparator";
import { ErrorBoundary } from "react-error-boundary";

interface Route {
  label: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavigationSectionProps {
  title: string;
  sectionIcon: React.ComponentType<{ className?: string }>;
  routes: Route[];
  collapsed?: boolean;
}

export const NavigationSection = ({
  title,
  sectionIcon: SectionIcon,
  routes,
  collapsed = false,
}: NavigationSectionProps) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (collapsed) {
    return (
      <div className="border-gray-400 border bg-neutral-200 p-1 rounded-lg">
        <SidebarMenuItem
          className="flex flex-col items-center cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <SidebarMenuButton tooltip={title} asChild className="h-fit -mb-1">
            <button className="relative group flex flex-col items-center justify-center border border-gray-400">
              <SectionIcon className="size-5" />
            </button>
          </SidebarMenuButton>
          <div className="-mb-1">
            {open ? (
              <ChevronUp className="size-5 text-black" />
            ) : (
              <ChevronDown className="size-5 text-black" />
            )}
          </div>
        </SidebarMenuItem>

        {open &&
          routes.map((route) => {
            const fullHref = `/dashboard${route.url}`;
            const isActive = pathname.startsWith(fullHref);
            const Icon = route.icon;

            return (
              <SidebarMenuItem key={route.label}>
                <SidebarMenuButton
                  tooltip={route.label}
                  asChild
                  className={cn(
                    "relative flex items-center justify-center p-2 rounded-md border transition-all duration-200 ease-in-out scale-[0.95] border-gray-400",
                    isActive
                      ? "bg-white text-black shadow-md border-black hover:bg-white scale-1 mb-1"
                      : "bg-neutral-100 text-neutral-600 hover:text-primary hover:bg-neutral-200 border-neutral-300 hover:scale-[1]"
                  )}
                >
                  <Link
                    href={fullHref}
                    prefetch
                    className="relative flex items-center justify-center w-full h-full"
                  >
                    {isActive && (
                      <span className="absolute left-0 top-0 h-full w-1.5 bg-blue-500 rounded-r-sm" />
                    )}
                    <Icon className="size-5" />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
      </div>
    );
  }

  return (
    <>
      <aside className="w-full rounded-xl border-x-2 border-y border-gray-500 bg-neutral-200">
        <SidebarGroup>
          <SidebarGroupContent>
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue={title.toLowerCase().replace(/\s+/g, "-")}
            >
              <AccordionItem value={title.toLowerCase()}>
                <AccordionTrigger className="text-sm text-muted-foreground font-bold px-2 py-1 uppercase hover:no-underline">
                  {title}
                </AccordionTrigger>
                <AccordionContent>
                  <GradientSeparator className="mb-2" />

                  <SidebarMenu className="flex flex-col pl-2 mt-2">
                    {routes.map((route) => {
                      const fullHref = `/dashboard${route.url}`;
                      const isActive = pathname.startsWith(fullHref);
                      const Icon = route.icon;

                      return (
                        <SidebarMenuItem
                          key={route.label}
                          className={cn(
                            "hover:text-primary transition text-neutral-500 w-full hover:bg-neutral-100 py-1 border border-neutral-400 rounded-md",
                            isActive &&
                              "shadow-sm hover:opacity-100 text-primary bg-white hover:bg-white border-neutral-600 hover:shadow-black"
                          )}
                        >
                          <SidebarMenuButton asChild>
                            <Link href={fullHref} prefetch>
                              <div className="flex items-center gap-2.5 px-2 font-medium py-4 text-base">
                                <Icon className="size-5" />
                                {route.label}
                              </div>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SidebarGroupContent>
        </SidebarGroup>
      </aside>
    </>
  );
};
