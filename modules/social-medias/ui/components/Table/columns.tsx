"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import { ArrowUpDown, ImageIcon, MoreVertical } from "lucide-react";
import { cn, formatOrdinal } from "@/lib/utils";
import { SocialMedia } from "@/db/schema";
import { socialIcons } from "@/public/icons/social-icons";
import SocialMediaActions from "./social-media-actions";
import { SocialMediaActionProvider } from "../SocialMediaContext";
import { OrderBadge } from "@/components/table/OrderBadge";

import { URLDisplay } from "@/components/table/URLDisplay";
import LastUpdatedDisplay from "@/components/table/LastUpdatedDisplay";
import CreatedAtDisplay from "@/components/table/CreatedAtDisplay";
import { BooleanStatusBadge } from "@/components/table/StatusBadge";
// import SocialMediaActions from "./social-media-actions";

export const SOCIAL_PLATFORM_LABELS: Record<string, string> = {
  youtube: "YouTube",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
  instagram: "Instagram",
  facebook: "Facebook",
  x: "X",
  threads: "Threads",
  snapchat: "Snapchat",
  pinterest: "Pinterest",
  reddit: "Reddit",
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  discord: "Discord",
};

export function getSocialMediaColumns(): ColumnDef<SocialMedia>[] {
  const columns: ColumnDef<SocialMedia>[] = [
    {
      accessorKey: "order",
      header: ({ column }) => (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className=""
          >
            Order
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <OrderBadge
          order={row.original.order}
          showBadgeStyle={true}
        ></OrderBadge>
      ),
    },
    {
      accessorKey: "platform",
      header: ({ column }: { column: Column<SocialMedia, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-50/80 transition-all duration-200 font-semibold"
        >
          Platform
          <ArrowUpDown className="ml-2 h-4 w-4 opacity-70" />
        </Button>
      ),
      cell: ({ row }: { row: Row<SocialMedia> }) => {
        const { platform } = row.original;
        const Icon =
          socialIcons[platform.toLowerCase() as keyof typeof socialIcons];

        const platformStyles = {
          youtube: {
            bg: "bg-gradient-to-br from-red-50 to-red-100/80",
            hover: "hover:from-red-100 hover:to-red-200/80",
            border: "border-red-200/50",
            iconColor: "#dc2626",
          },
          instagram: {
            bg: "bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50",
            hover:
              "hover:from-pink-100 hover:via-purple-100 hover:to-orange-100",
            border: "border-pink-200/50",
            iconColor: "#e11d48",
          },
          facebook: {
            bg: "bg-gradient-to-br from-blue-50 to-blue-100/80",
            hover: "hover:from-blue-100 hover:to-blue-200/80",
            border: "border-blue-200/50",
            iconColor: "#1d4ed8",
          },
          linkedin: {
            bg: "bg-gradient-to-br from-blue-50 to-sky-100/80",
            hover: "hover:from-blue-100 hover:to-sky-200/80",
            border: "border-blue-200/50",
            iconColor: "#0369a1",
          },
          x: {
            bg: "bg-gradient-to-br from-gray-50 to-slate-100/80",
            hover: "hover:from-gray-100 hover:to-slate-200/80",
            border: "border-gray-200/50",
            iconColor: "#1f2937",
          },
          tiktok: {
            bg: "bg-gradient-to-br from-purple-50 to-pink-50",
            hover: "hover:from-purple-100 hover:to-pink-100",
            border: "border-purple-200/50",
            iconColor: "#7c3aed",
          },
          threads: {
            bg: "bg-gradient-to-br from-gray-50 to-neutral-100/80",
            hover: "hover:from-gray-100 hover:to-neutral-200/80",
            border: "border-gray-200/50",
            iconColor: "#374151",
          },
          snapchat: {
            bg: "bg-gradient-to-br from-yellow-50 to-amber-100/80",
            hover: "hover:from-yellow-100 hover:to-amber-200/80",
            border: "border-yellow-200/50",
            iconColor: "#f59e0b",
          },
          pinterest: {
            bg: "bg-gradient-to-br from-red-50 to-rose-100/80",
            hover: "hover:from-red-100 hover:to-rose-200/80",
            border: "border-red-200/50",
            iconColor: "#dc2626",
          },
          reddit: {
            bg: "bg-gradient-to-br from-orange-50 to-red-50",
            hover: "hover:from-orange-100 hover:to-red-100",
            border: "border-orange-200/50",
            iconColor: "#ea580c",
          },
          whatsapp: {
            bg: "bg-gradient-to-br from-green-50 to-emerald-100/80",
            hover: "hover:from-green-100 hover:to-emerald-200/80",
            border: "border-green-200/50",
            iconColor: "#059669",
          },
          telegram: {
            bg: "bg-gradient-to-br from-blue-50 to-cyan-100/80",
            hover: "hover:from-blue-100 hover:to-cyan-200/80",
            border: "border-blue-200/50",
            iconColor: "#0891b2",
          },
          discord: {
            bg: "bg-gradient-to-br from-indigo-50 to-purple-100/80",
            hover: "hover:from-indigo-100 hover:to-purple-200/80",
            border: "border-indigo-200/50",
            iconColor: "#6366f1",
          },
        };

        const defaultStyle = {
          bg: "bg-gradient-to-br from-gray-50 to-gray-100/80",
          hover: "hover:from-gray-100 hover:to-gray-200/80",
          border: "border-gray-200/50",
          iconColor: "#6b7280",
        };

        const style =
          platformStyles[
            platform.toLowerCase() as keyof typeof platformStyles
          ] || defaultStyle;

        return (
          <div className="flex items-center gap-4 py-2 group">
            {Icon ? (
              <div
                className={`
            flex items-center justify-center w-12 h-12 rounded-xl border
            ${style.bg} ${style.hover} ${style.border}
            transition-all duration-300 ease-out
            shadow-sm hover:shadow-md
            group-hover:scale-105
          `}
              >
                <Icon size={30} color={style.iconColor} />
              </div>
            ) : (
              <div className="flex items-center justify-center w-12 h-12 rounded-xl border bg-gradient-to-br from-gray-50 to-gray-100/80 hover:from-gray-100 hover:to-gray-200/80 border-gray-200/50 transition-all duration-300 shadow-sm hover:shadow-md group-hover:scale-105">
                <ImageIcon className="w-6 h-6 text-gray-500" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900 capitalize tracking-wide">
                {SOCIAL_PLATFORM_LABELS[platform] ?? platform}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                Social Platform
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "url",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          URL
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <URLDisplay
            url={row.original.url}
            variant="badge"
            maxWidth={200}
            showCopy={true}
            onClick={(e) => e.stopPropagation()}
          ></URLDisplay>
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
          Status
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
          Status
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
        const { id, isActive, order, url } = row.original;
        return (
          <SocialMediaActionProvider>
            <SocialMediaActions
              id={id}
              isActive={isActive!}
              order={order}
              url={url || ""}
            >
              <Button
                variant="ghost"
                className="size-8 p-0 hover:bg-neutral-300 hover:text-primary"
              >
                <MoreVertical className="size-4" />
              </Button>
            </SocialMediaActions>
          </SocialMediaActionProvider>
        );
      },
    },
  ];

  return columns;
}
