"use client";
import React from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { trpc } from "@/trpc/client";
import { ReactSVG } from "react-svg";
import { ICON_URL_FALLBACK, ProfileBC } from "@/constants";

const SkeletonCircle = ({ className }: { className?: string }) => (
  <div className={`bg-gray-200 rounded-full animate-pulse ${className}`} />
);

const SkeletonText = ({ className }: { className?: string }) => (
  <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
);

const SkeletonFeatureItem = () => (
  <div className="flex items-start space-x-3">
    <SkeletonCircle className="w-6 h-6 flex-shrink-0 mt-1" />
    <div className="flex-1">
      <SkeletonText className="h-5 w-32 mb-2" />
      <SkeletonText className="h-4 w-48 mb-3" />
      {/* Skeleton for feature highlights */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
        {[...Array(4)].map((_, i) => (
          <li key={i} className="flex items-center">
            <SkeletonCircle className="w-3 h-3 mr-1.5 flex-shrink-0" />
            <SkeletonText className="h-3 w-20" />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const LoadingState = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content Skeleton */}
        <div className="order-2 lg:order-1">
          <div className="max-w-xl">
            {/* Title skeleton */}
            <div className="mb-6">
              <SkeletonText className="h-8 w-64 mb-2" />
              <SkeletonText className="h-8 w-48" />
            </div>

            {/* Description skeleton */}
            <div className="mb-8">
              <SkeletonText className="h-5 w-full mb-2" />
              <SkeletonText className="h-5 w-3/4 mb-2" />
              <SkeletonText className="h-5 w-5/6" />
            </div>

            {/* Features skeleton */}
            <div className="space-y-6">
              {[...Array(3)].map((_, index) => (
                <SkeletonFeatureItem key={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Image Skeleton */}
        <div className="order-1 lg:order-2 relative">
          <div className="relative max-w-md mx-auto lg:max-w-none">
            {/* Main Image Skeleton */}
            <div className="w-full max-w-sm mx-auto lg:max-w-md">
              <SkeletonText className="w-full h-80 rounded-lg" />
            </div>

            {/* Conversation Bubble Skeleton */}
            <div className="absolute -bottom-4 lg:-top-4 right-4 lg:-left-12 max-w-xs">
              <div className="bg-white rounded-2xl px-6 py-4 shadow-xl border border-neutral-100 relative">
                {/* Speech bubble tail */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full lg:hidden">
                  <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-white"></div>
                </div>
                <div className="absolute bottom-0 right-8 transform translate-y-full hidden lg:block">
                  <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-white"></div>
                </div>

                <div className="flex items-center space-x-3 mb-3">
                  <SkeletonCircle className="w-8 h-8" />
                  <div>
                    <SkeletonText className="h-4 w-full mb-1" />
                    <SkeletonText className="h-3 w-full" />
                  </div>
                </div>

                <SkeletonText className="h-4 w-full mb-1" />
                <SkeletonText className="h-4 w-3/4 mb-3" />

                {/* Typing indicator skeleton */}
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    <SkeletonCircle className="w-2 h-2" />
                    <SkeletonCircle className="w-2 h-2" />
                    <SkeletonCircle className="w-2 h-2" />
                  </div>
                  <SkeletonText className="h-3 w-24 ml-2" />
                </div>
              </div>
            </div>

            {/* Floating Elements Skeleton */}
            <div className="absolute -top-8 right-4 lg:right-8">
              <SkeletonText className="h-8 w-24 rounded-full" />
            </div>

            <div className="absolute bottom-64 lg:bottom-4 left-0 lg:-left-8">
              <SkeletonText className="h-8 w-28 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export function WhyChooseUsSection() {
  const { data: highlights, isLoading: isLoadingHiglight } =
    trpc.highlights.getMany.useQuery();

  if (isLoadingHiglight) {
    return <LoadingState />;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div className="max-w-xl">
              <h2 className="text-display-sm lg:text-display-md font-bold text-neutral-900 mb-6">
                Your Success Is Our{" "}
                <span className="text-brand-600 relative">
                  Priority
                  <div className="absolute -bottom-3 left-0 right-0 h-3 bg-brand-100 -rotate-1 rounded-full opacity-70"></div>
                </span>
              </h2>

              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                We combine proven teaching methods with world-class facilities
                to deliver exceptional English learning experiences that
                transform your future.
              </p>

              {/* Key Features List */}
              <div className="space-y-4">
                {highlights?.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <ReactSVG
                        src={feature.iconUrl || ICON_URL_FALLBACK}
                        beforeInjection={(svg) => {
                          svg.setAttribute("class", "h-4 w-4 text-white");
                        }}
                        className="flex items-center justify-center"
                      />
                    </div>

                    <div>
                      <h5 className="font-semibold text-neutral-900 mb-1">
                        {feature.title}
                      </h5>
                      <p className="text-neutral-600 text-sm">
                        {feature.subtitle}
                      </p>
                      {/* Feature highlights (up to 5) */}
                      {feature.features && feature.features.length > 0 && (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-2">
                          {feature.features.slice(0, 5).map((f, i) => (
                            <li
                              key={i}
                              className="hidden md:flex items-center text-xs text-neutral-500"
                            >
                              <CheckCircle className="w-3 h-3 text-brand-600 mr-1.5 flex-shrink-0" />
                              <p className="leading-none">{f.text}</p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Image with Conversation Bubble */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative max-w-md mx-auto lg:max-w-none">
              {/* Main Image */}
              <Image
                src="/home/whyUs-sec.svg"
                alt="Happy student giving thumbs up"
                className="w-full h-auto max-w-sm mx-auto lg:max-w-md"
                width={100}
                height={100}
              />

              {/* Conversation Bubble */}
              <div className="absolute -bottom-4 lg:-top-4 right-4 lg:-left-12 max-w-xs">
                <div className="bg-white rounded-2xl px-6 py-4 shadow-xl border border-neutral-100 relative">
                  {/* Speech bubble tail */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full lg:hidden">
                    <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-white"></div>
                  </div>
                  <div className="absolute bottom-0 right-8 transform translate-y-full hidden lg:block">
                    <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-white"></div>
                  </div>

                  <div className="flex items-center space-x-3 mb-3">
                    <Image src={ProfileBC} alt={""} width={40} height={40} />
                    <div>
                      <p className="font-semibold text-neutral-900 text-sm">
                        Bachelor Camp
                      </p>
                      <p className="text-neutral-500 text-xs">English Expert</p>
                    </div>
                  </div>

                  <p className="text-neutral-700 text-sm leading-relaxed">
                    &quot;Ready to achieve your English goals? Join thousands of
                    successful students! 🚀&quot;
                  </p>

                  {/* Typing indicator */}
                  <div className="flex items-center space-x-1 mt-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-xs text-neutral-500 ml-2">
                      Bachelor Camp is typing...
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-8 right-4 lg:right-8">
                <div className="bg-accent-500 text-neutral-900 px-3 py-2 rounded-full text-sm font-semibold shadow-lg">
                  ⭐ 4.9/5 Rating
                </div>
              </div>

              <div className="absolute bottom-64 lg:bottom-4 left-0 lg:-left-8">
                <div className="bg-brand-600 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg">
                  ✅ 1000+ Graduates
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
