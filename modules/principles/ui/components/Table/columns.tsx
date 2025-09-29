"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { ArrowUpDown, Circle, ImageIcon, MoreVertical } from "lucide-react";
import { ReactSVG } from "react-svg";
import { cn, formatOrdinal, stringToColor } from "@/lib/utils";
import { Principle } from "@/db/schema";
import { PrincipleActionProvider } from "../PrincipleContext";
import PrincipleActions from "./principle-actions";
import { OrderBadge } from "@/components/table/OrderBadge";
import CreatedAtDisplay from "@/components/table/CreatedAtDisplay";
import LastUpdatedDisplay from "@/components/table/LastUpdatedDisplay";
import { BooleanStatusBadge } from "@/components/table/StatusBadge";

export function getPrincipleColumns(): ColumnDef<Principle>[] {
  const columns: ColumnDef<Principle>[] = [
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
        <OrderBadge
          order={row.original.order}
          showBadgeStyle={true}
        ></OrderBadge>
      ),
    },
    {
      accessorKey: "title",
      header: ({ column }: { column: Column<Principle, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<Principle> }) => {
        const { id, title, subtitle, iconUrl } = row.original;

        return (
          <div className="flex items-start gap-3 max-w-full">
            {/* icon with dynamic color */}
            {iconUrl ? (
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
                style={{ backgroundColor: stringToColor(title).text }}
              >
                <ReactSVG
                  src={iconUrl}
                  wrapper="span"
                  className="w-6 h-6 text-white"
                  beforeInjection={(svg) => {
                    // svg.setAttribute("fill", "currentColor");
                    svg.setAttribute("stroke", "currentColor");
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 shrink-0">
                <ImageIcon className="w-6 h-6 text-gray-500" />
              </div>
            )}

            <div className="flex flex-col overflow-hidden gap-0.5 max-w-[280px]">
              <span className="text-sm font-medium line-clamp-1">{title}</span>
              <span className="text-xs text-muted-foreground line-clamp-2">
                {subtitle || "No subtitle"}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => (
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
          <BooleanStatusBadge
            status={isActive!}
            type="active"
            showIcon
          ></BooleanStatusBadge>
        );
      },
    },

    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt!);
        return <CreatedAtDisplay value={date}></CreatedAtDisplay>;
      },
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.updatedAt!);
        return <LastUpdatedDisplay value={date}></LastUpdatedDisplay>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const { id, isActive, order } = row.original;
        return (
          <>
            <PrincipleActionProvider>
              <PrincipleActions id={id} isActive={isActive!} order={order}>
                <Button
                  variant="ghost"
                  className="size-8 p-0 hover:bg-neutral-300 hover:text-primary"
                >
                  <MoreVertical className="size-4" />
                </Button>
              </PrincipleActions>
            </PrincipleActionProvider>
          </>
        );
      },
    },
  ];

  return columns;
}
