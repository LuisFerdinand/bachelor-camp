"use client";
import React from "react";
import { TestimonialSlider } from "@/components/common/TestimonialSlider";
import { TEST_IMAGE_FALLBACK } from "@/constants";
import { trpc } from "@/trpc/client";

export function TestimonialsSection() {
  const { data: testimonials = [], isLoading: isLoadingTestimonials } =
    trpc.testimonials.getMany.useQuery({ category: "Home" });

  return (
    <section
      className="py-16 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${TEST_IMAGE_FALLBACK})`,
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

        <TestimonialSlider
          testimonials={testimonials}
          isLoading={isLoadingTestimonials}
        />
      </div>
    </section>
  );
}
