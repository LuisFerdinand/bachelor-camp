"use client";
import React from "react";
import { BundleSlider } from "@/components/common/BundleSlider";

export function SpecialBundlesSection() {
  const bundles = [
    {
      id: 1,
      title: "Complete English Mastery",
      description: "6-month comprehensive program with all courses",
      price: "Rp 15,000,000",
      discount: "Save 20%",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: [
        "General English",
        "IELTS Prep",
        "Conversation Club",
        "Accommodation",
      ],
    },
    {
      id: 2,
      title: "Intensive Camp Experience",
      description: "4-week immersive camp with accommodation",
      price: "Rp 8,500,000",
      discount: "Save 15%",
      image:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: [
        "Daily Classes",
        "Cultural Activities",
        "Weekend Excursions",
        "Full Board",
      ],
    },
    {
      id: 3,
      title: "Business English Pro",
      description: "3-month intensive business communication course",
      price: "Rp 6,500,000",
      discount: "Save 10%",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: [
        "Professional Communication",
        "Presentation Skills",
        "Business Writing",
        "Networking Practice",
      ],
    },
    {
      id: 4,
      title: "IELTS Success Package",
      description: "8-week intensive IELTS preparation course",
      price: "Rp 4,500,000",
      discount: "Save 12%",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: [
        "Mock Tests",
        "Speaking Practice",
        "Writing Feedback",
        "Score Guarantee",
      ],
    },
    {
      id: 5,
      title: "Conversation Master",
      description: "2-month focus on speaking and listening skills",
      price: "Rp 3,200,000",
      discount: "Save 8%",
      image:
        "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: [
        "Daily Speaking Practice",
        "Native Speaker Sessions",
        "Group Discussions",
        "Confidence Building",
      ],
    },
    {
      id: 6,
      title: "Teen English Explorer",
      description: "Fun and interactive program designed for teenagers",
      price: "Rp 2,800,000",
      discount: "Save 15%",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: [
        "Interactive Games",
        "Project-Based Learning",
        "Peer Interaction",
        "Creative Activities",
      ],
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-display-sm md:text-display-md font-bold mb-4">
            Special{" "}
            <span className="text-accent-500 relative">
              Bundles
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-accent-100 -rotate-2 rounded-full opacity-70"></div>
            </span>
          </h2>
          <p className="text-lg text-neutral-600">
            Save more with our specially curated program bundles.
          </p>
        </div>

        <BundleSlider bundles={bundles} />
      </div>
    </section>
  );
}
