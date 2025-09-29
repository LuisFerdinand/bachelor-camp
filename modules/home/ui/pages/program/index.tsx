"use client";

import React from "react";

import { CoursesByCategory } from "@/modules/home/ui/sections/program/AllProgramsSection"; // Update path as needed
import { getAllCourses } from "@/app/util/bookingData";
import { PROGRAM_BANNER_FALLBACK } from "@/constants";
import { ProgramHeroSection } from "../../sections/program/ProgramHeroSection";
import { SchedulePricing } from "../../sections/program/SchedulePricing";
import { PlacementTestForm } from "../../sections/program/PlacementTestForm";

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
        <ProgramHeroSection></ProgramHeroSection>

        {/* Programs Section with Category-based Course Cards */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">
                Our Special{" "}
                <span className="text-brand-600 relative">
                  Programs
                  <div className="absolute -bottom-2 left-0 right-0 h-3 bg-brand-100 -rotate-1 rounded-full opacity-60"></div>
                </span>
              </h2>
              <p className="text-lg text-neutral-600">
                Choose from our specialized courses designed for specific
                learning objectives.
              </p>
            </div>
            {/* Courses by Category */}
            <div className="max-w-7xl mx-auto">
              <CoursesByCategory courses={courses} />
            </div>
          </div>
        </section>

        {/* Schedule & Pricing Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-display-sm md:text-display-md font-bold mb-4">
                Schedule &{" "}
                <span className="text-accent-500 relative">
                  Pricing
                  <div className="absolute -bottom-2 left-0 right-0 h-3 bg-accent-100 -rotate-1 rounded-full opacity-60"></div>
                </span>
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
                Placement{" "}
                <span className="text-electriv-600 relative">
                  Test
                  <div className="absolute -bottom-2 left-0 right-0 h-3 bg-electriv-100 -rotate-1 rounded-full opacity-60"></div>
                </span>
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
