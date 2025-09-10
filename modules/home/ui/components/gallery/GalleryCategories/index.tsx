// modules/home/ui/components/gallery/GalleryCategories/index.tsx
"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GalleryCategoryCard } from "../GalleryCategoryCard";

interface GalleryCategory {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  images: Array<{
    src: string;
    alt: string;
  }>;
}

interface GalleryCategoriesProps {
  categories: GalleryCategory[];
}

export function GalleryCategories({ categories }: GalleryCategoriesProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="bg-brand-100 text-brand-800 mb-4">
            Campus Life
          </Badge>
          <h2 className="text-display-sm md:text-display-md font-bold mb-4">
            Explore Our Gallery
          </h2>
          <p className="text-lg text-neutral-600">
            Browse through our collection of photos showcasing different aspects
            of student life at our campus.
          </p>
        </div>
        <div className="space-y-20">
          {categories.map((category) => (
            <GalleryCategoryCard
              key={category.id}
              id={category.id}
              title={category.title}
              description={category.description}
              images={category.images}
              icon={category.icon}
            />
          ))}
        </div>
        {/* Back to Top Button */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="bg-brand-500 hover:bg-brand-600 shadow-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to Top
          </Button>
        </div>
      </div>
    </section>
  );
}
