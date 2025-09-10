"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Search, BookOpen, MessageSquare, TrendingUp } from "lucide-react";

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
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function HeroSection({
  heroImages,
  searchTerm,
  setSearchTerm,
}: HeroSectionProps) {
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
          <div className="absolute inset-0 bg-black/60"></div>
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
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30 border border-white/30 backdrop-blur-sm px-4 py-2">
            <BookOpen className="w-4 h-4 mr-2" />
            Knowledge Center
          </Badge>
          <h1 className="text-display-md md:text-display-xl font-bold mb-6 text-white drop-shadow-lg">
            English Learning Hub
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md leading-relaxed">
            Discover expert tips, proven strategies, and actionable insights to
            accelerate your English learning journey.
          </p>

          {/* Enhanced Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search articles, topics, or tips..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pr-14 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-lg"
              />
              <Search className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white h-6 w-6" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-brand-500 hover:bg-brand-600 text-white shadow-brand px-8 py-3 text-base font-semibold"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Browse All Articles
            </Button>
            <Button
              size="lg"
              className="bg-accent-500 hover:bg-accent-600 text-white shadow-accent px-8 py-3 text-base font-semibold"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Subscribe to Updates
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-brand-600 px-8 py-3 text-base font-semibold transition-all"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Trending Topics
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
