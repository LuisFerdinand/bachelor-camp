"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { PackageIcon, PlusIcon } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { trpc } from "@/trpc/client";
import { BannersSection } from "../../sections/home/BannersSection";
import { CreatedBannerModal } from "@/modules/banners/ui/components/CreateBannerModal";

export const BannersView = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-y-6 pt-2.5">
      <CreatedBannerModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
      <PageHeader
        icon={<PackageIcon className="size-4 text-primary" />}
        title="Banners Management"
        description={`View and manage all banners.`}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Home Management",
          },
          { label: "Banners", isCurrent: true },
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
      <BannersSection></BannersSection>
    </div>
  );
};
