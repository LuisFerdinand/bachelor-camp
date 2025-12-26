import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "../components/DashboardNavbar";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { Role } from "@/db/schema/enums";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { tableData } from "@/constants";

type RoleType = {
  id: string;
  name: Role;
};

type UserDashboardProps = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  image: string | null;
  email: string | null;
  phone: string | null;
  lastActiveRole: string | null;
  roles: RoleType[];
};
interface DashboardLayoutProps {
  children: React.ReactNode;
  user: UserDashboardProps;
}

export const DashboardLayout2 = ({ children, user }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="w-full bg-neutral-100">
        <DashboardNavbar></DashboardNavbar>
        <div className="flex min-h-screen pt-[4rem]">
          <DashboardSidebar user={user}></DashboardSidebar>
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
export const DashboardLayout = ({ children, user }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 md:gap-6 ">
              {/* <SectionCards /> */}
              <main className="flex-1 overflow-y-auto">{children}</main>
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={tableData} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
