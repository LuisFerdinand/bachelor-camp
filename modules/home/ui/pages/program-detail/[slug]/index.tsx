// modules/home/ui/pages/program-detail/[slug]/page.tsx
"use client";

import React from "react";
import { notFound } from "next/navigation";
import { CourseDetailHeader } from "@/modules/home/ui/components/program-detail/CourseDetailHeader";
import { CourseOverview } from "@/modules/home/ui/components/program-detail/CourseOverview";
import { CourseDetailsTabs } from "@/modules/home/ui/components/program-detail/CourseDetailsTabs";
import { CourseCTA } from "@/modules/home/ui/components/program-detail/CourseCTA";
import { getCourseBySlug } from "@/app/util/bookingData";

interface CourseDetailPageProps {
  params: {
    slug: string;
  };
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const course = getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        {/* Course Detail Header */}
        <CourseDetailHeader course={course} />

        {/* Course Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Course Overview */}
              <CourseOverview course={course} />

              {/* Course Details Tabs */}
              <CourseDetailsTabs course={course} />
            </div>
          </div>
        </section>

        {/* Course CTA */}
        <CourseCTA course={course} />
      </main>
    </div>
  );
}
