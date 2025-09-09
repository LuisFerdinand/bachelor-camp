"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="mb-4 bg-accent-100 text-accent-800 border-0">
            <Star className="w-4 h-4 mr-2" />
            Student Success Stories
          </Badge>
          <h2 className="text-display-sm md:text-display-md font-bold mb-4">
            Hear From Our Students
          </h2>
          <p className="text-lg text-neutral-600">
            Watch testimonials from students who have transformed their
            English skills with us.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video bg-gradient-to-r from-brand-400 to-accent-400 rounded-xl shadow-lg flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-white ml-1"></div>
              </div>
              <p className="text-lg font-medium">Student Testimonials</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-sm border border-neutral-100"
              >
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-neutral-300"} mr-1`}
                    />
                  ))}
                </div>
                <p className="text-sm italic mb-2">
                  &quot;{testimonial.text}&quot;
                </p>
                <p className="text-sm font-medium">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}