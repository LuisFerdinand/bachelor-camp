"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TagIcon } from "lucide-react";
import { trpc } from "@/trpc/client";
import { bannerStyles } from "@/constants";

export default function HomeHeroSection() {
  const { data: banner, isLoading: isLoadingBanner } =
    trpc.banners.getOne.useQuery({ type: "Home" });

  if (isLoadingBanner) {
    return (
      <section className="relative py-20 md:py-32 min-h-screen flex items-center justify-center bg-gray-100">
        <p>Loading...</p>
      </section>
    );
  }

  const show1 = !!banner?.ctas?.[0]?.isShown;
  const show2 = !!banner?.ctas?.[1]?.isShown;
  const show3 = !!banner?.ctas?.[2]?.isShown;

  return (
    <section
      className="relative py-20 md:py-32 min-h-screen flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${banner?.mediaUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-4 w-full">
        <div className="max-w-3xl text-center md:text-left mx-auto md:mx-0">
          <Badge className={`mb-4 ${bannerStyles.badge.base}`}>
            <TagIcon className="size-3 mr-1" />
            {banner?.badgeText}
          </Badge>
          <h1 className="text-display-md md:text-display-xl font-bold mb-6 text-white">
            {banner?.headline}
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl">
            {banner?.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            {show1 && (
              <Button size="lg" className={bannerStyles.buttons.primary.base}>
                {banner.ctas![0].ctaText}
              </Button>
            )}
            {show2 && (
              <Button
                size="lg"
                variant="outline"
                className={bannerStyles.buttons.outline.base}
              >
                {banner.ctas![1].ctaText}
              </Button>
            )}
            {show3 && (
              <Button
                size="lg"
                className={`group ${bannerStyles.buttons.gradient.base}`}
              >
                <span className={bannerStyles.buttons.gradient.inner}>
                  {banner.ctas![2].ctaText}
                </span>
                <span
                  className={bannerStyles.buttons.gradient.hoverOverlay}
                ></span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
