"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Search, BookOpen, MessageSquare, TrendingUp } from "lucide-react";
import { trpc } from "@/trpc/client";
import { BLOG_IMAGE_FALLBACK, CAMP_DESKTOP_FALLBACK } from "@/constants";
import Link from "next/link";
import { Input } from "@/components/ui/input";

interface BlogHeroSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function BlogHeroSection({
  searchTerm,
  setSearchTerm,
}: BlogHeroSectionProps) {
  const { data: banner, isLoading: isLoadingBanner } =
    trpc.banners.getOne.useQuery({ type: "Camp" });

  if (isLoadingBanner) {
    return (
      <section className="relative py-20 md:py-32 min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 w-full">
          <div className="max-w-3xl text-center md:text-left mx-auto md:mx-0">
            {/* Badge Skeleton */}
            <div className="mb-4 inline-flex items-center">
              <div className="h-6 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded-full"></div>
            </div>

            {/* Headline Skeleton */}
            <div className="mb-6 space-y-3">
              <div className="h-12 md:h-16 w-full max-w-2xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded-lg"></div>
              <div className="h-12 md:h-16 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded-lg"></div>
            </div>

            {/* Subheadline Skeleton */}
            <div className="mb-8 space-y-2">
              <div className="h-6 w-full max-w-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded-md"></div>
              <div className="h-6 w-2/3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded-md"></div>
            </div>

            {/* Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <div className="h-12 w-36 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded-lg"></div>
              <div className="h-12 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded-lg"></div>
              <div className="h-12 w-40 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Floating Images Skeleton */}
        <div className="absolute bottom-8 right-8 hidden lg:block">
          <div className="flex space-x-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse border-4 border-gray-300/30 shadow-lg"></div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse border-4 border-gray-300/30 shadow-lg mt-4"></div>
          </div>
        </div>

        {/* Loading Indicator */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-gray-500 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <span className="text-sm font-medium">Loading content...</span>
        </div>
      </section>
    );
  }

  const show1 = !!banner?.ctas?.[0]?.isShown;
  const show2 = !!banner?.ctas?.[1]?.isShown;
  const show3 = !!banner?.ctas?.[2]?.isShown;

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        <div className="block absolute inset-0">
          <Image
            src={banner?.mediaUrl || BLOG_IMAGE_FALLBACK}
            alt={banner?.headline || "Blog Banner"}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30 border border-white/30 backdrop-blur-sm px-4 py-2">
            <BookOpen className="w-4 h-4 mr-2" />
            {banner?.badgeText}
          </Badge>
          <h1 className="text-display-md md:text-display-xl font-bold mb-6 text-white drop-shadow-lg">
            {banner?.headline}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md leading-relaxed">
            {banner?.subheadline}
          </p>

          {/* Enhanced Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search articles, topics, or tips..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pr-14 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-lg"
              />
              <Search className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white h-6 w-6" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {show1 && (
              <Link href={banner.ctas![0].ctaLink!}>
                <Button
                  size="lg"
                  className="bg-brand-500 hover:bg-brand-600 text-white shadow-brand px-8 py-3 text-base font-semibold"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  {banner.ctas![0].ctaText}
                </Button>
              </Link>
            )}
            {show2 && (
              <Link href={banner.ctas![1].ctaLink!}>
                <Button
                  size="lg"
                  className="bg-accent-500 hover:bg-accent-600 text-white shadow-accent px-8 py-3 text-base font-semibold"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  {banner.ctas![1].ctaText}
                </Button>
              </Link>
            )}
            {show3 && (
              <Link href={banner.ctas![2].ctaLink!}>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-brand-600 px-8 py-3 text-base font-semibold transition-all"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  {banner.ctas![2].ctaText}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
