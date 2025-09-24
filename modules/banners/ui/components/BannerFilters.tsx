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
import { BooleanType, PageType } from "@/db/schema/enums";
import { useBannerFilters } from "../../hooks/use-banner-filters";

export const BannerFilters = () => {
  const activeOptions = [
    { label: "Active", value: "true" },
    { label: "Inactive", value: "false" },
  ];

  const pageOptions = [
    { label: "Home", value: "Home", icon: HomeIcon },
    { label: "About", value: "About", icon: InfoIcon },
    { label: "Camp", value: "Camp", icon: TentIcon },
    { label: "Programs", value: "Programs", icon: LayersIcon },
    { label: "Tests", value: "Tests", icon: FileCheckIcon },
    { label: "Blog", value: "Blog", icon: NotebookIcon },
    { label: "Contact", value: "Contact", icon: MailIcon },
  ];

  const [{ type, status }, setFilters] = useBannerFilters();

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
          defaultValue={status ?? "all"}
          onValueChange={(value) =>
            setFilters({
              status: value === "all" ? null : (value as BooleanType),
            })
          }
        >
          <SelectTrigger className={triggerClass(isActive(status))}>
            <div className="flex items-center pr-2 leading-none">
              <ToggleLeftIcon className="size-4 mr-2" />
              <SelectValue
                className="leading-none"
                placeholder="All Statuses"
              />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectSeparator />
            {activeOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Combobox
          icon={<LayoutGridIcon className="size-4 mr-2" />}
          value={type ?? "all"}
          onChange={(value) => {
            setFilters({
              type: value === "all" ? null : (value as PageType),
            });
          }}
          placeholder="All Page"
          options={[
            { label: "All Pages", value: "all" },
            ...pageOptions.map((u) => ({
              label: u.label,
              value: u.value,
            })),
          ]}
        />
      </div>
    </>
  );
};
