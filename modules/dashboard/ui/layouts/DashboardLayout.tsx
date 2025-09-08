import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "../components/DashboardNavbar";
import { DashboardSidebar } from "../components/DashboardSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="w-full bg-neutral-100">
        <DashboardNavbar></DashboardNavbar>
        <div className="flex min-h-screen pt-[4rem]">
          <DashboardSidebar></DashboardSidebar>
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
