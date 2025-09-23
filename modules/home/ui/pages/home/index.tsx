"use client";
import React, { Suspense } from "react";
import { trpc } from "@/trpc/client";
import HomeHeroSection from "../../sections/home/HomeHeroSection";
import HomePillarsSection from "../../sections/home/HomePillarsSection";
import { WhyChooseUsSection } from "../../sections/home/WhyChooseUsSection";
import { CampusFacilitiesSection } from "../../sections/home/CampusFacilitiesSection";
import { TestimonialsSection } from "../../sections/home/TestimonialsSection";
import { SpecialBundlesSection } from "../../sections/home/SpecialBundlesSection";
import { StudentLifeGallery } from "../../components/home/StudentLifeGallery";
import WhyChooseUsDisplayPage from "../../sections/home/Test";

export const HomePage = () => {
  const { data: pillars, isLoading: isLoadingPillars } =
    trpc.pillars.getMany.useQuery();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <HomeHeroSection />

        <WhyChooseUsSection />

        {/* <WhyChooseUsDisplayPage></WhyChooseUsDisplayPage> */}

        <HomePillarsSection pillars={pillars} isLoading={isLoadingPillars} />

        <CampusFacilitiesSection />

        <TestimonialsSection />

        <SpecialBundlesSection />

        <StudentLifeGallery />
      </main>
    </div>
  );
};
