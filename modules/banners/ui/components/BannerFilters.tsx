"use client";

import React from "react";
import { z } from "zod";
import { trpc } from "@/trpc/client";
import { Combobox } from "@/components/ui/combobox";
import {
  BoxesIcon,
  LayersIcon,
  Package2Icon,
  StarIcon,
  StoreIcon,
  TagIcon,
  ToggleLeftIcon,
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
    { label: "Home", value: "home" },
    { label: "About", value: "about" },
    { label: "Camp", value: "camp" },
    { label: "Programs", value: "programs" },
    { label: "Tests", value: "tests" },
    { label: "Blog", value: "blog" },
    { label: "Contact", value: "contact" },
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

        <Select
          defaultValue={type ?? "all"}
          onValueChange={(value) =>
            setFilters({
              type: value === "all" ? null : (value as PageType),
            })
          }
        >
          <SelectTrigger className={triggerClass(isActive(type))}>
            <div className="flex items-center pr-2 leading-none">
              <BoxesIcon className="size-4 mr-2" />
              <SelectValue className="leading-none" placeholder="All Page" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Pages</SelectItem>
            <SelectSeparator />
            {pageOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Combobox
          icon={<span className="size-4 mr-1">⚖️</span>}
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
