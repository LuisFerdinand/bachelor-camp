import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

import Link from "next/link";

import {
  Landmark,
  Flag,
  Award,
  Quote,
  HelpCircle,
  MapPin,
  Share2,
  Image as ImageIcon,
  ChevronUp,
  ChevronDown,
  Home,
  House,
} from "lucide-react";

import {
  GradientSeparator,
  SidebarSeparator,
} from "@/components/ui/Separator/SidebarSeparator";
import { usePathname } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { Suspense, useState } from "react";
import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import DottedSeparator from "@/components/ui/Separator/DottedSeparator";

interface HomeManagementProps {
  collapsed?: boolean;
}

export const HomeManagement = (props: HomeManagementProps) => {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <HomeManagementSuspense {...props}></HomeManagementSuspense>
      </ErrorBoundary>
    </Suspense>
  );
};

const HomeManagementSuspense = ({ collapsed = false }: HomeManagementProps) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const homeRoutes = [
    { label: "Banners", url: "/home/banners", icon: ImageIcon },
    { label: "3 Pillars", url: "/home/pillars", icon: Landmark },
    { label: "Accreditations", url: "/home/accreditations", icon: Award },
    { label: "Milestones", url: "/home/milestones", icon: Flag },
    { label: "Testimonials", url: "/home/testimonials", icon: Quote },
    { label: "FAQs", url: "/home/faqs", icon: HelpCircle },
    { label: "Locations", url: "/home/locations", icon: MapPin },
    { label: "Social Media", url: "/home/social-media", icon: Share2 },
  ];

  if (collapsed) {
    return (
      <div className="border-gray-400 border bg-neutral-200 p-1 rounded-lg">
        <SidebarMenuItem
          className=" flex flex-col items-center cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <SidebarMenuButton
            tooltip={"Home Management"}
            asChild
            className="h-fit -mb-1"
          >
            <button className="relative group flex flex-col items-center justify-center border border-gray-400">
              <House></House>
              {/* <Image
                src={"/Logo.png"}
                alt="Logo"
                fill
                className="transition hover:opacity-80"
              /> */}
            </button>
          </SidebarMenuButton>
          <div className="mb-0">
            {open ? (
              <ChevronUp className="size-5 text-black" />
            ) : (
              <ChevronDown className="size-5 text-black" />
            )}
          </div>
        </SidebarMenuItem>
        {open &&
          homeRoutes.map((route) => {
            const fullHref = `/dashboard/${route.url}`;

            const isActive =
              route.url === ""
                ? pathname === `/dashboard/home`
                : pathname.startsWith(`/dashboard${route.url}`);

            const Icon = route.icon;

            return (
              <SidebarMenuItem key={route.label} className="">
                <div className="">
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
                </div>
              </SidebarMenuItem>
            );
          })}
      </div>
    );
  }

  return (
    <>
      <NavigationWrapper>
        <SidebarGroup>
          <SidebarGroupContent>
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="home-management"
            >
              <AccordionItem value="home-management">
                <AccordionTrigger className="text-sm text-muted-foreground font-bold px-2 py-1 uppercase hover:no-underline">
                  Home Management
                </AccordionTrigger>
                <AccordionContent>
                  <GradientSeparator className="mb-2" />

                  <SidebarMenu className="flex flex-col pl-2 mt-2">
                    {homeRoutes.map((route) => {
                      const fullHref = `/dashboard${route.url}`;

                      const isActive =
                        route.url === ""
                          ? pathname === `/dashboard/home`
                          : pathname.startsWith(fullHref);

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
                          <SidebarMenuButton
                            tooltip={route.label}
                            asChild
                            className={cn(isActive && "hover:bg-white")}
                          >
                            <Link href={fullHref} prefetch>
                              <div
                                className={
                                  "flex items-center gap-2.5 px-2  font-medium py-4 text-base"
                                }
                              >
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
      </NavigationWrapper>

      <DottedSeparator className="my-2" />
    </>
  );
};

const NavigationWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <aside
      className={
        "w-full rounded-xl border-x-2 border-y border-gray-500 bg-neutral-200"
      }
    >
      {children}
    </aside>
  );
};
