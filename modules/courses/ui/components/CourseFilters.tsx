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
import { useCourseFilters } from "../../hooks/use-course-filters";
import {
  BooleanType,
  COURSE_CATEGORIES,
  COURSE_LEVELS,
  CourseCategory,
  CourseLevel,
} from "@/db/schema/enums";

export const CourseFilters = () => {
  const featuredOptions = [
    { label: "Featured", value: "true" },
    { label: "Not Featured", value: "false" },
  ];
  const statusOptions = [
    { label: "Active", value: "true" },
    { label: "Inactive", value: "false" },
  ];
  const categoryOptions = COURSE_CATEGORIES.map((s) => ({
    label: s.charAt(0).toUpperCase() + s.slice(1),
    value: s,
  }));
  const levelOptions = COURSE_LEVELS.map((s) => ({
    label: s.charAt(0).toUpperCase() + s.slice(1),
    value: s,
  }));
  const { data: buildingList = [], isLoading: isLoadingBuildingList } =
    trpc.buildings.getMany.useQuery();

  const [{ status, featured, level, category, buildingId }, setFilters] =
    useCourseFilters();

  const isActive = (value: string | null | undefined) =>
    typeof value === "string" && value !== "all";

  const triggerClass = (active: boolean) =>
    clsx(
      "w-full lg:w-auto h-8 transition",
      active && "bg-muted text-primary border-primary ring-1 ring-primary/40"
    );

  return (
    <>
      <div className="flex flex-wrap gap-2 w-full">
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
          defaultValue={featured ?? "all"}
          onValueChange={(value) =>
            setFilters({
              featured: value === "all" ? null : (value as BooleanType),
            })
          }
        >
          <SelectTrigger className={triggerClass(isActive(featured))}>
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
              status: value === "all" ? null : (value as BooleanType),
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

        <Combobox
          icon={<Building2Icon className="size-4 mr-2" />}
          value={buildingId ?? "all"}
          onChange={(value) => {
            setFilters({
              buildingId: value === "all" ? null : value,
            });
          }}
          placeholder="All Buildings"
          options={[
            { label: "All Buildings", value: "all" },
            ...buildingList.map((u) => ({
              label: u.name,
              value: u.id,
            })),
          ]}
        />
      </div>
    </>
  );
};
