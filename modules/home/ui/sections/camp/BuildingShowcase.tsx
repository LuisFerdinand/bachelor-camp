"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
  Shield,
  Star,
} from "lucide-react";

interface BuildingSliderImage {
  image: string;
  title: string;
  description: string;
}

interface BuildingShowcaseProps {
  buildingSliderImages: BuildingSliderImage[];
}

export function BuildingShowcase({
  buildingSliderImages,
}: BuildingShowcaseProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % buildingSliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + buildingSliderImages.length) % buildingSliderImages.length
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 to-brand-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-display-sm md:text-display-md font-bold mb-6 text-neutral-900">
            Modern Student <br />
            <span className="text-brand-600 relative">
              Accommodation
              <div className="absolute -bottom-3 left-0 right-0 h-3 bg-brand-100 -rotate-1 rounded-full opacity-70"></div>
            </span>
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Three modern buildings designed specifically for student comfort
            with complete amenities and flexible pricing options.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image Slider */}
          <div className="rounded-2xl overflow-hidden shadow-xl relative h-96">
            <div className="relative h-full">
              <Image
                src={buildingSliderImages[currentSlide].image}
                alt={buildingSliderImages[currentSlide].title}
                fill
                className="object-cover transition-opacity duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={(e) => {
                  console.error(
                    "Failed to load building image:",
                    buildingSliderImages[currentSlide].image
                  );
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              {/* Facility Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-1">
                  {buildingSliderImages[currentSlide].title}
                </h3>
                <p className="text-sm text-white/80">
                  {buildingSliderImages[currentSlide].description}
                </p>
              </div>
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {buildingSliderImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide ? "bg-white w-6" : "bg-white/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Content */}
          <div className="space-y-6">
            <h3 className="text-display-sm font-bold text-neutral-900">
              Student Living Made Easy
            </h3>
            <p className="text-neutral-600 leading-relaxed text-lg">
              Our accommodation buildings feature modern amenities with complete
              facilities including air conditioning, professional laundry
              services, weekly housekeeping, and round-the-clock security for
              your comfort and peace of mind.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center p-3 rounded-lg bg-white shadow-sm border border-brand-100">
                <MapPin className="h-6 w-6 text-brand-500 mr-3 flex-shrink-0" />
                <span className="font-medium text-neutral-700">
                  Strategic Location
                </span>
              </div>
              <div className="flex items-center p-3 rounded-lg bg-white shadow-sm border border-accent-100">
                <Users className="h-6 w-6 text-accent-500 mr-3 flex-shrink-0" />
                <span className="font-medium text-neutral-700">
                  Student Community
                </span>
              </div>
              <div className="flex items-center p-3 rounded-lg bg-white shadow-sm border border-success-100">
                <Shield className="h-6 w-6 text-success-500 mr-3 flex-shrink-0" />
                <span className="font-medium text-neutral-700">
                  24/7 Security
                </span>
              </div>
              <div className="flex items-center p-3 rounded-lg bg-white shadow-sm border border-warning-100">
                <Star className="h-6 w-6 text-warning-500 mr-3 flex-shrink-0" />
                <span className="font-medium text-neutral-700">
                  Complete Facilities
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
