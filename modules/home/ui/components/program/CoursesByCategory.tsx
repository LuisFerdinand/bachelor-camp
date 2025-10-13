"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CourseCard } from "@/modules/home/ui/components/program/CourseCard";
import { CourseCategoryTabs } from "@/modules/home/ui/components/program/CourseCategoryTabs";
import type { Course } from "@/app/util/bookingData";

interface CoursesByCategoryProps {
  courses: Course[];
}

export function CoursesByCategory({ courses }: CoursesByCategoryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("IELTS");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [slidesInView, setSlidesInView] = useState(3);

  // Get unique categories from courses
  const categories = Array.from(
    new Set(courses.map((course) => course.category))
  );

  // Filter courses by active category
  const filteredCourses = courses.filter(
    (course) => course.category === activeCategory
  );

  // Calculate slides to show based on viewport
  useEffect(() => {
    const updateSlidesInView = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setSlidesInView(1);
      } else if (width < 1024) {
        setSlidesInView(2);
      } else {
        setSlidesInView(3);
      }
    };

    updateSlidesInView();
    window.addEventListener("resize", updateSlidesInView);
    return () => window.removeEventListener("resize", updateSlidesInView);
  }, []);

  // Update scroll buttons state
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  // Setup Embla event listeners
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Reset carousel when category changes
  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(0);
    }
  }, [activeCategory, emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="w-full">
      {/* Category Navigation */}
      <CourseCategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Course Cards Carousel */}
      {filteredCourses.length > 0 ? (
        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(50%-0.5rem)] lg:flex-[0_0_calc(33.333%-0.667rem)]"
                >
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Styled with electric and brand colors */}
          {filteredCourses.length > slidesInView && (
            <>
              <button
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 
                  w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center
                  transition-all duration-200 hover:bg-electric-500 hover:shadow-xl
                  border border-gray-200 hover:border-electric-500
                  ${
                    !canScrollPrev
                      ? "opacity-0 pointer-events-none"
                      : "opacity-100"
                  }
                  hidden md:flex group`}
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 text-brand-600 group-hover:text-white transition-colors" />
              </button>

              <button
                onClick={scrollNext}
                disabled={!canScrollNext}
                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 
                  w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center
                  transition-all duration-200 hover:bg-electric-500 hover:shadow-xl
                  border border-gray-200 hover:border-electric-500
                  ${
                    !canScrollNext
                      ? "opacity-0 pointer-events-none"
                      : "opacity-100"
                  }
                  hidden md:flex group`}
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 text-brand-600 group-hover:text-white transition-colors" />
              </button>
            </>
          )}

          {/* Dots Navigation - Mobile only with accent color */}
          {filteredCourses.length > 1 && (
            <div className="flex justify-center gap-2 mt-6 md:hidden">
              {filteredCourses.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`h-2 rounded-full transition-all ${
                    emblaApi?.selectedScrollSnap() === index
                      ? "bg-electric-500 w-6"
                      : "bg-gray-300 w-2 hover:bg-accent-500"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No courses available in this category at the moment.
          </p>
        </div>
      )}
    </div>
  );
}
