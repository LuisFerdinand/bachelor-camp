"use client";
import React from "react";

import { Award, BookOpen, Globe, Users } from "lucide-react";

import { ABOUT_BANNER_FALLBACK } from "@/constants";
import { AboutHeroSection } from "../../sections/about/AboutHeroSection";
import { MainContentSection } from "../../sections/about/MainContentSection";
import { MainContentSection2 } from "../../sections/about/MainTest";
import { AccreditationsSection2 } from "../../sections/about/AccreditationSection";
import { MilestonesSection } from "../../sections/about/MilestonesSection";
import { trpc } from "@/trpc/client";
import { TestimonialsSection } from "../../sections/about/AboutTestimonialSection";
import { TeamSection } from "../../sections/about/TeamSection";
import { VisionMissionSection } from "../../sections/about/Vision&MissionSection";

// Define TypeScript interfaces for the CMS data
interface CMSImage {
  url: string;
  alt: string;
}
interface VisionMissionData {
  vision: string;
  mission: string;
}
interface CompanyInfo {
  paragraph1?: string;
  paragraph2?: string;
}
interface AboutPageCMSData {
  heroMobileImage?: CMSImage;
  heroDesktopImage?: CMSImage;
  visionMission?: VisionMissionData;
  companyInfo?: CompanyInfo;
}
interface AboutPageProps {
  cmsData?: AboutPageCMSData;
}

// About Us Page Component
export default function AboutUsPage({ cmsData }: AboutPageProps) {
  const { data: testimonials, isLoading: isLoadingTestimonials } =
    trpc.testimonials.getMany.useQuery({ category: "About" });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        <AboutHeroSection></AboutHeroSection>
        <MainContentSection companyInfo={cmsData?.companyInfo} />
        {/* <MainContentSection2 companyInfo={cmsData?.companyInfo} /> */}
        <VisionMissionSection data={cmsData?.visionMission} />
        <TestimonialsSection
          testimonials={testimonials!}
          isLoading={isLoadingTestimonials}
        />
        <AccreditationsSection2></AccreditationsSection2>
        {/* Currently disactivate */}
        {/* <MilestonesSection /> */}
        {/* <TeamSection /> */}
      </main>
    </div>
  );
}
