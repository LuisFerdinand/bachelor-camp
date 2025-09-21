"use client";
import Image from "next/image";
import Link from "next/link";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import DottedSeparator from "@/components/ui/Separator/DottedSeparator";
// import { CompanyNavigation, StoreNavigation } from "./Navigation";
import {
  Award,
  BarChart3,
  BedDouble,
  BookOpen,
  Boxes,
  Building2,
  CalendarDays,
  CircuitBoard,
  DatabaseBackup,
  Edit,
  FileClock,
  FileText,
  Flag,
  FlaskConical,
  FolderTree,
  GraduationCap,
  HeartHandshake,
  HelpCircle,
  House,
  ImageIcon,
  InboxIcon,
  Landmark,
  LayoutDashboard,
  LayoutDashboardIcon,
  LogOutIcon,
  Mail,
  MapPin,
  MessageSquare,
  Quote,
  Scale,
  SearchCheck,
  Settings,
  Share2,
  Sparkles,
  Tags,
  Tent,
  UserCog,
  Users,
} from "lucide-react";
import clsx from "clsx";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { trpc } from "@/trpc/client";
import { NavigationSection } from "./Navigation";
import { GradientSeparator } from "@/components/ui/Separator/SidebarSeparator";

const contentRoutes = [
  { label: "Accreditations", url: "/content/accreditations", icon: Award },
  { label: "Banners", url: "/content/banners", icon: ImageIcon },
  { label: "FAQs", url: "/content/faqs", icon: HelpCircle },
  {
    label: "Featured Facilities",
    url: "/content/featured-facilities",
    icon: Building2,
  },
  { label: "Highlights", url: "/content/highlights", icon: Sparkles },
  { label: "Locations", url: "/content/locations", icon: MapPin },
  { label: "Milestones", url: "/content/milestones", icon: Flag },
  { label: "Pillars", url: "/content/pillars", icon: Landmark },
  { label: "Principles", url: "/content/principles", icon: Scale },
  { label: "Social Medias", url: "/content/social-media", icon: Share2 },
  { label: "Statistics", url: "/content/statistics", icon: BarChart3 },
  { label: "Testimonials", url: "/content/testimonials", icon: Quote },
  { label: "Team Members", url: "/content/team-members", icon: Users },
];

const servicesRoutes = [
  { label: "Camps", url: "/services/camps", icon: Tent },
  { label: "Courses", url: "/services/courses", icon: BookOpen },
  { label: "Tests", url: "/services/tests", icon: FlaskConical },
  { label: "Bundles", url: "/services/bundles", icon: Boxes },
  { label: "Rooms", url: "/services/rooms", icon: BedDouble },
  { label: "Facilities", url: "/services/facilities", icon: Building2 },
  { label: "Schedules", url: "/services/schedules", icon: CalendarDays },
];

export const articlesRoutes = [
  { label: "Posts", url: "/articles/posts", icon: FileText },
  { label: "Categories", url: "/articles/categories", icon: FolderTree },
  { label: "Tags", url: "/articles/tags", icon: Tags },
  { label: "SEO", url: "/articles/seo", icon: SearchCheck },
];

export const engagementRoutes = [
  { label: "Leads", url: "/engagement/leads", icon: Mail },
];

export const usersRoutes = [
  { label: "Admins", url: "/users/admins", icon: UserCog },
  { label: "Students", url: "/users/students", icon: GraduationCap },
];

export const systemRoutes = [
  { label: "Settings", url: "/system/settings", icon: Settings },
  { label: "Logs", url: "/system/logs", icon: FileClock },
  { label: "Backups", url: "/system/backups", icon: DatabaseBackup },
];

