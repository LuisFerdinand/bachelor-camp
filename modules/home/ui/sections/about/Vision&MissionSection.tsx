"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Target, Eye } from "lucide-react";

interface VisionMissionData {
  vision: string;
  mission: string;
}

interface VisionMissionSectionProps {
  data?: VisionMissionData;
}

export function VisionMissionSection({ data }: VisionMissionSectionProps) {
  // Default content with fallbacks
  const defaultData = {
    vision:
      "To be the leading English language education institution in Southeast Asia, empowering students to achieve their academic and professional goals through innovative teaching methods and personalized learning experiences.",
    mission:
      "We are committed to providing world-class English education through expert instruction, cutting-edge technology, and a supportive learning environment. We strive to develop confident communicators who can succeed in an interconnected global community.",
  };

  const visionMissionData = data || defaultData;

  return (
    <section className="py-20 bg-gradient-to-br from-brand-50/30 to-accent-50/20">
      <div className="container mx-auto px-4">
        <div className="mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-display-sm md:text-display-md font-bold">
              Our Purpose &{" "}
              <span className="text-accent-500 relative">
                Direction
                <div className="absolute -bottom-2 left-0 right-0 h-3 bg-accent-100 rotate-1 rounded-full opacity-60"></div>
              </span>
            </h2>
          </div>

          <div className="flex flex-col items-center justify-center gap-12">
            {/* Vision */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mr-4">
                  <Eye className="h-6 w-6 text-brand-600" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900">
                  Our Vision
                </h3>
              </div>
              <p className="text-lg text-neutral-600 leading-relaxed">
                {visionMissionData.vision}
              </p>
            </div>

            {/* Mission */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center mr-4">
                  <Target className="h-6 w-6 text-accent-600" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900">
                  Our Mission
                </h3>
              </div>
              <p className="text-lg text-neutral-600 leading-relaxed">
                {visionMissionData.mission}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
