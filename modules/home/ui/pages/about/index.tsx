"use client";

import React from "react";
import { HeroSection } from "@/modules/home/ui/components/about/HeroSection";
import { StatsSection } from "@/modules/home/ui/components/about/StatsSection";
import { AccreditationsSection } from "@/modules/home/ui/components/about/AccreditationsSection";
import { TestimonialsSection } from "@/modules/home/ui/components/about/TestimonialsSection";
import { MilestonesSection } from "@/modules/home/ui/components/about/MilestonesSection";
import { ValuesSection } from "@/modules/home/ui/components/about/ValuesSection";
import { CTASection } from "@/modules/home/ui/components/about/CTASection";
import { Award, BookOpen, Globe, Users } from "lucide-react";

// Define TypeScript interfaces for the CMS data
interface CMSImage {
  url: string;
  alt: string;
}

interface AboutPageCMSData {
  heroMobileImage?: CMSImage;
  heroDesktopImage?: CMSImage;
}

interface AboutPageProps {
  cmsData?: AboutPageCMSData;
}

export default function AboutUsPage({ cmsData }: AboutPageProps) {
  // Get hero images with fallbacks to Unsplash images
  const heroImages = {
    mobile: {
      src:
        cmsData?.heroMobileImage?.url ||
        "https://images.unsplash.com/photo-1596495868845-63031cb496da?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt:
        cmsData?.heroMobileImage?.alt ||
        "Students learning in classroom - mobile view",
    },
    desktop: {
      src:
        cmsData?.heroDesktopImage?.url ||
        "https://images.unsplash.com/photo-1596496356933-9b6e0b186b88?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt:
        cmsData?.heroDesktopImage?.alt ||
        "Students collaborating in modern campus - desktop view",
    },
  };

  const accreditations = [
    {
      id: 1,
      name: "British Council",
      description: "Authorized IELTS test center",
      logo: "BC",
    },
    {
      id: 2,
      name: "Cambridge English",
      description: "Official preparation center",
      logo: "CE",
    },
    {
      id: 3,
      name: "EAQUALS",
      description: "Excellence in language education",
      logo: "EQ",
    },
    {
      id: 4,
      name: "Quality English",
      description: "High-quality language schools",
      logo: "QE",
    },
  ];

  const milestones = [
    {
      year: "2010",
      title: "Founded",
      description:
        "Established with a vision to provide quality English education",
    },
    {
      year: "2015",
      title: "First Campus",
      description: "Opened our first dedicated campus in Jakarta",
    },
    {
      year: "2018",
      title: "International Expansion",
      description: "Started welcoming students from across Asia",
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Launched online learning platforms",
    },
    {
      year: "2023",
      title: "New Facilities",
      description: "Opened state-of-the-art campus expansion",
    },
  ];

  const stats = [
    { id: 1, value: "15,000+", label: "Students" },
    { id: 2, value: "98%", label: "Satisfaction Rate" },
    { id: 3, value: "50+", label: "Expert Instructors" },
    { id: 4, value: "30+", label: "Nationalities" },
  ];

  const values = [
    {
      icon: BookOpen,
      title: "Excellence",
      description:
        "We strive for the highest standards in teaching and learning.",
      color: "bg-brand-100 text-brand-700",
    },
    {
      icon: Users,
      title: "Community",
      description: "We foster a supportive and inclusive learning environment.",
      color: "bg-accent-100 text-accent-700",
    },
    {
      icon: Globe,
      title: "Innovation",
      description: "We embrace new teaching methods and technologies.",
      color: "bg-green-100 text-green-700",
    },
    {
      icon: Award,
      title: "Integrity",
      description: "We operate with honesty and transparency in all we do.",
      color: "bg-purple-100 text-purple-700",
    },
  ];

  const testimonials = [
    {
      name: "Michael T.",
      text: "The instructors are incredibly knowledgeable and supportive.",
      rating: 5,
    },
    {
      name: "Priya K.",
      text: "I improved my IELTS score by 1.5 bands in just 8 weeks!",
      rating: 5,
    },
    {
      name: "Juan P.",
      text: "The camp experience was life-changing. I made friends from around the world.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        <HeroSection heroImages={heroImages} />
        
        <StatsSection stats={stats} />
        
        <AccreditationsSection accreditations={accreditations} />
        
        <TestimonialsSection testimonials={testimonials} />
        
        <MilestonesSection milestones={milestones} />
        
        <ValuesSection values={values} />
        
        <CTASection 
          title="Join Our Learning Community"
          description="Become part of our global community of learners and transform your English skills with our world-class programs."
          buttonTexts={["Explore Programs", "Meet Our Team", "Contact Us"]}
        />
      </main>
    </div>
  );
}