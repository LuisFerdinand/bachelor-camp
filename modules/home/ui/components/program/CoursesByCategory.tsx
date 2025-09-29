"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CourseCard } from "@/modules/home/ui/components/program/CourseCard";
import { CourseCategoryTabs } from "@/modules/home/ui/components/program/CourseCategoryTabs";
import type { Course } from "@/app/util/bookingData";

interface CoursesByCategoryProps {
  courses: Course[];
}

export function CoursesByCategory({ courses }: CoursesByCategoryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("IELTS");

  // Get unique categories from courses
  const categories = Array.from(
    new Set(courses.map((course) => course.category))
  );

  // Filter courses by active category
  const filteredCourses = courses.filter(
    (course) => course.category === activeCategory
  );

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full">
      {/* Category Navigation */}
      <CourseCategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Course Cards Slider */}
      {filteredCourses.length > 0 ? (
        <div className="course-slider-container">
          <Slider {...sliderSettings}>
            {filteredCourses.map((course) => (
              <div key={course.id} className="px-2">
                <CourseCard course={course} />
              </div>
            ))}
          </Slider>
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
