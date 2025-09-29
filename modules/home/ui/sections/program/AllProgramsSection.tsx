"use client";

import React from "react";
import { CoursesByCategory } from "@/modules/home/ui/components/program/CoursesByCategory";
import type { Course } from "@/app/util/bookingData";

interface AllProgramSectionProps {
  courses: Course[];
}

export function AllProgramSection({ courses }: AllProgramSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our{" "}
            <span className="text-brand-600 relative">
              Programs
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-brand-100 -rotate-1 rounded-full opacity-60"></div>
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our wide range of English language courses designed to
            meet your specific needs and goals.
          </p>
        </div>

        <CoursesByCategory courses={courses} />
      </div>
    </section>
  );
}
export { CoursesByCategory };
