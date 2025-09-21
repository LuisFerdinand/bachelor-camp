"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MapPin,
  MoreVertical,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { InferSelectModel } from "drizzle-orm";
import { locations } from "@/db/schema";
import { cn } from "@/lib/utils";
import { LocationActionProvider } from "../LocationContext";
import LocationActions from "./location-actions";

export type Location = InferSelectModel<typeof locations>;

// Helper function to check if location is currently open
function isCurrentlyOpen(hours: any[]): {
  isOpen: boolean;
  status: string;
  nextChange?: string;
} {
  if (!hours || !Array.isArray(hours))
    return { isOpen: false, status: "Unknown" };

  const now = new Date();
  const currentDay = now.toLocaleDateString("en-US", { weekday: "long" });
  const currentTime = now.getHours() * 100 + now.getMinutes(); // Convert to HHMM format

  const todayHours = hours.find((h) => h.day === currentDay.toLowerCase());
  if (!todayHours) return { isOpen: false, status: `Unknown` };
  console.log(todayHours);

  if (todayHours.isClosed) {
    return { isOpen: false, status: "Closed today" };
  }

  // Parse time strings (assuming format like "09:00" or "9:00 AM")
  const parseTime = (timeStr: string) => {
    const cleanTime = timeStr.replace(/[^\d:]/g, "");
    const [hours, minutes] = cleanTime.split(":").map(Number);
    return hours * 100 + (minutes || 0);
  };

  const openTime = parseTime(todayHours.open);
  const closeTime = parseTime(todayHours.close);

  if (currentTime >= openTime && currentTime < closeTime) {
    const closeHour = Math.floor(closeTime / 100);
    const closeMinute = closeTime % 100;
    return {
      isOpen: true,
      status: "Open",
      nextChange: `Closes at ${closeHour}:${closeMinute.toString().padStart(2, "0")}`,
    };
  } else if (currentTime < openTime) {
    const openHour = Math.floor(openTime / 100);
    const openMinute = openTime % 100;
    return {
      isOpen: false,
      status: "Closed",
      nextChange: `Opens at ${openHour}:${openMinute.toString().padStart(2, "0")}`,
    };
  } else {
    return { isOpen: false, status: "Closed" };
  }
}

// Helper function to format hours for display
function formatHoursDisplay(hours: any[]) {
  if (!hours || !Array.isArray(hours)) return null;

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayHours = hours.find((h) => h.day === today);

  return {
    today: todayHours,
    all: hours.map((h) => ({
      ...h,
      dayShort: h.day.slice(0, 3).charAt(0).toUpperCase() + h.day.slice(1, 3),
      isToday: h.day === today,
    })),
  };
}

