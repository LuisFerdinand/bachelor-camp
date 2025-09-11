"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Award,
  Building2,
  Flag,
  ImageIcon,
  MapPin,
  PackageIcon,
  PlusIcon,
  Quote,
  Share2,
  Sparkles,
} from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { trpc } from "@/trpc/client";
import { SocialMediasSection } from "../../../sections/content/socialMedias/SocialMediasSection";
import { CreateSocialMediaModal } from "@/modules/socialMedias/ui/components/CreateSocialMediaModal";

export const SocialMediasView = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-y-6 pt-2.5">
      <CreateSocialMediaModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
      <PageHeader
        icon={<Share2 className="size-4 text-primary" />}
        title="Social Medias Management"
        description={`View and manage all socialMedias.`}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Content Management",
          },
          { label: "SocialMedias", isCurrent: true },
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
      <SocialMediasSection></SocialMediasSection>
    </div>
  );
};
