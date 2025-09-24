"use client";
import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wifi, Utensils, Dumbbell, Coffee, Globe, Home } from "lucide-react";
import {
  FACILITIES_FALLBACKS,
  ICON_URL_FALLBACK,
  PRODUCT_IMAGE_FALLBACK,
} from "@/constants";
import { trpc } from "@/trpc/client";
import { ReactSVG } from "react-svg";

export function CampusFacilitiesSection() {
  const { data: facilities, isLoading: isLoadingFacilites } =
    trpc.facilities.getFeatured.useQuery();

  if (isLoadingFacilites) {
    return <>Loading</>;
  }

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
          {facilities?.map((facility, index) => {
            return (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={facility.imageUrl || PRODUCT_IMAGE_FALLBACK}
                    alt={facility.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="flex items-center space-x-3 p-4">
                      <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        {/* <div className="w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0 mt-1"> */}
                        <ReactSVG
                          src={facility.iconUrl || ICON_URL_FALLBACK}
                          beforeInjection={(svg) => {
                            svg.setAttribute("class", "h-5 w-5 text-white");
                          }}
                          className="flex items-center justify-center"
                        />
                        {/* </div> */}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">
                          {facility.name}
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
