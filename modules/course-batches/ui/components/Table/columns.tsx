import { Button } from "@/components/ui/button";
import { ColumnDef, Row } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Calendar,
  Clock,
  Users,
  BookOpen,
  Monitor,
  Building,
  Wifi,
  CheckCircle,
  XCircle,
  AlertCircle,
  PlayCircle,
  TrendingUp,
  Award,
  Image as ImageIcon,
  MoreVertical,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import LastUpdatedDisplay from "@/components/table/LastUpdatedDisplay";
import { CourseBatchWithDetails } from "@/db/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getCourseCategoryConfig, getCourseLevelConfig } from "@/lib/utils";
import CreatedAtDisplay from "@/components/table/CreatedAtDisplay";
import { CourseBatchActionProvider } from "../CourseBatchContext";
import CourseBatchActions from "./course-batch-actions";

export function getCourseBatchColumns(): ColumnDef<CourseBatchWithDetails>[] {
  const columns: ColumnDef<CourseBatchWithDetails>[] = [
    // Course Info with Image
    {
      accessorFn: (row) => row.course.title,
      id: "course.title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-semibold"
        >
          Course Details
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<CourseBatchWithDetails> }) => {
        const { course, number } = row.original;

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
          <div className="flex items-start gap-3 min-w-[280px] py-1">
            <Avatar className="h-12 w-12 rounded-lg border-2 border-border shadow-sm">
              <AvatarImage
                src={course.imageUrl || undefined}
                alt={course.title}
              />
              <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-100 to-purple-100">
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-2 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="font-semibold text-sm leading-tight line-clamp-2">
                  {course.title}
                </div>
                <Badge
                  variant="secondary"
                  className="shrink-0 text-xs font-medium"
                >
                  #{number}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <div className="flex items-center">
                  <CategoryBadge category={course.category} />
                </div>

                {/* Level Badge */}
                <div className="flex items-center">
                  <LevelBadge level={course.level} />
                </div>
                {course.isFeatured === "true" && (
                  <Badge className="text-xs bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0">
                    <Award className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
            </div>
          </div>
        );
      },
    },

    // Status with enhanced visual
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-semibold"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const { status } = row.original;

        const getStatusConfig = (status: string) => {
          const configs: Record<
            string,
            { gradient: string; icon: any; textColor: string }
          > = {
            upcoming: {
              gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
              icon: AlertCircle,
              textColor: "text-white",
            },
            ongoing: {
              gradient: "bg-gradient-to-r from-green-500 to-emerald-600",
              icon: PlayCircle,
              textColor: "text-white",
            },
            completed: {
              gradient: "bg-gradient-to-r from-gray-500 to-gray-600",
              icon: CheckCircle,
              textColor: "text-white",
            },
            cancelled: {
              gradient: "bg-gradient-to-r from-red-500 to-red-600",
              icon: XCircle,
              textColor: "text-white",
            },
          };
          return (
            configs[status] || {
              gradient: "bg-gradient-to-r from-gray-400 to-gray-500",
              icon: AlertCircle,
              textColor: "text-white",
            }
          );
        };

        const config = getStatusConfig(status);
        const IconComponent = config.icon;

        return (
          <Badge
            className={`${config.gradient} ${config.textColor} flex items-center gap-1.5 capitalize px-3 py-1 font-medium shadow-sm border-0`}
          >
            <IconComponent className="w-3.5 h-3.5" />
            {status}
          </Badge>
        );
      },
      sortingFn: (rowA, rowB) => {
        const statusOrder = {
          upcoming: 1,
          ongoing: 2,
          completed: 3,
          cancelled: 4,
        };
        const statusA = rowA.original.status as keyof typeof statusOrder;
        const statusB = rowB.original.status as keyof typeof statusOrder;
        return statusOrder[statusA] - statusOrder[statusB];
      },
    },

    // Enhanced Schedule & Delivery with Tooltips
    {
      accessorKey: "deliveryMode",
      header: () => (
        <Button variant="ghost" className="font-semibold">
          Schedule & Mode
        </Button>
      ),
      cell: ({ row }) => {
        const { deliveryMode, scheduleSummary } = row.original;

        const getModeConfig = (mode: string) => {
          const configs: Record<
            string,
            { icon: any; gradient: string; textColor: string }
          > = {
            online: {
              icon: Monitor,
              gradient:
                "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200",
              textColor: "text-blue-700",
            },
            offline: {
              icon: Building,
              gradient:
                "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200",
              textColor: "text-green-700",
            },
            hybrid: {
              icon: Wifi,
              gradient:
                "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200",
              textColor: "text-purple-700",
            },
          };
          return (
            configs[mode] || {
              icon: Monitor,
              gradient: "bg-gray-50 border-gray-200",
              textColor: "text-gray-700",
            }
          );
        };

        const config = getModeConfig(deliveryMode);
        const IconComponent = config.icon;

        // Convert scheduleSummary to array format if needed
        const scheduleEntries =
          typeof scheduleSummary === "object" && !Array.isArray(scheduleSummary)
            ? Object.entries(scheduleSummary as Record<string, string>)
            : [];

        return (
          <TooltipProvider>
            <div className="flex flex-col gap-2.5 min-w-[160px]">
              <Badge
                variant="outline"
                className={`${config.gradient} ${config.textColor} flex items-center gap-1.5 w-fit font-medium border px-3 py-1`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span className="capitalize">{deliveryMode}</span>
              </Badge>

              {scheduleEntries.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {scheduleEntries.map(([day, timeRange]) => (
                    <Tooltip key={day} delayDuration={200}>
                      <TooltipTrigger asChild>
                        <span className="px-2 py-1 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded text-xs font-semibold text-indigo-700 cursor-help hover:from-indigo-100 hover:to-blue-100 transition-colors">
                          {day.substring(0, 3).toUpperCase()}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="bg-slate-900 text-white border-slate-700"
                      >
                        <div className="flex items-center gap-2 px-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="font-medium capitalize">{day}</span>
                          <span className="text-slate-400">•</span>
                          <span className="font-semibold">{timeRange}</span>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              )}
            </div>
          </TooltipProvider>
        );
      },
    },

    // Duration & Dates
    {
      accessorKey: "startDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-semibold"
        >
          Duration
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const { startDate, endDate, course } = row.original;
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : null;

        return (
          <div className="flex flex-col gap-2 min-w-[140px]">
            <div className="flex items-center gap-2 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-md px-3 py-1.5">
              <Calendar className="w-4 h-4 text-blue-600" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-blue-900">
                  {start.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                {end && (
                  <span className="text-xs text-blue-600">
                    to{" "}
                    {end.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground px-1">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-medium">{course.duration}</span>
            </div>
          </div>
        );
      },
    },

    // Enhanced Enrollment & Capacity
    {
      accessorKey: "enrolledCount",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-semibold"
        >
          Enrollment
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const { enrolledCount, capacity } = row.original;
        const percentage = capacity ? (enrolledCount / capacity) * 100 : 0;
        const isFull = capacity && enrolledCount >= capacity;
        const isNearFull = percentage >= 80;

        return (
          <div className="flex flex-col gap-2 min-w-[140px]">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Users
                  className={`w-4 h-4 ${isFull ? "text-red-600" : isNearFull ? "text-amber-600" : "text-blue-600"}`}
                />
                <span className="text-sm font-bold">
                  {enrolledCount}
                  {capacity && (
                    <span className="text-muted-foreground font-normal">
                      {" "}
                      / {capacity}
                    </span>
                  )}
                </span>
              </div>
              {isFull && (
                <Badge className="bg-red-500 text-white text-xs px-2 py-0 border-0">
                  Full
                </Badge>
              )}
            </div>

            {capacity && (
              <div className="flex flex-col gap-1">
                <Progress
                  value={percentage}
                  className={`h-2 ${isFull ? "bg-red-100" : isNearFull ? "bg-amber-100" : ""}`}
                />
                <span
                  className={`text-xs font-medium ${isFull ? "text-red-600" : isNearFull ? "text-amber-600" : "text-muted-foreground"}`}
                >
                  {Math.round(percentage)}% filled
                </span>
              </div>
            )}
          </div>
        );
      },
    },

    // Enhanced Session Progress
    {
      accessorKey: "completedSessions",
      header: () => (
        <Button variant="ghost" className="font-semibold">
          Progress
        </Button>
      ),
      cell: ({ row }) => {
        const { completedSessions, totalSessions } = row.original;
        const percentage =
          totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0;
        const isCompleted =
          completedSessions === totalSessions && totalSessions > 0;
        const isStarted = completedSessions > 0;

        return (
          <div className="flex flex-col gap-2 min-w-[140px]">
            <div className="flex items-center gap-2">
              <BookOpen
                className={`w-4 h-4 ${isCompleted ? "text-green-600" : isStarted ? "text-blue-600" : "text-gray-400"}`}
              />
              <span className="text-sm">
                <span className="font-bold">{completedSessions}</span>
                <span className="text-muted-foreground">
                  {" "}
                  / {totalSessions}
                </span>
              </span>
              {isCompleted && (
                <CheckCircle className="w-4 h-4 text-green-600" />
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Progress
                value={percentage}
                className={`h-2 ${isCompleted ? "bg-green-100" : ""}`}
              />
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-medium ${isCompleted ? "text-green-600" : "text-muted-foreground"}`}
                >
                  {Math.round(percentage)}% complete
                </span>
                {isCompleted && (
                  <Badge className="bg-green-500 text-white text-xs px-2 py-0 border-0">
                    Done
                  </Badge>
                )}
              </div>
            </div>
          </div>
        );
      },
    },

    // Enhanced Price
    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-semibold"
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const { price } = row.original;

        const formatPrice = (price: number) => {
          if (price >= 1000000) return `${(price / 1000000).toFixed(1)}M`;
          if (price >= 1000) return `${(price / 1000).toFixed(0)}K`;
          return price.toLocaleString("id-ID");
        };

        const isFree = price === 0;

        return (
          <div className="flex flex-col items-end gap-1 min-w-[120px]">
            {isFree ? (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-4 py-1.5 text-sm border-0 shadow-sm">
                FREE
              </Badge>
            ) : (
              <>
                <div className="text-right">
                  <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Rp {formatPrice(price)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Rp {price.toLocaleString("id-ID")}
                  </div>
                </div>
              </>
            )}
          </div>
        );
      },
    },

    // Last Updated
    {
      accessorKey: "updatedAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-semibold"
        >
          Last Updated
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.updatedAt);
        return <LastUpdatedDisplay value={date} />;
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-semibold"
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        return <CreatedAtDisplay value={date} />;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const { id } = row.original;
        return (
          <>
            <CourseBatchActionProvider>
              <CourseBatchActions id={id}>
                <Button
                  variant="ghost"
                  className="size-8 p-0 hover:bg-neutral-300 hover:text-primary"
                >
                  <MoreVertical className="size-4" />
                </Button>
              </CourseBatchActions>
            </CourseBatchActionProvider>
          </>
        );
      },
    },
  ];

  return columns;
}
