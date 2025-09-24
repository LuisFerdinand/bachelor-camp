"use client";

import React from "react";
import { z } from "zod";
import { trpc } from "@/trpc/client";
import { Combobox } from "@/components/ui/combobox";
import { LayoutGridIcon, EyeIcon, StarIcon, UsersIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";
import { BooleanType } from "@/db/schema/enums";
import { useFAQFilters } from "../../hooks/use-faq-filters";

export const FAQFilters = () => {
  const { data: categories, isLoading: isLoadingCategories } =
    trpc.faqs.getAllCategories.useQuery();

  // --- Active (Active/Inactive on UI) ---
  const activeOptions = [
    { label: "Active", value: "true" },
    { label: "Hidden", value: "false" },
  ];

  // --- Categories (from DB) ---
  // Example transformation when you fetch them:
  const categoryOptions =
    categories?.map((c) => ({
      label: c.name,
      value: c.slug,
    })) ?? [];

  const [{ category, status }, setFilters] = useFAQFilters();

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
              <EyeIcon className="size-4 mr-2" />{" "}
              <SelectValue
                className="leading-none"
                placeholder="All Visibility"
              />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Visibility</SelectItem>
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
          value={category ?? "all"}
          onChange={(value) => {
            setFilters({
              category: value === "all" ? null : value,
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
