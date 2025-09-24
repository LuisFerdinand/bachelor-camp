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
import { SocialMediasSection } from "../../../sections/content/social-medias/SocialMediasSection";

export const SocialMediasView = () => {
  return (
    <div className="flex flex-col gap-y-6 pt-2.5">
      <PageHeader
        icon={<Share2 className="size-4 text-primary" />}
        title="Social Medias Management"
        description={`View and manage all socialMedias.`}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Content Management",
          },
          { label: "Social Medias", isCurrent: true },
        ]}
      />
      <SocialMediasSection></SocialMediasSection>
    </div>
  );
};
