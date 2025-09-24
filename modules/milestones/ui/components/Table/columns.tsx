import { Button } from "@/components/ui/button";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import {
  ArrowUpDown,
  ExternalLink,
  MoreVertical,
  TagIcon,
  Image as ImageIcon,
  List,
  Circle,
} from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
import { ProductImage } from "@/components/ProductImage";
import { cn, formatOrdinal } from "@/lib/utils";
import { InferSelectModel } from "drizzle-orm";
import { milestones } from "@/db/schema";
import { MilestoneActionProvider } from "../MilestoneContext";
import MilestoneActions from "./milestone-actions";
// import MilestoneActions from "./milestone-actions";

export type Milestone = InferSelectModel<typeof milestones>;

export function getMilestoneColumns(): ColumnDef<Milestone>[] {
  const router = useRouter();
  const pathname = usePathname();

  const columns: ColumnDef<Milestone>[] = [
    {
      accessorKey: "title",
      header: ({ column }: { column: Column<Milestone, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Milestone
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<Milestone> }) => {
        const { id, title, description, imageUrl } = row.original;

        return (
          <div className="flex items-start gap-4 max-w-full">
            <div className="relative w-20 shrink-0">
              <ProductImage imageUrl={imageUrl} title={title} />
            </div>
            <div className="flex flex-col overflow-hidden gap-0.5 max-w-[300px]">
              <span className="text-sm line-clamp-1 font-medium">{title}</span>
              <span className="text-xs text-muted-foreground line-clamp-2">
                {description || "No description"}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "year",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Year
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return <span className="font-medium">{row.original.year}</span>;
      },
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Active
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const { isActive } = row.original;
        return (
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
            <p className="leading-none">
              {isActive === "true" ? "Active" : "Inactive"}
            </p>
          </span>
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
      header: ({ column }) => (
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
        return (
          <div className="text-xs text-muted-foreground">
            {date.toLocaleString()}
          </div>
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => (
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
        return (
          <div className="text-xs text-muted-foreground">
            {date.toLocaleString()}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const { id, isActive, order, year } = row.original;
        return (
          <>
            <MilestoneActionProvider>
              <MilestoneActions
                id={id}
                isActive={isActive!}
                order={order}
                year={year}
              >
                <Button
                  variant="ghost"
                  className="size-8 p-0 hover:bg-neutral-300 hover:text-primary"
                >
                  <MoreVertical className="size-4" />
                </Button>
              </MilestoneActions>
            </MilestoneActionProvider>
          </>
        );
      },
    },
  ];

  return columns;
}
