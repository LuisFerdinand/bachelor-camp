"use client";
import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wifi, Utensils, Dumbbell, Coffee, Globe, Home } from "lucide-react";
import { FACILITIES_FALLBACKS } from "@/constants";

export function CampusFacilitiesSection() {
  const facilities = [
    {
      icon: Home,
      title: "Luxury Dormitories",
      description: "Air-conditioned rooms with modern amenities",
      image: FACILITIES_FALLBACKS["luxuryDorm"],
    },
    {
      icon: Wifi,
      title: "High-Speed Internet",
      description: "24/7 WiFi access throughout campus",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      icon: Utensils,
      title: "International Cuisine",
      description: "Diverse dining options and healthy meals",
      image: FACILITIES_FALLBACKS["interFood"],
    },
    {
      icon: Dumbbell,
      title: "Fitness Center",
      description: "Modern gym and sports facilities",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      icon: Coffee,
      title: "Study Lounges",
      description: "Comfortable spaces for group study",
      image: FACILITIES_FALLBACKS["studyRoom"],
    },
    {
      icon: Globe,
      title: "Cultural Center",
      description: "International community activities",
      image: FACILITIES_FALLBACKS["culturalCenter"],
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="bg-brand-100 text-brand-800 mb-4">
            World-Class Facilities
          </Badge>
          <h2 className="text-display-sm md:text-display-md font-bold mb-4">
            Everything You Need for Success
          </h2>
          <p className="text-lg text-neutral-600">
            Our comprehensive facilities ensure you have everything needed for
            an optimal learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility, index) => {
            const IconComponent = facility.icon;
            return (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="flex items-center space-x-3 p-4">
                      <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">
                          {facility.title}
                        </h3>
                        <p className="text-white/80 text-sm">
                          {facility.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
