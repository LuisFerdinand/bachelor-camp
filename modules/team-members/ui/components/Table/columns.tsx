"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreVertical,
  Mail,
  Linkedin,
  Twitter,
  Globe,
  Phone,
  Facebook,
  Instagram,
} from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
import { cn, formatOrdinal, stringToColor } from "@/lib/utils";
import { ProductImage } from "@/components/ProductImage";
import { TeamMember } from "@/db/schema/marketing/teamMembers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TeamMemberActionProvider } from "../TeamMemberContext";
import TeamMemberActions from "./team-member-actions";

const socialIcons: Record<string, React.ElementType> = {
  email: Mail,
  linkedin: Linkedin,
  twitter: Twitter,
  website: Globe,
  whatsapp: Phone,
  facebook: Facebook,
  instagram: Instagram,
};

export function getTeamMemberColumns(): ColumnDef<
  TeamMember & { departmentName?: string }
>[] {
  const router = useRouter();
  const pathname = usePathname();

  const columns: ColumnDef<TeamMember & { departmentName?: string }>[] = [
    {
      accessorKey: "name",
      header: ({ column }: { column: Column<TeamMember, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Member
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<TeamMember> }) => {
        const { id, name, title, bio, avatarUrl } = row.original;

        return (
          <div className="flex items-center gap-3 max-w-full">
            <Avatar className="size-8 border border-gray-600">
              <>
                <AvatarImage
                  src={avatarUrl ?? undefined}
                  alt={name ?? "Member"}
                />
                <AvatarFallback>
                  <p className="leading-none">
                    {name
                      ? name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()
                      : "ME"}
                  </p>
                </AvatarFallback>
              </>
            </Avatar>
            <div className="flex flex-col overflow-hidden gap-0.5 max-w-[250px]">
              <span className="text-sm font-medium line-clamp-1">{name}</span>
              <span className="text-xs font-semibold text-muted-foreground line-clamp-1">
                {title}
              </span>
              {bio && (
                <span className="text-xs text-muted-foreground line-clamp-1">
                  {bio}
                </span>
              )}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "departmentName",
      header: ({ column }: { column: Column<TeamMember, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Department
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const { departmentName } = row.original;
        return (
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium truncate"
            style={{
              backgroundColor: stringToColor(departmentName || "Other"),
              color: "black",
            }}
          >
            {departmentName || "N/A"}
          </span>
        );
      },
    },
    {
      accessorKey: "socialLinks",
      header: () => <span>Social</span>,
      cell: ({ row }) => {
        const links = row.original.socialLinks || [];

        return (
          <div className="flex flex-row gap-2">
            {links.map((link, i) => {
              const Icon = socialIcons[link.type] || Globe;
              return (
                <a
                  key={i}
                  href={link.type === "email" ? `mailto:${link.url}` : link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "isActive",
      header: ({ column }: { column: Column<TeamMember, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const { isActive } = row.original;

        return (
          <div className="flex items-center justify-center">
            <span
              className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                isActive === "true"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              )}
            >
              <span
                className={cn(
                  "w-2 h-2 rounded-full",
                  isActive === "true" ? "bg-green-500" : "bg-red-500"
                )}
              />
              {isActive === "true" ? "Active" : "Inactive"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "order",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground items-center flex justify-center">
          {row.original.order > 0 ? formatOrdinal(row.original.order) : "-"}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }: { column: Column<TeamMember, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt!);
        const formatted = date.toLocaleDateString();
        return (
          <span className="text-xs text-muted-foreground">{formatted}</span>
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }: { column: Column<TeamMember, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Updated
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.updatedAt!);
        const formatted = date.toLocaleDateString();
        return (
          <span className="text-xs text-muted-foreground">{formatted}</span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const { id, isActive, departmentId, order } = row.original;

        return (
          <>
            <TeamMemberActionProvider>
              <TeamMemberActions
                id={id}
                isActive={isActive!}
                order={order}
                departmentId={departmentId}
              >
                <Button
                  variant={"ghost"}
                  className="size-8 p-0 hover:bg-neutral-300 hover:text-primary"
                >
                  <MoreVertical className="size-4" />
                </Button>
              </TeamMemberActions>
            </TeamMemberActionProvider>
          </>
        );
      },
    },
  ];

  return columns;
}
