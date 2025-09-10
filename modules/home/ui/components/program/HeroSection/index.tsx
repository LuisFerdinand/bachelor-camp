"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { BookOpen, CheckCircle, MessageSquare } from "lucide-react";

interface CMSImage {
  url: string;
  alt: string;
}

interface HeroImages {
  mobile: { src: string; alt: string };
  desktop: { src: string; alt: string };
}

interface HeroSectionProps {
  heroImages: HeroImages;
}

export function HeroSection({ heroImages }: HeroSectionProps) {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {/* Mobile Background */}
        <div className="block md:hidden absolute inset-0">
          <Image
            src={heroImages.mobile.src}
            alt={heroImages.mobile.alt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        {/* Desktop Background */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src={heroImages.desktop.src}
            alt={heroImages.desktop.alt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      </div>
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30 border border-white/30 backdrop-blur-sm px-4 py-2">
            <BookOpen className="w-4 h-4 mr-2" />
            Special Program
          </Badge>
          <h1 className="text-display-md md:text-display-xl font-bold mb-6 text-white drop-shadow-lg">
            English Programs for Every Goal
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md leading-relaxed">
            Specialized courses designed to meet specific learning objectives
            with expert instruction and proven methodologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-brand-500 hover:bg-brand-600 text-white shadow-brand px-8 py-3 text-base font-semibold"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              View Programs
            </Button>
            <Button
              size="lg"
              className="bg-accent-500 hover:bg-accent-600 text-white shadow-accent px-8 py-3 text-base font-semibold"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Take Placement Test
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-brand-600 px-8 py-3 text-base font-semibold transition-all"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
