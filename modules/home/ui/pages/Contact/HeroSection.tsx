"use client"

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Building, MessageSquare, Phone, MapPin } from "lucide-react";

interface HeroSectionProps {
  heroImages: {
    mobile: { src: string; alt: string };
    desktop: { src: string; alt: string };
  };
  scrollToForm: () => void;
}

export default function HeroSection({ heroImages, scrollToForm }: HeroSectionProps) {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="block md:hidden absolute inset-0">
          <Image
            src={heroImages.mobile.src}
            alt={heroImages.mobile.alt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30"></div>
        </div>
        <div className="hidden md:block absolute inset-0">
          <Image
            src={heroImages.desktop.src}
            alt={heroImages.desktop.alt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>
      </div>
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30 border border-white/30 backdrop-blur-sm px-4 py-2">
            <Building className="w-4 h-4 mr-2" />
            BachelorCamp Kediri
          </Badge>
          <h1 className="text-display-md md:text-display-xl font-bold mb-6 text-white">
            Welcome to BachelorCamp
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Your premier English learning destination in Kediri. Contact us today to start your language journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={scrollToForm} className="bg-brand-500 hover:bg-brand-600">
              <MessageSquare className="w-5 h-5 mr-2" />
              Contact Us
            </Button>
            <Button size="lg" className="bg-accent-500 hover:bg-accent-600">
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-brand-600">
              <MapPin className="w-5 h-5 mr-2" />
              Visit Campus
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}