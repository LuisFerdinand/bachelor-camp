"use client";

import React from "react";
import { z } from "zod";
import { trpc } from "@/trpc/client";
import { Combobox } from "@/components/ui/combobox";
import {
  HomeIcon,
  InfoIcon,
  TentIcon,
  LayersIcon,
  FileCheckIcon,
  NotebookIcon,
  MailIcon,
  ToggleLeftIcon,
  LayoutGridIcon,
  StarIcon,
  Building2Icon,
  BookOpen,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";

import {
  BooleanType,
  COURSE_BATCH_STATUSES,
  COURSE_CATEGORIES,
  COURSE_LEVELS,
  CourseBatchStatus,
  CourseCategory,
  CourseLevel,
  DELIVERY_MODES,
  DeliveryMode,
} from "@/db/schema/enums";
import { useCourseBatchFilters } from "../../hooks/use-course-batch-filters";
import { Input } from "@/components/ui/input";

export const CourseBatchFilters = () => {
  const { data: courseList = [], isLoading: isLoaadingCourseList } =
    trpc.courses.getMany.useQuery();

  const featuredOptions = [
    { label: "Featured", value: "true" },
    { label: "Not Featured", value: "false" },
  ];

  const statusOptions = COURSE_BATCH_STATUSES.map((s) => ({
    label: s.charAt(0).toUpperCase() + s.slice(1),
    value: s,
  }));
  const deliveryOptions = DELIVERY_MODES.map((s) => ({
    label: s.charAt(0).toUpperCase() + s.slice(1),
    value: s,
  }));
  const levelOptions = COURSE_LEVELS.map((s) => ({
    label: s.charAt(0).toUpperCase() + s.slice(1),
    value: s,
  }));
  const categoryOptions = COURSE_CATEGORIES.map((s) => ({
    label: s.charAt(0).toUpperCase() + s.slice(1),
    value: s,
  }));

  const [
    {
      courseId,
      status,
      deliveryMode,
      category,
      level,
      startDateFrom,
      startDateTo,
      isFeatured,
    },
    setFilters,
  ] = useCourseBatchFilters();

  const isActive = (value: string | null | undefined) =>
    typeof value === "string" && value !== "all";

  const triggerClass = (active: boolean) =>
    clsx(
      "w-full lg:w-auto h-8 transition",
      active && "bg-muted text-primary border-primary ring-1 ring-primary/40"
    );

  const hasActiveFilters = !!(
    courseId ||
    status ||
    deliveryMode ||
    category ||
    level ||
    startDateFrom ||
    startDateTo ||
    isFeatured
  );

  return (
    <>
      <div className="flex flex-wrap gap-2 w-full">
        <Combobox
          icon={<BookOpen className="size-4 mr-2" />}
          value={courseId ?? "all"}
          onChange={(value) => {
            setFilters({
              courseId: value === "all" ? null : value,
            });
          }}
          placeholder="All Courses"
          options={[
            { label: "All Courses", value: "all" },
            ...courseList.map((u) => ({
              label: u.title,
              value: u.id,
            })),
          ]}
        />
        <Combobox
          icon={<LayersIcon className="size-4 mr-2" />}
          value={category ?? "all"}
          onChange={(value) => {
            setFilters({
              category: value === "all" ? null : (value as CourseCategory),
            });
          }}
          placeholder="All Categories"
          options={[
            { label: "All Categories", value: "all" },
            ...categoryOptions.map((u) => ({
              label: u.label,
              value: u.value,
            })),
          ]}
        />
        <Combobox
          icon={<ToggleLeftIcon className="size-4 mr-2" />}
          value={level ?? "all"}
          onChange={(value) => {
            setFilters({
              level: value === "all" ? null : (value as CourseLevel),
            });
          }}
          placeholder="All Levels"
          options={[
            { label: "All Levels", value: "all" },
            ...levelOptions.map((u) => ({
              label: u.label,
              value: u.value,
            })),
          ]}
        />
        <Select
          defaultValue={isFeatured ?? "all"}
          onValueChange={(value) =>
            setFilters({
              isFeatured: value === "all" ? null : (value as BooleanType),
            })
          }
        >
          <SelectTrigger className={triggerClass(isActive(isFeatured))}>
            <div className="flex items-center pr-2 leading-none">
              <StarIcon className="size-4 mr-2" />
              <SelectValue className="leading-none" placeholder="Show All" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Show All</SelectItem>
            <SelectSeparator />
            {featuredOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          defaultValue={status ?? "all"}
          onValueChange={(value) =>
            setFilters({
              status: value === "all" ? null : (value as CourseBatchStatus),
            })
          }
        >
          <SelectTrigger className={triggerClass(isActive(status))}>
            <div className="flex items-center pr-2 leading-none">
              <FileCheckIcon className="size-4 mr-2" />
              <SelectValue
                className="leading-none"
                placeholder="All Statuses"
              />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectSeparator />
            {statusOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          defaultValue={deliveryMode ?? "all"}
          onValueChange={(value) =>
            setFilters({
              deliveryMode: value === "all" ? null : (value as DeliveryMode),
            })
          }
        >
          <SelectTrigger className={triggerClass(isActive(deliveryMode))}>
            <div className="flex items-center pr-2 leading-none">
              <InfoIcon className="size-4 mr-2" />
              <SelectValue className="leading-none" placeholder="All Modes" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Modes</SelectItem>
            <SelectSeparator />
            {deliveryOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          <Input
            type="date"
            placeholder="Start date from"
            className="h-8 w-[140px] text-xs"
            value={startDateFrom || ""}
            onChange={(e) =>
              setFilters({
                startDateFrom: e.target.value || undefined,
              })
            }
          />
          <span className="text-xs text-muted-foreground">to</span>
          <Input
            type="date"
            placeholder="Start date to"
            className="h-8 w-[140px] text-xs"
            value={startDateTo || ""}
            onChange={(e) =>
              setFilters({
                startDateTo: e.target.value || undefined,
              })
            }
          />
        </div>

        {hasActiveFilters && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-gray-50 px-3 py-2 rounded-lg">
            <span>Active filters:</span>
            <div className="flex items-center gap-2">
              {status && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                  Status: {status}
                </span>
              )}
              {deliveryMode && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                  Mode: {deliveryMode}
                </span>
              )}
              {category && (
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                  Category: {category}
                </span>
              )}
              {(startDateFrom || startDateTo) && (
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
                  Date range
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
