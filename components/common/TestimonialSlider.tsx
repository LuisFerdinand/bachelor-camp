"use client";
import React, { useState, useEffect } from "react";
import { TestimonialCard } from "./TestimonialCard";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestimonialSource } from "@/db/schema/enums";

export type TestimonialFetch = {
  id: string;
  name: string;
  role: string | null;
  source: TestimonialSource;
  imageUrl: string | null;
  content: string;
  rating: string; // decimal from DB → string in Drizzle
  isFeatured: "true" | "false";
  isShown: "true" | "false";
  order: number | null;
};

interface TestimonialSliderProps {
  testimonials: TestimonialFetch[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  isLoading: boolean;
}

// Loading skeleton component
const TestimonialSkeleton = () => (
  <div className="h-full border-0 shadow-lg bg-white/95 backdrop-blur-sm rounded-lg animate-pulse p-8">
    <div className="w-8 h-8 bg-gray-300 rounded mb-4"></div>
    <div className="flex space-x-1 mb-6">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="w-5 h-5 bg-gray-300 rounded"></div>
        ))}
    </div>
    <div className="space-y-3 mb-8">
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 rounded w-4/6"></div>
    </div>
    <div className="flex items-center mt-auto">
      <div className="w-14 h-14 bg-gray-300 rounded-full mr-4"></div>
      <div>
        <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-20"></div>
      </div>
    </div>
  </div>
);

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  testimonials,
  autoPlay = true,
  autoPlayInterval = 5000,
  isLoading,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);

  // Calculate items per slide based on screen size
  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        // lg breakpoint
        setItemsPerSlide(3);
      } else if (width >= 768) {
        // md breakpoint
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(1);
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  // Auto-play functionality
  useEffect(() => {
    if (
      !autoPlay ||
      isPaused ||
      testimonials.length <= itemsPerSlide ||
      isLoading
    )
      return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [
    autoPlay,
    autoPlayInterval,
    isPaused,
    itemsPerSlide,
    maxIndex,
    testimonials.length,
    isLoading,
  ]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Calculate the number of indicator dots needed
  const indicatorCount = Math.max(1, maxIndex + 1);

  // Show loading state
  if (isLoading) {
    return (
      <div className="relative w-full max-w-6xl mx-auto">
        <div className="overflow-hidden">
          <div className="flex">
            {Array(itemsPerSlide)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={`flex-shrink-0 px-2 pb-8 pt-4 ${
                    itemsPerSlide === 1
                      ? "w-full"
                      : itemsPerSlide === 2
                        ? "w-1/2"
                        : "w-1/3"
                  }`}
                >
                  <TestimonialSkeleton />
                </div>
              ))}
          </div>
        </div>
        <div className="flex items-center justify-center mt-8">
          <Loader2 className="h-6 w-6 animate-spin text-white/60 mr-3" />
          <span className="text-white/60 font-medium">
            Loading testimonials...
          </span>
        </div>
      </div>
    );
  }

  // Show empty state
  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ChevronRight className="h-12 w-12 text-white/60" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          No testimonials available
        </h3>
        <p className="text-white/60">
          Check back later for student success stories.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div
        className="overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`,
          }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`flex-shrink-0 px-2 pb-8 pt-4 ${
                itemsPerSlide === 1
                  ? "w-full"
                  : itemsPerSlide === 2
                    ? "w-1/2"
                    : "w-1/3"
              }`}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Only show if there are more items than can be displayed */}
      {testimonials.length > itemsPerSlide && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white/80 hover:bg-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-white/80 hover:bg-white"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Indicators - Only show if there are multiple slides */}
      {indicatorCount > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: indicatorCount }, (_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/40"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export { TestimonialSlider };
