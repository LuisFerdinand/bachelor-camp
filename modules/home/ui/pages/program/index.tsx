"use client";

import React from "react";
import { HeroSection } from "@/modules/home/ui/components/program/HeroSection";
import { CourseSlider } from "@/modules/home/ui/components/program/CourseSlider";
import { SchedulePricing } from "@/modules/home/ui/components/program/SchedulePricing";
import { PlacementTestForm } from "@/modules/home/ui/components/program/PlacementTestForm";
import { getAllCourses } from "@/app/util/bookingData";

// Define TypeScript interfaces for the CMS data
interface CMSImage {
  url: string;
  alt: string;
}

interface ProgramPageCMSData {
  heroMobileImage?: CMSImage;
  heroDesktopImage?: CMSImage;
}

interface ProgramPageProps {
  cmsData?: ProgramPageCMSData;
}

export default function ProgramPage({ cmsData }: ProgramPageProps) {
  // Get hero images with fallbacks to local images
  const heroImages = {
    mobile: {
      src:
        cmsData?.heroMobileImage?.url ||
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      alt:
        cmsData?.heroMobileImage?.alt ||
        "English language classroom - mobile view",
    },
    desktop: {
      src:
        cmsData?.heroDesktopImage?.url ||
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      alt:
        cmsData?.heroDesktopImage?.alt ||
        "English language classroom - desktop view",
    },
  };

  // Get all courses
  const courses = getAllCourses();

  // Define categories and schedule mapping
  const categories = ["IELTS", "TOEFL", "TOEIC", "PRONUNCIATION"];
  const scheduleMapping = {
    IELTS: [
      {
        type: "Intensive Weekday",
        schedule: "Mon-Fri, 2:00-5:00 PM",
        duration: "3 months",
      },
      {
        type: "Weekend Intensive",
        schedule: "Sat-Sun, 9:00 AM-4:00 PM",
        duration: "3 months",
      },
    ],
    TOEFL: [
      {
        type: "Weekday Classes",
        schedule: "Mon-Wed-Fri, 2:00-5:00 PM",
        duration: "1 month",
      },
      {
        type: "Weekend Classes",
        schedule: "Sat-Sun, 9:00 AM-1:00 PM",
        duration: "1 month",
      },
    ],
    TOEIC: [
      {
        type: "Weekday Classes",
        schedule: "Tue-Thu, 6:00-8:00 PM",
        duration: "1 month",
      },
      {
        type: "Weekend Classes",
        schedule: "Sat, 9:00 AM-4:00 PM",
        duration: "1 month",
      },
    ],
    PRONUNCIATION: [
      {
        type: "Weekday Classes",
        schedule: "Mon-Fri, 4:00-6:00 PM",
        duration: "1 month",
      },
      {
        type: "Weekend Classes",
        schedule: "Sat, 10:00 AM-2:00 PM",
        duration: "1 month",
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        <HeroSection heroImages={heroImages} />

        {/* Programs Section with Slider */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">
                Our Special Programs
              </h2>
              <p className="text-lg text-neutral-600">
                Choose from our specialized courses designed for specific
                learning objectives.
              </p>
            </div>
            {/* Course Slider */}
            <div className="max-w-6xl mx-auto">
              <CourseSlider courses={courses} />
            </div>
          </div>
        </section>

        {/* Schedule & Pricing Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">
                Schedule & Pricing
              </h2>
              <p className="text-lg text-neutral-600">
                Flexible schedules and transparent pricing for all our programs.
              </p>
            </div>
            <SchedulePricing
              categories={categories}
              scheduleMapping={scheduleMapping}
            />
          </div>
        </section>

        {/* Placement Test Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">
                Placement Test
              </h2>
              <p className="text-lg text-neutral-600">
                Take our short placement test to determine your current English
                level and get a program recommendation.
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <PlacementTestForm categories={categories} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
