import { Button } from "@/components/ui/button";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreVertical,
  StarIcon,
  FileCheckIcon,
  Clock,
  Users,
  DollarSign,
  Target,
  BookOpen,
  Briefcase,
  MessageCircle,
  Sprout,
  Zap,
  Rocket,
  Trophy,
  FileCheck,
  Building2,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { InferSelectModel } from "drizzle-orm";
import { courses, CourseWithDetails } from "@/db/schema";
import { CourseActionProvider } from "../CourseContext";
import {
  formatOrdinal,
  getCourseCategoryConfig,
  getCourseLevelConfig,
  stringToColor,
} from "@/lib/utils";
import { OrderBadge } from "@/components/table/OrderBadge";
import { CategoryBadge } from "@/components/table/CategoryBadge";
import { BooleanStatusBadge } from "@/components/table/StatusBadge";
import { FeatureList, FeatureTableCell } from "@/components/table/FeatureList";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "@/components/ProductImage";
import LastUpdatedDisplay from "@/components/table/LastUpdatedDisplay";
import CourseActions from "./course-actions";
// import CourseActions from "./course-actions";

export function getCourseColumns(): ColumnDef<CourseWithDetails>[] {
  const router = useRouter();
  const pathname = usePathname();

  const columns: ColumnDef<CourseWithDetails>[] = [
    {
      accessorKey: "order",
      header: ({ column }: { column: Column<CourseWithDetails, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<CourseWithDetails> }) => {
        const { order } = row.original;
        return <OrderBadge order={order!} showBadgeStyle={true}></OrderBadge>;
      },
    },

    // Course title and description
    {
      accessorKey: "title",
      header: ({ column }: { column: Column<CourseWithDetails, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<CourseWithDetails> }) => {
        const { title, description, slug, imageUrl } = row.original;
        return (
          <>
            <div className="flex items-start gap-4 max-w-full">
              <div className="relative w-20 shrink-0">
                <ProductImage imageUrl={imageUrl} title={title} />
              </div>
              <div className="flex flex-col overflow-hidden gap-0.5 max-w-[300px]">
                <span className="text-sm line-clamp-1 font-medium">
                  {title}
                </span>
                <span className="text-xs text-muted-foreground line-clamp-2">
                  {description || "No description"}
                </span>
              </div>
            </div>
          </>
        );
      },
    },

    // Category and Level combined
    {
      accessorKey: "category",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-50 text-gray-700 font-medium"
        >
          Category & Level
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const { category, level } = row.original;

        const CategoryBadge = ({ category }: { category: string }) => {
          const config = getCourseCategoryConfig(category);
          const IconComponent = config.icon;

          return (
            <div className="relative group">
              <Badge
                variant="outline"
                className={`
              text-xs font-semibold border-2 px-3 py-1.5
              ${config.color} ${config.darkColor}
              transition-all duration-300 ease-in-out
              hover:scale-105 hover:shadow-md hover:border-opacity-80
              cursor-default select-none
              flex items-center gap-1.5
            `}
              >
                <IconComponent className={`w-3.5 h-3.5 ${config.iconColor}`} />
                <span className="tracking-wide">{category}</span>
              </Badge>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
                {category} Course
              </div>
            </div>
          );
        };

        const LevelBadge = ({ level }: { level: string }) => {
          const config = getCourseLevelConfig(level);
          const IconComponent = config.icon;

          return (
            <div className="relative group">
              <Badge
                variant="outline"
                className={`
              text-xs font-medium border px-2.5 py-1
              ${config.color} ${config.darkColor}
              transition-all duration-300 ease-in-out
              hover:scale-105 hover:shadow-sm
              cursor-default select-none
              flex items-center gap-1.5
            `}
              >
                <IconComponent className={`w-3 h-3 ${config.iconColor}`} />
                <span>{level}</span>
              </Badge>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
                {config.description}
              </div>
            </div>
          );
        };

        return (
          <div className="flex flex-col gap-2.5 py-1">
            {/* Category Badge */}
            <div className="flex items-center">
              <CategoryBadge category={category} />
            </div>

            {/* Level Badge */}
            <div className="flex items-center">
              <LevelBadge level={level} />
            </div>
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        const categoryA = rowA.original.category;
        const categoryB = rowB.original.category;
        const levelA = rowA.original.level;
        const levelB = rowB.original.level;

        if (categoryA !== categoryB) {
          return categoryA.localeCompare(categoryB);
        }

        const getLevelPriority = (level: string) => {
          switch (level.toLowerCase()) {
            case "intro":
              return 1;
            case "drill class":
              return 2;
            case "next step":
              return 3;
            case "advanced":
              return 4;
            case "mock test":
              return 5;
            default:
              return 0;
          }
        };

        return getLevelPriority(levelA) - getLevelPriority(levelB);
      },
    },

    // Duration and Sessions
    {
      accessorKey: "duration",
      header: () => <Button variant="ghost">Duration</Button>,
      cell: ({ row }) => {
        const { duration, totalSessions } = row.original;
        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-xs">
              <Clock className="w-3 h-3" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="w-3 h-3" />
              <span>{totalSessions} sessions</span>
            </div>
          </div>
        );
      },
    },

    // Status (Active/Inactive)
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
            showIcon={true}
          ></BooleanStatusBadge>
        );
      },
    },

    // Featured status
    {
      accessorKey: "isFeatured",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Featured
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const { isFeatured } = row.original;
        return (
          <BooleanStatusBadge
            status={isFeatured!}
            type="featured"
            showIcon={true}
          ></BooleanStatusBadge>
        );
      },
    },

    // Price
    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const { price } = row.original;

        const PriceDisplay = ({ price }: { price: number }) => {
          const formatPrice = (price: number) => {
            if (price === 0) return "Free";
            if (price >= 1000000) {
              return `${(price / 1000000).toFixed(1)}M`;
            }
            if (price >= 1000) {
              return `${(price / 1000).toFixed(0)}K`;
            }
            return price.toLocaleString("id-ID");
          };

          return (
            <div className="text-right space-y-1">
              <div className="flex items-center justify-end gap-1">
                <DollarSign className="w-3 h-3 text-muted-foreground" />
                <span
                  className={`text-sm font-semibold ${
                    price === 0 ? "text-green-600" : "text-foreground"
                  }`}
                >
                  {price === 0 ? "FREE" : `Rp ${formatPrice(price)}`}
                </span>
              </div>
              {price > 0 && (
                <div className="text-xs text-muted-foreground">
                  Rp {price.toLocaleString("id-ID")}
                </div>
              )}
            </div>
          );
        };
        return (
          <div className="text-right">
            <PriceDisplay price={price}></PriceDisplay>
          </div>
        );
      },
    },
    {
      accessorKey: "learningGoals",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Learning Goals
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: any }) => {
        const { learningGoals } = row.original;

        return (
          <>
            <FeatureList
              features={learningGoals || []}
              maxItems={3}
              variant="compact"
              name="goals"
            ></FeatureList>
          </>
        );
      },
    },
    {
      accessorKey: "syllabus",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Syllabus
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: any }) => {
        const { syllabus } = row.original;

        return (
          <>
            <FeatureList
              features={syllabus || []}
              maxItems={3}
              variant="compact"
              name="syllabus"
            ></FeatureList>
          </>
        );
      },
    },
    {
      accessorKey: "teachingMethods",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Teaching Method
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: any }) => {
        const { teachingMethods } = row.original;

        return (
          <>
            <FeatureList
              features={teachingMethods || []}
              maxItems={3}
              variant="compact"
              name="methods"
            ></FeatureList>
          </>
        );
      },
    },
    {
      accessorKey: "resources",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Resources
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: any }) => {
        const { resources } = row.original;

        return (
          <>
            <FeatureList
              features={resources || []}
              maxItems={3}
              variant="compact"
              name="resources"
            ></FeatureList>
          </>
        );
      },
    },
    {
      accessorKey: "targetAudience",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Target Audience
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: any }) => {
        const { targetAudience } = row.original;

        return (
          <>
            <FeatureList
              features={targetAudience || []}
              maxItems={3}
              variant="compact"
              name="targets"
            ></FeatureList>
          </>
        );
      },
    },

    {
      accessorKey: "buildings",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Buildings
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: any }) => {
        const buildings = row.original.buildings || [];

        if (buildings.length === 0) {
          return (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Building2 className="w-3.5 h-3.5" />
              <span>No buildings</span>
            </div>
          );
        }

        return (
          <div className="flex flex-col gap-1 py-1 max-w-[250px]">
            {buildings.slice(0, 2).map((building: any, index: number) => (
              <div
                key={building.id}
                className="flex items-center gap-2 p-2 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors shadow-md"
              >
                <Building2 className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium truncate">
                      {building.name}
                    </span>
                    {building.badge && (
                      <Badge
                        className="text-[10px] px-1.5 py-0 h-4 flex-shrink-0"
                        style={{
                          backgroundColor: stringToColor(building.badge)
                            .background,
                          color: stringToColor(building.badge).text,
                          border: `1px solid ${stringToColor(building.badge).border}`,
                        }}
                      >
                        {building.badge}
                      </Badge>
                    )}
                  </div>
                  {building.description && (
                    <p className="text-[10px] text-muted-foreground truncate">
                      {building.description}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {buildings.length > 2 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground pl-2">
                <span>
                  +{buildings.length - 2} more building
                  {buildings.length - 2 !== 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        const buildingsA = rowA.original.buildings || [];
        const buildingsB = rowB.original.buildings || [];
        return buildingsA.length - buildingsB.length;
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
        const date = new Date(row.original.updatedAt);
        return <LastUpdatedDisplay value={date}></LastUpdatedDisplay>;
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
        const date = new Date(row.original.createdAt);
        return (
          <div className="flex flex-col">
            <span className="text-xs">
              {date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="text-xs text-muted-foreground">
              {date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const { id, isActive, order } = row.original;
        return (
          <>
            <CourseActionProvider>
              <CourseActions id={id} isActive={isActive!} order={order || 0}>
                <Button
                  variant="ghost"
                  className="size-8 p-0 hover:bg-neutral-300 hover:text-primary"
                >
                  <MoreVertical className="size-4" />
                </Button>
              </CourseActions>
            </CourseActionProvider>
          </>
        );
      },
    },
  ];

  return columns;
}
