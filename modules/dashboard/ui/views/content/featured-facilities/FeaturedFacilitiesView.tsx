"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Award,
  Building2,
  ImageIcon,
  PackageIcon,
  PlusIcon,
} from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { trpc } from "@/trpc/client";
import { FeaturedFacilitiesSection } from "../../../sections/content/featured-facilities/FeaturedFacilitiesSection";

export const FeaturedFacilitiesView = () => {
  return (
    <div className="flex flex-col gap-y-6 pt-2.5">
      <PageHeader
        icon={<Building2 className="size-4 text-primary" />}
        title="Featured Facilities Management"
        description={`View and manage all featuredFacilities.`}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Content Management",
          },
          { label: "Featured Facilities", isCurrent: true },
        ]}
      />
      {/* <FeaturedFacilitiesSection></FeaturedFacilitiesSection> */}
    </div>
  );
};
