"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";

interface GalleryImage {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

interface GallerySliderProps {
  gallery: GalleryImage[];
}

export function GallerySlider({ gallery }: GallerySliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + gallery.length) % gallery.length
    );
  };

  return (
    <div>
      <div className="relative rounded-2xl overflow-hidden shadow-xl h-96">
        <Image
          src={gallery[currentImageIndex].image}
          alt={gallery[currentImageIndex].imageAlt}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl font-bold mb-1">
            {gallery[currentImageIndex].title}
          </h3>
          <p className="text-sm text-white/80">
            {gallery[currentImageIndex].description}
          </p>
        </div>
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {gallery.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? "bg-white w-6" : "bg-white/50"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
        {gallery.map((image, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden shadow-md h-24 cursor-pointer"
            onClick={() => setCurrentImageIndex(index)}
          >
            <Image
              src={image.image}
              alt={image.imageAlt}
              fill
              className="object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Camera className="h-6 w-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
