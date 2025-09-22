"use client";
import React from "react";
import { TestimonialSlider } from "@/components/common/TestimonialSlider";

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Business Professional",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content:
        "The IELTS preparation course helped me achieve my target score in just 8 weeks. The instructors are top-notch!",
      rating: 5,
    },
    {
      id: 2,
      name: "Ahmad Hassan",
      role: "University Student",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content:
        "The camp experience was life-changing. I made friends from around the world while improving my English significantly.",
      rating: 5,
    },
    {
      id: 3,
      name: "Mei Lin",
      role: "Travel Enthusiast",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content:
        "The General English program gave me the confidence to travel solo. The practical approach really works!",
      rating: 4,
    },
    {
      id: 4,
      name: "David Kim",
      role: "Marketing Executive",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content:
        "The business English course transformed my professional communication. I'm now more confident in meetings with international clients.",
      rating: 5,
    },
    {
      id: 5,
      name: "Emma Rodriguez",
      role: "University Student",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content:
        "The personalized attention from instructors made all the difference. My speaking skills improved dramatically in just one month.",
      rating: 5,
    },
    {
      id: 6,
      name: "James Wilson",
      role: "IT Professional",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content:
        "I needed English for my career advancement. The flexible schedule and practical approach helped me achieve my goals while working full-time.",
      rating: 4,
    },
  ];

  return (
    <section
      className="py-16 relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/home/testi/testi.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-display-sm md:text-display-md font-bold mb-4 text-white">
            Student Success Stories
          </h2>
          <p className="text-lg text-gray-200">
            Hear from our students who have transformed their English skills and
            future opportunities.
          </p>
        </div>

        <TestimonialSlider testimonials={testimonials} />
      </div>
    </section>
  );
}
