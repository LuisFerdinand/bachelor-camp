// modules/home/ui/pages/gallery/index.tsx
"use client";

import React from "react";
import { HeroSection } from "@/modules/home/ui/components/gallery/HeroSection";
import { GalleryCategories } from "@/modules/home/ui/components/gallery/GalleryCategories";
import { BookOpen, Calendar, Building, Wifi } from "lucide-react";

// Hero section data
const heroData = {
  backgroundImage:
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  title: "Student Life Gallery",
  subtitle:
    "Explore our vibrant campus life through these captured moments of learning, activities, and facilities.",
};

// Gallery categories
const galleryCategories = [
  {
    id: 1,
    title: "Study Sessions",
    icon: BookOpen,
    description:
      "Students engaged in various learning activities and collaborative study sessions.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Study Session 1",
      },
      {
        src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Study Session 2",
      },
      {
        src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Study Session 3",
      },
      {
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Study Session 4",
      },
      {
        src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Study Session 5",
      },
      {
        src: "https://images.unsplash.com/photo-1523580846011-d3982bc74bee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Study Session 6",
      },
    ],
  },
  {
    id: 2,
    title: "Campus Events",
    icon: Calendar,
    description:
      "Cultural celebrations, competitions, and special events throughout the year.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Campus Event 1",
      },
      {
        src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Campus Event 2",
      },
      {
        src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Campus Event 3",
      },
      {
        src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Campus Event 4",
      },
      {
        src: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Campus Event 5",
      },
      {
        src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Campus Event 6",
      },
    ],
  },
  {
    id: 3,
    title: "Buildings & Classrooms",
    icon: Building,
    description:
      "Modern facilities and comfortable learning environments designed for success.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Building 1",
      },
      {
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Classroom 1",
      },
      {
        src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Dormitory 1",
      },
      {
        src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Building 2",
      },
      {
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Classroom 2",
      },
      {
        src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Dormitory 2",
      },
    ],
  },
  {
    id: 4,
    title: "Facilities",
    icon: Wifi,
    description:
      "State-of-the-art amenities that support both learning and relaxation.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Facility 1",
      },
      {
        src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Facility 2",
      },
      {
        src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Facility 3",
      },
      {
        src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Facility 4",
      },
      {
        src: "https://images.unsplash.com/photo-1523580846011-d3982bc74bee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Facility 5",
      },
      {
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        alt: "Facility 6",
      },
    ],
  },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <HeroSection
          backgroundImage={heroData.backgroundImage}
          title={heroData.title}
          subtitle={heroData.subtitle}
        />
        <GalleryCategories categories={galleryCategories} />
      </main>
    </div>
  );
}
