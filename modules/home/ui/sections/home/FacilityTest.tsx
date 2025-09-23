"use client";
import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FACILITIES_FALLBACKS,
  ICON_URL_FALLBACK,
  PRODUCT_IMAGE_FALLBACK,
} from "@/constants";
import { trpc } from "@/trpc/client";
import { ReactSVG } from "react-svg";

// Skeleton Components for Loading State
const SkeletonCard = () => (
  <Card className="border-0 shadow-lg overflow-hidden">
    <div className="relative h-48 bg-gray-200 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex items-end">
        <div className="flex items-center space-x-3 p-6 w-full">
          <div className="w-12 h-12 rounded-xl bg-white/30 animate-pulse" />
          <div className="flex-1">
            <div className="h-5 bg-white/40 rounded mb-2 w-3/4 animate-pulse" />
            <div className="h-4 bg-white/30 rounded w-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  </Card>
);

const LoadingState = () => (
  <section className="py-20 bg-gradient-to-b from-neutral-50 via-white to-neutral-50/50">
    <div className="container mx-auto px-4">
      {/* Header Skeleton */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="h-8 bg-gray-200 rounded-full w-48 mx-auto mb-6 animate-pulse" />
        <div className="h-12 bg-gray-200 rounded w-full max-w-2xl mx-auto mb-6 animate-pulse" />
        <div className="space-y-3">
          <div className="h-6 bg-gray-200 rounded w-full animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto animate-pulse" />
        </div>
      </div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  </section>
);

export function CampusFacilitiesSection2() {
  const { data: facilities, isLoading: isLoadingFacilities } =
    trpc.facilities.getFeatured.useQuery();

  if (isLoadingFacilities) {
    return <LoadingState />;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-neutral-50 via-white to-neutral-50/50 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Enhanced Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="relative inline-block">
            <Badge className="bg-brand-100 text-brand-800 hover:bg-brand-200 transition-colors duration-300 mb-6 px-6 py-2 text-sm font-semibold shadow-sm">
              <span className="relative z-10">🏆 World-Class Facilities</span>
            </Badge>
          </div>

          <h2 className="text-display-sm md:text-display-lg font-bold mb-6 text-neutral-900 leading-tight">
            Everything You Need for{" "}
            <span className="text-brand-600 relative">
              Success
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-brand-100 -rotate-1 rounded-full opacity-60"></div>
            </span>
          </h2>

          <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Our comprehensive facilities ensure you have everything needed for
            an optimal learning experience in a modern, inspiring environment.
          </p>
        </div>

        {/* Enhanced Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities?.map((facility, index) => (
            <Card
              key={facility.id}
              className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group bg-white/80 backdrop-blur-sm hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                {/* Enhanced Image with Multiple Fallback Layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-brand-600/30"></div>

                <Image
                  src={facility.imageUrl || PRODUCT_IMAGE_FALLBACK}
                  alt={facility.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                  quality={90}
                  priority={index < 3} // Prioritize first 3 images
                />

                {/* Enhanced Overlay with Better Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Animated Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-0 -left-full h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-[shine_2s_ease-in-out] group-hover:animate-[shine_2s_ease-in-out]" />
                </div>

                {/* Enhanced Content Area */}
                <div className="absolute inset-0 flex items-end">
                  <div className="flex items-start space-x-4 p-6 w-full transform group-hover:translate-y-0 transition-transform duration-300">
                    {/* Enhanced Icon Container */}
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <ReactSVG
                        src={facility.iconUrl || ICON_URL_FALLBACK}
                        beforeInjection={(svg) => {
                          svg.setAttribute(
                            "class",
                            "h-6 w-6 text-white drop-shadow-sm"
                          );
                        }}
                        className="flex items-center justify-center"
                        // fallback={
                        //   <div className="w-6 h-6 rounded-full bg-white/40 animate-pulse" />
                        // }
                      />
                    </div>

                    {/* Enhanced Text Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-lg mb-2 drop-shadow-sm group-hover:text-brand-100 transition-colors duration-300">
                        {facility.name}
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed line-clamp-2 drop-shadow-sm group-hover:text-white transition-colors duration-300">
                        {facility.description}
                      </p>

                      {/* Facility Type/Category Badge */}
                      {facility.category && facility.category !== "general" && (
                        <div className="mt-3 inline-block">
                          <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/30">
                            {facility.category.charAt(0).toUpperCase() +
                              facility.category.slice(1)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order/Priority Indicator for Featured Items */}
                {facility.order !== undefined && (
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                      {facility.order!}
                    </div>
                  </div>
                )}
              </div>

              {/* Subtle Bottom Glow Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 to-brand-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          ))}
        </div>

        {/* Enhanced Empty State (if no facilities) */}
        {facilities && facilities.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-neutral-700 mb-2">
              No Featured Facilities
            </h3>
            <p className="text-neutral-500">
              Featured facilities will be displayed here when available.
            </p>
          </div>
        )}

        {/* Subtle CTA Section */}
        {facilities && facilities.length > 0 && (
          <div className="text-center mt-16">
            <p className="text-neutral-600 mb-4">
              Want to see more of our facilities?
            </p>
            <button className="inline-flex items-center space-x-2 text-brand-600 hover:text-brand-700 font-semibold transition-colors duration-200 group">
              <span>Schedule a Campus Tour</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
