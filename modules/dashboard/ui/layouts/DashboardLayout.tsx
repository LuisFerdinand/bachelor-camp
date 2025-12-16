import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "../components/DashboardNavbar";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { Role } from "@/db/schema/enums";

type RoleType = {
  id: string;
  name: Role;
};

type UserDashboardProps = {
  id: string;
  clerkId: string;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  email: string | null;
  phone: string | null;
  roles: RoleType[];
  lastActiveRole: string |  null,
};
interface DashboardLayoutProps {
  children: React.ReactNode;
  user: UserDashboardProps;
}

export const DashboardLayout = ({ children, user }: DashboardLayoutProps) => {
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
