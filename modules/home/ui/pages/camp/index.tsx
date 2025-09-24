"use client";

import React from "react";

import { BuildingShowcase } from "@/modules/home/ui/components/camp/BuildingShowcase";
import { BuildingCard } from "@/modules/home/ui/components/camp/BuildingCard";
import { SeasonalCalendar } from "@/modules/home/ui/components/camp/SeasonalCalendar";
import { getAllBuildings } from "@/app/util/buildingData";
import { CAMP_DESKTOP_FALLBACK, CAMP_MOBILE_FALLBACK } from "@/constants";
import { CampHeroSection } from "../../sections/camp/CampHeroSection";

// Define TypeScript interfaces for the CMS data
interface CMSImage {
  url: string;
  alt: string;
}

interface CampPageCMSData {
  heroMobileImage?: CMSImage;
  heroDesktopImage?: CMSImage;
  campusImage?: CMSImage;
}

interface CampPageProps {
  cmsData?: CampPageCMSData;
}

export default function CampPage({ cmsData }: CampPageProps) {
  // Building images slider data with facility titles
  const buildingSliderImages = [
    {
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1186&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Air Conditioning",
      description: "Climate controlled comfort in all rooms",
    },
    {
      image:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Laundry Service",
      description: "Professional cleaning for all residents",
    },
    {
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Housekeeping",
      description: "Weekly room cleaning service",
    },
    {
      image:
        "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Common Lounge",
      description: "Social gathering space for students",
    },
    {
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Study Rooms",
      description: "Quiet study areas for focused learning",
    },
    {
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "24/7 Security",
      description: "Round-the-clock safety and surveillance",
    },
  ];

  // Get buildings from data
  const buildings = getAllBuildings();

  const seasons = [
    {
      months: ["December", "June", "July"],
      status: "Peak Season",
      color: "bg-red-100 text-red-800 border-red-200",
      description: "High demand period - book early for best availability",
      icon: "🔥",
    },
    {
      months: ["January", "October"],
      status: "Medium Season",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      description: "Moderate availability with good rates",
      icon: "📊",
    },
    {
      months: [
        "February",
        "March",
        "April",
        "May",
        "August",
        "September",
        "November",
      ],
      status: "Low Season",
      color: "bg-green-100 text-green-800 border-green-200",
      description: "Best availability and special rates",
      icon: "✨",
    },
  ];

  // All months in order for the calendar
  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        <CampHeroSection></CampHeroSection>
        <BuildingShowcase buildingSliderImages={buildingSliderImages} />

        {/* Building Options Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="mb-4 bg-accent-100 text-accent-800 border-0 w-fit mx-auto px-4 py-1 rounded-full">
                Choose Your Home
              </div>
              <h2 className="text-display-sm md:text-display-md font-bold mb-6 text-neutral-900">
                Building Options
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Select the accommodation that best fits your needs and budget.
                From budget-friendly shared spaces to premium private rooms.
              </p>
            </div>
            {/* Updated grid with consistent card heights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {buildings.map((building) => (
                <BuildingCard key={building.id} building={building} />
              ))}
            </div>
          </div>
        </section>

        <SeasonalCalendar seasons={seasons} allMonths={allMonths} />
      </main>
    </div>
  );
}