const ResponsiveSidebarContent = () => {
  const isMobile = useIsMobile();
  const { state } = useSidebar();
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  const inboxCount = 0;

  if (state === "collapsed") {
    return (
      <SidebarGroup>
        <SidebarMenu className="items-center">
          {/* My Dashboard */}
          {(() => {
            const isActive = pathname === "/dashboard";
            return (
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="My Dashboard"
                  asChild
                  className={cn(
                    "relative flex items-center justify-center p-2 rounded-md border transition-all duration-200 ease-in-out scale-[0.95]",
                    isActive
                      ? "bg-white text-black shadow-md border-black hover:bg-white scale-1 mb-1"
                      : "bg-neutral-100 text-neutral-600 hover:text-primary hover:bg-neutral-200 border-neutral-300 hover:scale-[1]"
                  )}
                >
                  <Link
                    href="/dashboard"
                    className="relative flex items-center justify-center w-full h-full"
                    prefetch
                  >
                    {isActive && (
                      <span className="absolute left-0 top-0 h-full w-1.5 bg-blue-500" />
                    )}
                    <LayoutDashboard className="size-5" />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })()}
          {/* Inbox */}
          {(() => {
            const isActive = pathname.startsWith("/dashboard/inbox");
            return (
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Inbox"
                  asChild
                  className={cn(
                    "relative flex items-center justify-center p-2 rounded-md border transition-all duration-200 ease-in-out scale-[0.95]",
                    isActive
                      ? "bg-white text-black shadow-md border-black hover:bg-white scale-100 mb-1"
                      : "bg-neutral-100 text-neutral-600 hover:text-primary hover:bg-neutral-200 border-neutral-300 hover:scale-100"
                  )}
                >
                  <Link
                    href="/dashboard/inbox"
                    className="relative flex items-center justify-center w-full h-full"
                    prefetch
                  >
                    {isActive && (
                      <span className="absolute left-0 top-0 h-full w-1.5 bg-blue-500 rounded-r-sm" />
                    )}
                    <Mail className="size-5" />
                    {inboxCount > 0 && (
                      <span className="absolute top-2 right-1 h-1.5 w-1.5 rounded-full bg-red-500" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })()}
          <DottedSeparator></DottedSeparator>
          {/* Logo Placeholder */}
          <NavigationSection
            title="Content Management"
            sectionIcon={House}
            routes={contentRoutes}
            collapsed={state === "collapsed"}
          />
          <GradientSeparator className="my-0.25 text-black"></GradientSeparator>
          <NavigationSection
            title="Services"
            sectionIcon={Tent}
            routes={servicesRoutes}
            collapsed={state === "collapsed"}
          />
          <GradientSeparator className="my-0.25 text-black"></GradientSeparator>

          {(() => {
            const isActive = pathname === "/dashboard/users";
            return (
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Users Management"
                  asChild
                  className={cn(
                    "relative flex items-center justify-center p-2 rounded-md border transition-all duration-200 ease-in-out scale-[0.95]",
                    isActive
                      ? "bg-white text-black shadow-md border-black hover:bg-white scale-1 mb-1"
                      : "bg-neutral-100 text-neutral-600 hover:text-primary hover:bg-neutral-200 border-neutral-300 hover:scale-[1]"
                  )}
                >
                  <Link
                    href="/dashboard/users"
                    className="relative flex items-center justify-center w-full h-full"
                    prefetch
                  >
                    {isActive && (
                      <span className="absolute left-0 top-0 h-full w-1.5 bg-blue-500" />
                    )}
                    <LayoutDashboard className="size-5" />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })()}
          <GradientSeparator className="my-0.25 text-black"></GradientSeparator>
          <NavigationSection
            title="Engagement Management"
            sectionIcon={HeartHandshake}
            routes={engagementRoutes}
            collapsed={state === "collapsed"}
          />
          <GradientSeparator className="my-0.25 text-black"></GradientSeparator>
          <NavigationSection
            title="System Management"
            sectionIcon={CircuitBoard}
            routes={systemRoutes}
            collapsed={state === "collapsed"}
          />

          <DottedSeparator></DottedSeparator>

          {/* Exit Button */}
          {(() => {
            const isActive = pathname === "/";
            return (
              <SidebarMenuItem className="">
                <SidebarMenuButton
                  tooltip="Exit"
                  asChild
                  className={cn(
                    "relative flex items-center justify-center p-2 rounded-md border transition-all duration-200 ease-in-out scale-[0.95]",
                    isActive
                      ? "bg-white text-black shadow-md border-black hover:bg-white scale-1 mb-1"
                      : "bg-neutral-100 text-neutral-600 hover:text-primary hover:bg-neutral-200 border-neutral-300 hover:scale-[1]"
                  )}
                >
                  <Link
                    href="/"
                    prefetch
                    className="relative flex items-center justify-center w-full h-full"
                  >
                    {isActive && (
                      <span className="absolute left-0 top-0 h-full w-1.5 bg-blue-500 rounded-r-sm" />
                    )}
                    <LogOutIcon className="size-5" />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })()}
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup className={cn(isMobile && "-z-10")}>
      <SidebarMenu>
        {isMobile && (
          <>
            <Link prefetch href="/dashboard" className="block md:hidden w-3/4">
              <Image
                src="/Logo.png"
                alt="Logo"
                height={30}
                width={150}
                className="mt-1"
              />
            </Link>
            <DottedSeparator className="my-2" />
          </>
        )}

        {(() => {
          const isActive = pathname === "/dashboard";
          return (
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="My Dashboard"
                asChild
                className={cn(
                  "relative px-2 py-4 hover:text-primary hover:bg-neutral-200 bg-neutral-100 border border-neutral-400 flex items-center gap-x-3 transition-all duration-200 ease-in-out transform hover:scale-[1.02]",
                  isActive &&
                    "text-black bg-white shadow-sm shadow-black border-black hover:bg-white scale-[1.02] mb-1"
                )}
              >
                <Link
                  prefetch
                  href="/dashboard"
                  className="flex items-center gap-x-3 w-full"
                >
                  {isActive && (
                    <span className="absolute right-0 top-0 h-full w-4 bg-blue-600 " />
                  )}
                  <LayoutDashboardIcon className="size-5" />
                  <span className="text-md">My Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })()}

        {(() => {
          const isActive = pathname.startsWith("/dashboard/inbox");
          return (
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Inbox"
                asChild
                className={cn(
                  "relative px-2 py-4 hover:text-primary hover:bg-neutral-200 bg-neutral-100 border border-neutral-400 flex items-center gap-x-3 transition-all duration-200 ease-in-out transform hover:scale-[1.02]",
                  isActive &&
                    "text-black bg-white shadow-sm shadow-black border-black hover:bg-white scale-[1.02] mb-1"
                )}
              >
                <Link
                  prefetch
                  href="/dashboard/inbox"
                  className="flex items-center gap-x-3 w-full"
                >
                  {isActive && (
                    <span className="absolute right-0 top-0 h-full w-4 bg-blue-600 " />
                  )}
                  <InboxIcon className="size-5" />
                  <span className="text-md">Inbox</span>
                  {inboxCount > 0 && (
                    <span className="text-xs bg-red-500 text-white font-medium rounded px-1.5 py-0.5">
                      {inboxCount}
                    </span>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })()}

        <DottedSeparator className="mb-1" />

        {/* <CompanyNavigation /> */}
        <NavigationSection
          title="Content Management"
          sectionIcon={House}
          routes={contentRoutes}
        />
        <NavigationSection
          title="Services Management"
          sectionIcon={Tent}
          routes={servicesRoutes}
        />
        {(() => {
          const isActive = pathname === "/dashboard/users";
          return (
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Users Management"
                asChild
                className={cn(
                  "relative px-2 py-3 hover:text-primary hover:bg-neutral-200 bg-neutral-100 border border-neutral-400 flex items-center gap-x-3 transition-all duration-200 ease-in-out transform hover:scale-[1.02]",
                  isActive &&
                    "text-black bg-white shadow-sm shadow-black border-black hover:bg-white scale-[1.02] mb-1"
                )}
              >
                <Link
                  prefetch
                  href="/dashboard/users"
                  className="flex items-center gap-x-3 w-full py-4"
                >
                  {isActive && (
                    <span className="absolute right-0 top-0 h-full w-4 bg-blue-600" />
                  )}
                  <LayoutDashboardIcon className="size-5" />
                  <span className="text-md font-bold leading-none ">
                    Users Management
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })()}

        <NavigationSection
          title="Engagement Management"
          sectionIcon={HeartHandshake}
          routes={engagementRoutes}
        />

        <NavigationSection
          title="System Management"
          sectionIcon={CircuitBoard}
          routes={systemRoutes}
        />

        <DottedSeparator className="my-2" />

        {(() => {
          const isActive = pathname === "/"; // Adjust if exit page is different
          return (
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Exit dashboard"
                asChild
                className={cn(
                  "relative px-2 py-4 hover:text-primary hover:bg-neutral-200 bg-neutral-100 border border-neutral-400 flex items-center gap-x-3 transition-all duration-200 ease-in-out transform hover:scale-[1.02]",
                  isActive &&
                    "text-black bg-white shadow-sm shadow-black border-black hover:bg-white scale-[1.02] mb-1"
                )}
              >
                <Link
                  prefetch
                  href="/"
                  className="flex items-center gap-x-3 w-full"
                >
                  {isActive && (
                    <span className="absolute right-0 top-0 h-full w-4 bg-blue-600" />
                  )}
                  <LogOutIcon className="size-5" />
                  <span className="text-md">Exit Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })()}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default ResponsiveSidebarContent;