export function getLocationColumns(): ColumnDef<Location>[] {
  const router = useRouter();
  const pathname = usePathname();

  const columns: ColumnDef<Location>[] = [
    {
      accessorKey: "name",
      header: ({ column }: { column: Column<Location, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3"
        >
          Location Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<Location> }) => {
        const { name, address } = row.original;
        return (
          <div className="flex flex-col min-w-0 max-w-[280px]">
            <span
              className="font-semibold text-sm text-foreground truncate"
              title={name}
            >
              {name}
            </span>
            <span
              className="text-xs text-muted-foreground line-clamp-2 leading-relaxed"
              title={address}
            >
              {address}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "contact",
      header: () => (
        <Button variant="ghost" className="h-8 px-2 lg:px-3">
          Contact Info
        </Button>
      ),
      cell: ({ row }) => {
        const { phone, email, mapsLink } = row.original;
        return (
          <div className="flex flex-col gap-1.5 min-w-0">
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-1.5 text-xs hover:text-blue-600 transition-colors group"
              >
                <Phone className="w-3 h-3 text-muted-foreground group-hover:text-blue-600" />
                <span className="truncate">{phone}</span>
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-1.5 text-xs hover:text-blue-600 transition-colors group"
              >
                <Mail className="w-3 h-3 text-muted-foreground group-hover:text-blue-600" />
                <span className="truncate">{email}</span>
              </a>
            )}
            {mapsLink && (
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 transition-colors group"
              >
                <MapPin className="w-3 h-3" />
                <span>View Map</span>
              </a>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "hours",
      header: () => (
        <Button variant="ghost" className="h-8 px-2 lg:px-3">
          <Clock className="w-4 h-4 mr-1" />
          Hours & Status
        </Button>
      ),
      cell: ({ row }) => {
        const { hours } = row.original;

        const hoursData = formatHoursDisplay(hours);
        const currentStatus = isCurrentlyOpen(hours);

        return (
          <TooltipProvider>
            <div className="flex flex-col gap-2">
              {/* Current Status */}
              <div className="flex items-center gap-2">
                <Badge
                  variant={currentStatus.isOpen ? "default" : "secondary"}
                  className={cn(
                    "text-xs font-medium",
                    currentStatus.isOpen
                      ? "bg-green-100 text-green-700 border-green-200"
                      : "bg-gray-100 text-gray-700 border-gray-200"
                  )}
                >
                  {currentStatus.isOpen ? (
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                  ) : (
                    <XCircle className="w-3 h-3 mr-1" />
                  )}
                  {currentStatus.status}
                </Badge>
              </div>

              {/* Today's Hours */}
              {hoursData?.today && (
                <div className="text-xs text-foreground">
                  <span className="font-medium">Today:</span>{" "}
                  {hoursData.today.isClosed ? (
                    <span className="text-muted-foreground">Closed</span>
                  ) : (
                    <span className="text-muted-foreground">
                      {hoursData.today.open} - {hoursData.today.close}
                    </span>
                  )}
                </div>
              )}

              {/* Next Change Info */}
              {currentStatus.nextChange && (
                <div className="text-xs text-muted-foreground">
                  {currentStatus.nextChange}
                </div>
              )}

              {/* Full Hours Tooltip */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-xs text-blue-600 hover:text-blue-700 flex items-center justify-start"
                  >
                    <Badge variant="secondary" className="text-xs">
                      <Info className="size-2 mr-1" />
                      <p className="leading-none">See Schedule</p>
                    </Badge>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="max-w-48">
                  <div className="space-y-1">
                    <p className="font-semibold text-sm">Weekly Hours</p>
                    {hoursData?.all.map((h) => (
                      <div
                        key={h.day}
                        className={cn(
                          "flex justify-between gap-3 text-xs",
                          h.isToday && "font-semibold text-blue-600"
                        )}
                      >
                        <span>{h.dayShort}</span>
                        <span>
                          {h.isClosed ? "Closed" : `${h.open} - ${h.close}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        );
      },
    },
    {
      accessorKey: "isActive",
      header: () => (
        <Button variant="ghost" className="h-8 px-2 lg:px-3">
          Account Status
        </Button>
      ),
      cell: ({ row }) => {
        const { isActive } = row.original;
        const active = isActive === "true";

        return (
          <Badge
            variant={active ? "default" : "secondary"}
            className={cn(
              "text-xs font-medium",
              active
                ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                : "bg-red-100 text-red-700 border-red-200"
            )}
          >
            {active ? (
              <CheckCircle2 className="w-3 h-3 mr-1" />
            ) : (
              <XCircle className="w-3 h-3 mr-1" />
            )}
            {active ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3"
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt!);
        const isRecent = Date.now() - date.getTime() < 7 * 24 * 60 * 60 * 1000; // 7 days

        return (
          <div className="flex flex-col text-xs">
            <span className={cn("font-medium", isRecent && "text-green-600")}>
              {date.toLocaleDateString()}
            </span>
            <span className="text-muted-foreground">
              {date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {isRecent && (
              <Badge
                variant="outline"
                className="w-fit mt-1 text-[10px] px-1 py-0"
              >
                New
              </Badge>
            )}
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
          className="h-8 px-2 lg:px-3"
        >
          Last Updated
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.updatedAt!);
        const now = Date.now();
        const diffMs = now - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        let timeAgo = "";
        if (diffDays === 0) {
          const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
          timeAgo = diffHours === 0 ? "Just now" : `${diffHours}h ago`;
        } else if (diffDays < 7) {
          timeAgo = `${diffDays}d ago`;
        } else {
          timeAgo = `${Math.floor(diffDays / 7)}w ago`;
        }

        return (
          <div className="flex flex-col text-xs">
            <span className="font-medium">{date.toLocaleDateString()}</span>
            <span className="text-muted-foreground">
              {date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span className="text-muted-foreground text-[10px] mt-0.5">
              {timeAgo}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const { id, isActive } = row.original;
        return (
          <>
            <LocationActionProvider>
              <LocationActions id={id} isActive={isActive!}>
                <Button
                  variant="ghost"
                  className="size-8 p-0 hover:bg-neutral-300 hover:text-primary"
                >
                  <MoreVertical className="size-4" />
                </Button>
              </LocationActions>
            </LocationActionProvider>
          </>
        );
      },
    },
  ];

  return columns;
}
