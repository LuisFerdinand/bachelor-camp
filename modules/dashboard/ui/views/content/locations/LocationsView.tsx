"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Award,
  Building2,
  ImageIcon,
  MapPin,
  PackageIcon,
  PlusIcon,
  Sparkles,
} from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { trpc } from "@/trpc/client";
import { LocationsSection } from "../../../sections/content/locations/LocationsSection";
import { CreateLocationModal } from "@/modules/locations/ui/components/CreateLocationModal";

export const LocationsView = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-y-6 pt-2.5">
      <CreateLocationModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
      <PageHeader
        icon={<MapPin className="size-4 text-primary" />}
        title="Locations Management"
        description={`View and manage all locations.`}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Content Management",
          },
          { label: "Locations", isCurrent: true },
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
      <LocationsSection></LocationsSection>
    </div>
  );
};
