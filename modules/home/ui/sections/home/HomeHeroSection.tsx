"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TagIcon } from "lucide-react";
import { trpc } from "@/trpc/client";
import { bannerStyles } from "@/constants";
import Link from "next/link";

// Floating Logo Component
const FloatingLogos = () => {
  return (
    <>
      <div className="absolute bottom-8 right-8 hidden lg:flex space-x-6 pointer-events-none">
        {/* First Logo - Larger */}
        <div className="relative animate-float">
          <div className="w-24 h-24 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
            <Image
              src="/logo.png"
              alt="Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        </div>

        {/* Second Logo - Medium */}
        <div className="relative animate-float-delayed mt-8">
          <div className="w-20 h-20 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="object-contain"
            />
          </div>
        </div>

        {/* Third Logo - Smaller */}
        <div className="relative animate-float-slow mt-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
            <Image
              src="/logo.png"
              alt="Logo"
              width={30}
              height={30}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-25px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
          animation-delay: 0.5s;
        }

        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </>
  );
};

export default function HomeHeroSection() {
  const { data: banner, isLoading: isLoadingBanner } =
    trpc.banners.getOne.useQuery({ type: "Home" });

  if (isLoadingBanner) {
    return (
      <section className="relative py-20 md:py-32 min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
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
        <div className="absolute bottom-8 right-8 hidden lg:flex space-x-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse border-4 border-gray-300/30 shadow-lg"></div>
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse border-4 border-gray-300/30 shadow-lg mt-8"></div>
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse border-4 border-gray-300/30 shadow-lg mt-4"></div>
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
    <section
      className="relative py-20 md:py-32 min-h-screen flex items-center overflow-hidden"
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
              <Link href={banner.ctas![0].ctaLink!}>
                <Button size="lg" className={bannerStyles.buttons.primary.base}>
                  {banner.ctas![0].ctaText}
                </Button>
              </Link>
            )}
            {show2 && (
              <Link href={banner.ctas![1].ctaLink!}>
                <Button
                  size="lg"
                  variant="outline"
                  className={bannerStyles.buttons.outline.base}
                >
                  {banner.ctas![1].ctaText}
                </Button>
              </Link>
            )}
            {show3 && (
              <Link href={banner.ctas![2].ctaLink!}>
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
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Floating Logos Component */}
      <FloatingLogos />
    </section>
  );
}
