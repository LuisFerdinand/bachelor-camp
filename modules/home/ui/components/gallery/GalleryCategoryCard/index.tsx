"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Camera } from "lucide-react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryCategoryProps {
  id: number;
  title: string;
  description: string;
  images: GalleryImage[];
  icon: React.ComponentType<any>;
}

export function GalleryCategoryCard({
  id,
  title,
  description,
  images,
  icon: IconComponent,
}: GalleryCategoryProps) {
  return (
    <div className="scroll-mt-24" id={`category-${id}`}>
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 rounded-lg bg-brand-100 flex items-center justify-center mr-4">
          <IconComponent className="h-6 w-6 text-brand-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-neutral-900">{title}</h3>
          <p className="text-neutral-600">{description}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <Card
            key={index}
            className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <Camera className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
