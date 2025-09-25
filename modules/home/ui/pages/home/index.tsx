"use client";
import React, { Suspense } from "react";
import { trpc } from "@/trpc/client";
import HomeHeroSection from "../../sections/home/HomeHeroSection";
import HomePillarsSection from "../../sections/home/HomePillarsSection";
import { WhyChooseUsSection } from "../../sections/home/WhyChooseUsSection";
import { CampusFacilitiesSection } from "../../sections/home/CampusFacilitiesSection";
import { TestimonialsSection } from "../../sections/home/HomeTestimonialsSection";
import { SpecialBundlesSection } from "../../sections/home/SpecialBundlesSection";
import { CampusFacilitiesSection2 } from "../../sections/home/FacilityTest";
import { StudentLifeGallery } from "../../sections/home/StudentLifeGallery";

export const HomePage = () => {
  const { data: pillars, isLoading: isLoadingPillars } =
    trpc.pillars.getMany.useQuery();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <HomeHeroSection />

        <WhyChooseUsSection />

        <HomePillarsSection pillars={pillars} isLoading={isLoadingPillars} />

        <CampusFacilitiesSection2></CampusFacilitiesSection2>

        <TestimonialsSection />

        <SpecialBundlesSection />

        <StudentLifeGallery />
      </main>
    </div>
  );
};
