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
import {
  BooleanType,
  PageType,
  TESTIMONIAL_SOURCES,
  TestimonialSource,
} from "@/db/schema/enums";
import { useTestimonialFilters } from "../../hooks/use-testimonial-filters";

export const TestimonialFilters = () => {
  const { data: categories, isLoading: isLoadingCategories } =
    trpc.testimonials.getAllCategories.useQuery();

  // --- Sources ---
  const sourceOptions = TESTIMONIAL_SOURCES.map((s) => ({
    label: s.charAt(0).toUpperCase() + s.slice(1), // capitalize
    value: s,
  }));

  // --- Featured ---
  const featuredOptions = [
    { label: "Featured", value: "true" },
    { label: "Not Featured", value: "false" },
  ];

  // --- Shown (Active/Inactive on UI) ---
  const shownOptions = [
    { label: "Shown", value: "true" },
    { label: "Hidden", value: "false" },
  ];

  // --- Categories (from DB) ---
  // Example transformation when you fetch them:
  const categoryOptions =
    categories?.map((c) => ({
      label: c.name,
      value: c.slug,
    })) ?? [];

  const [{ category, source, isFeatured, isShown }, setFilters] =
    useTestimonialFilters();

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
          defaultValue={isFeatured ?? "all"}
          onValueChange={(value) =>
            setFilters({
              isFeatured: value === "all" ? null : (value as BooleanType),
            })
          }
        >
          <SelectTrigger className={triggerClass(isActive(isFeatured))}>
            <div className="flex items-center pr-2 leading-none">
              <StarIcon className="size-4 mr-2" />{" "}
              <SelectValue
                className="leading-none"
                placeholder="All Featured"
              />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Featured</SelectItem>
            <SelectSeparator />
            {featuredOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          defaultValue={isShown ?? "all"}
          onValueChange={(value) =>
            setFilters({
              isShown: value === "all" ? null : (value as BooleanType),
            })
          }
        >
          <SelectTrigger className={triggerClass(isActive(isShown))}>
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
            {shownOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          defaultValue={source ?? "all"}
          onValueChange={(value) =>
            setFilters({
              source: value === "all" ? null : (value as TestimonialSource),
            })
          }
        >
          <SelectTrigger className={triggerClass(isActive(source))}>
            <div className="flex items-center pr-2 leading-none">
              <UsersIcon className="size-4 mr-2" />{" "}
              <SelectValue className="leading-none" placeholder="All Sources" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectSeparator />
            {sourceOptions.map((opt) => (
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
