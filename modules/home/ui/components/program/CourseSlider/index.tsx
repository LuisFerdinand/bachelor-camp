"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CourseCard } from "../CourseCard";

interface Course {
  id: number;
  name: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  totalMeetings: number;
  investment: number;
  goals: string[];
  slug: string;
}

interface CourseSliderProps {
  courses: Course[];
}

export function CourseSlider({ courses }: CourseSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    dragFree: true,
  });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-x-hidden" ref={emblaRef}>
        <div className="flex">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3 py-4"
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 rounded-full bg-white/80 backdrop-blur-sm border border-white shadow-md hover:bg-white"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 rounded-full bg-white/80 backdrop-blur-sm border border-white shadow-md hover:bg-white"
        onClick={scrollNext}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
