"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  getBuildingBySlug,
  getRelatedBuildings,
} from "@/app/util/buildingData";
import { BuildingDetail } from "@/modules/home/ui/components/camp/BuildingDetail";
import { GallerySlider } from "@/modules/home/ui/components/camp/GallerySlider";
import { RelatedBuildings } from "@/modules/home/ui/components/camp/RelatedBuildings";

interface BuildingDetailPageProps {
  params: {
    slug: string;
  };
}

export default function BuildingDetailPage({
  params,
}: BuildingDetailPageProps) {
  // Find the building based on the slug
  const building = getBuildingBySlug(params.slug);

  // Early return if building not found
  if (!building) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Building Not Found</h1>
          <p className="mb-6">
            The building you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/camp">
            <button className="px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600">
              Back to Camp
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Get related buildings
  const relatedBuildings = getRelatedBuildings(building.id, 2);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        {/* Hero Section with Building Image */}
        <section className="relative h-96">
          <Image
            src={building.image}
            alt={building.imageAlt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <div className="max-w-3xl">
                <div className="flex items-center mb-4">
                  <Link
                    href="/camp"
                    className="inline-flex items-center text-white hover:text-gray-200"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Camp
                  </Link>
                </div>
                <Badge
                  className={`${building.badgeColor} text-white border-0 mb-4 inline-block`}
                >
                  {building.badge}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {building.name}
                </h1>
                <p className="text-lg text-white/90 max-w-2xl">
                  {building.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Building Details */}
        <section className="py-16 bg-gradient-to-br from-neutral-50 to-brand-50/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <BuildingDetail building={building} />
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-display-sm font-bold mb-8">Photo Gallery</h2>
              <GallerySlider gallery={building.gallery} />
            </div>
          </div>
        </section>

        {/* Related Buildings Section */}
        <RelatedBuildings buildings={relatedBuildings} />
      </main>
    </div>
  );
}
