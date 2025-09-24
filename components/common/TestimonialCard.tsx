"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, User } from "lucide-react";
import { TestimonialFetch } from "./TestimonialSlider";
import {
  getTestimonialSourceBadgeColor,
  getTestimonialSourceIcon,
} from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: TestimonialFetch;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const rating = parseFloat(testimonial.rating);

  const renderStars = () => {
    return Array(5)
      .fill(0)
      .map((_, i) => {
        const fillPercentage = Math.max(0, Math.min(100, (rating - i) * 100));

        return (
          <div key={i} className="relative inline-block">
            {/* Background star (gray) */}
            <Star className="h-5 w-5 text-gray-300" />
            {/* Foreground star (yellow) with precise fill */}
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        );
      });
  };

  return (
    <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/95 backdrop-blur-sm group">
      <CardContent className="p-8 flex flex-col h-full relative overflow-hidden">
        {/* Decorative gradient overlay */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-brand-500/10 to-accent-500/10 rounded-bl-full transition-all duration-500 group-hover:w-32 group-hover:h-32" />

        {/* Quote icon */}
        <div className="mb-4 text-brand-500">
          <Quote className="h-8 w-8" />
        </div>

        {/* Rating and source badge */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center space-x-1">
            {renderStars()}
            <span className="ml-2 text-sm font-medium text-gray-600">
              {rating.toFixed(1)}
            </span>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${getTestimonialSourceBadgeColor(testimonial.source)} flex items-center space-x-1`}
          >
            <span>{getTestimonialSourceIcon(testimonial.source)}</span>
            <span>
              {testimonial.source.charAt(0).toUpperCase() +
                testimonial.source.slice(1)}
            </span>
          </span>
        </div>

        {/* Content */}
        <div className="flex-grow mb-8 relative z-10">
          <p className="text-gray-700 leading-relaxed text-base italic relative">
            <span className="text-brand-500 text-2xl absolute -left-2 -top-2 opacity-50">
              &ldquo;
            </span>
            {testimonial.content}
            <span className="text-brand-500 text-2xl opacity-50">&rdquo;</span>
          </p>
        </div>

        {/* Author info */}
        <div className="flex items-center mt-auto relative z-10">
          <div className="relative">
            {testimonial.imageUrl ? (
              <img
                src={testimonial.imageUrl}
                alt={testimonial.name}
                className="w-14 h-14 rounded-full object-cover shadow-md ring-2 ring-white"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white">
                <User className="h-6 w-6" />
              </div>
            )}
            {testimonial.isFeatured === "true" && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                <Star className="h-3 w-3 text-yellow-800 fill-yellow-800" />
              </div>
            )}
          </div>
          <div className="ml-4">
            <h4 className="font-semibold text-gray-900 text-lg">
              {testimonial.name}
            </h4>
            {testimonial.role && (
              <p className="text-sm text-gray-600">{testimonial.role}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { TestimonialCard };
