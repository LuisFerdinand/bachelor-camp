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
import { FeaturedFacilitiesSection } from "../../../sections/content/featuredFacilities/FeaturedFacilitiesSection";
import { CreateFeaturedFacilitieModal } from "@/modules/featuredFacilities/ui/components/CreateFeaturedFacilitieModal";

export const FeaturedFacilitiesView = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-y-6 pt-2.5">
      <CreateFeaturedFacilitieModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
      <PageHeader
        icon={<Building2 className="size-4 text-primary" />}
        title="Featured Facilities Management"
        description={`View and manage all featuredFacilities.`}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Content Management",
          },
          { label: "FeaturedFacilities", isCurrent: true },
        ]}
        action={
          <Button
            variant="default"
            onClick={() => setCreateModalOpen(true)}
            className="flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Create</span>
          </Button>
        }
      />
      <FeaturedFacilitiesSection></FeaturedFacilitiesSection>
    </div>
  );
};
