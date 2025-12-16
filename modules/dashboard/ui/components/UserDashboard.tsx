"use client";

import { Role } from "@/db/schema/enums";
import Image from "next/image";

type RoleType = {
  id: string;
  name: Role;
};

type UserDashboardProps = {
  user: {
    id: string;
    clerkId: string;
    firstName: string | null;
    lastName: string | null;
    avatarUrl: string | null;
    email: string | null;
    phone: string | null;
    lastActiveRole: string |  null,
    roles: RoleType[];

  };
};

export default function UserDashboard({ user }: UserDashboardProps) {
  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || "User";

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Image
          src={user.avatarUrl ?? "/avatar-placeholder.png"}
          alt={fullName}
          width={64}
          height={64}
          className="rounded-full"
        />

        <div>
          <h1 className="text-2xl font-semibold">Welcome, {fullName}</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashboardCard
          title="My Courses"
          description="View and manage your enrolled courses"
          href="/dashboard/courses"
        />

        <DashboardCard
          title="My Accommodation"
          description="Manage your accommodation bookings"
          href="/dashboard/accommodation"
        />

        <DashboardCard
          title="Profile"
          description="Update your personal information"
          href="/dashboard/profile"
        />

        <DashboardCard
          title="Orders"
          description="View your transaction history"
          href="/dashboard/orders"
        />
      </section>

      {/* Roles Info (optional) */}
      {user.roles.length > 0 && (
        <section>
          <h2 className="text-lg font-medium mb-2">Your Roles</h2>
          <div className="flex gap-2 flex-wrap">
            {user.roles.map((role) => (
              <span
                key={role.id}
                className="px-3 py-1 text-sm rounded-full bg-muted"
              >
                {role.name.replace("_", " ")}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function DashboardCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="block rounded-xl border p-4 hover:bg-muted transition"
    >
      <h3 className="font-semibold text-2xl">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </a>
  );
}
