import { Button } from "@/components/ui/button";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import {
  ArrowUpDown,
  EyeIcon,
  StarIcon,
  UsersIcon,
  MoreVertical,
  Home,
  Tent,
  BookOpen,
  FileText,
  Info,
  Rss,
  Mail,
  Icon,
} from "lucide-react";

import { ProductImage } from "@/components/ProductImage";
import { cn, stringToColor } from "@/lib/utils";
import { TestimonialWithCategories } from "@/db/schema";
import TestimonialActions from "./testimonial-actions";
import { TestimonialActionProvider } from "../TestimonialContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { OrderBadge } from "@/components/table/OrderBadge";
import CreatedAtDisplay from "@/components/table/CreatedAtDisplay";
import LastUpdatedDisplay from "@/components/table/LastUpdatedDisplay";
import { FeaturedBadge } from "@/components/table/FeaturedBadge";
import { BooleanStatusBadge } from "@/components/table/StatusBadge";
import { CategoryBadgeList } from "@/components/table/CategoryBadge";

const typeIcons: Record<string, React.ElementType> = {
  Home: Home,
  Camp: Tent,
  Programs: BookOpen,
  Tests: FileText,
  About: Info,
  Blog: Rss,
  Contact: Mail,
};

export function getTestimonialColumns(): ColumnDef<TestimonialWithCategories>[] {
  const columns: ColumnDef<TestimonialWithCategories>[] = [
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
          order={row.original.order!}
          showBadgeStyle={true}
        ></OrderBadge>
      ),
    },
    {
      accessorKey: "name",
      header: ({
        column,
      }: {
        column: Column<TestimonialWithCategories, unknown>;
      }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Testimonial
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<TestimonialWithCategories> }) => {
        const { name, role, imageUrl, source } = row.original;

        return (
          <div className="flex items-center gap-3">
            <Avatar className="size-8 border border-gray-600">
              <>
                <AvatarImage
                  src={imageUrl ?? undefined}
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
            <div className="flex flex-col text-sm">
              <span className="font-medium line-clamp-1">
                {name ? name : "-"}
              </span>
              <span className="font-semibold text-muted-foreground line-clamp-1">
                {source
                  ? source.charAt(0).toUpperCase() + source.slice(1)
                  : "-"}
              </span>
              {role && (
                <span className="text-xs text-gray-500 line-clamp-1">
                  {role
                    .toLowerCase()
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                </span>
              )}
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "content",
      header: "Content",
      cell: ({ row }: { row: Row<TestimonialWithCategories> }) => {
        const { content } = row.original;
        return (
          <span className="text-sm text-muted-foreground line-clamp-2">
            {content || "-"}
          </span>
        );
      },
    },

    // Categories (multiple)
    {
      accessorKey: "categories",
      header: "Categories",
      cell: ({ row }) => {
        const { categories } = row.original;

        return (
          <CategoryBadgeList
            categories={categories}
            size="sm"
          ></CategoryBadgeList>
        );
      },
    },

    // Rating
    {
      accessorKey: "rating",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const { rating } = row.original;
        return (
          <div className="flex items-center gap-1 text-xs">
            <StarIcon className="w-3.5 h-3.5 text-yellow-500" />
            <p className="leading-none">{rating}</p>
          </div>
        );
      },
    },

    // Featured flag
    {
      accessorKey: "isFeatured",
      header: "Featured",
      cell: ({ row }) => {
        const { isFeatured } = row.original;
        return (
          <FeaturedBadge
            isFeatured={isFeatured}
            showIcon={true}
          ></FeaturedBadge>
        );
      },
    },

    // Visibility flag
    {
      accessorKey: "isShown",
      header: "Visibility",
      cell: ({ row }) => {
        const { isShown } = row.original;
        return (
          <BooleanStatusBadge
            status={isShown!}
            type="visibility"
            showIcon
          ></BooleanStatusBadge>
        );
      },
    },

    // Created date
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
        const { createdAt } = row.original;
        return <CreatedAtDisplay value={createdAt!}></CreatedAtDisplay>;
      },
    },

    // Updated date
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
        const { updatedAt } = row.original;
        return <LastUpdatedDisplay value={updatedAt!}></LastUpdatedDisplay>;
      },
    },

    // Actions
    {
      id: "actions",
      cell: ({ row }) => {
        const { id, isShown } = row.original;

        return (
          <>
            <TestimonialActionProvider>
              <TestimonialActions id={id} isShown={isShown}>
                <Button
                  variant={"ghost"}
                  className="size-8 p-0 hover:bg-neutral-300 hover:text-primary"
                >
                  <MoreVertical className="size-4" />
                </Button>
              </TestimonialActions>
            </TestimonialActionProvider>
          </>
        );
      },
    },
  ];

  return columns;
}
