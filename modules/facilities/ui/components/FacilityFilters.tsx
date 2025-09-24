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
  FACILITY_CATEGORIES,
  FACILITY_STATUSES,
  FACILITY_TYPES,
  FacilityCategory,
  FacilityStatus,
  FacilityType,
  PageType,
} from "@/db/schema/enums";
import { useFacilityFilters } from "../../hooks/use-facility-filters";

export const FacilityFilters = () => {
  const featuredOptions = [
    { label: "Featured", value: "true" },
    { label: "Not Featured", value: "false" },
  ];
  const statusOptions = FACILITY_STATUSES.map((s) => ({
    label: s.charAt(0).toUpperCase() + s.slice(1),
    value: s,
  }));
  const typeOptions = FACILITY_TYPES.map((s) => ({
    label: s.charAt(0).toUpperCase() + s.slice(1),
    value: s,
  }));
  const categoryOptions = FACILITY_CATEGORIES.map((s) => ({
    label: s.charAt(0).toUpperCase() + s.slice(1),
    value: s,
  }));

  const [{ status, featured, type, category }, setFilters] =
    useFacilityFilters();

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
        <Select
          defaultValue={type ?? "all"}
          onValueChange={(value) =>
            setFilters({
              type: value === "all" ? null : (value as FacilityType),
            })
          }
        >
          <SelectTrigger className={triggerClass(isActive(type))}>
            <div className="flex items-center pr-2 leading-none">
              <LayersIcon className="size-4 mr-2" />
              <SelectValue className="leading-none" placeholder="All Types" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tyes</SelectItem>
            <SelectSeparator />
            {typeOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
              status: value === "all" ? null : (value as FacilityStatus),
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
          icon={<NotebookIcon className="size-4 mr-2" />}
          value={category ?? "all"}
          onChange={(value) => {
            setFilters({
              category: value === "all" ? null : (value as FacilityCategory),
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
      </div>
    </>
  );
};
