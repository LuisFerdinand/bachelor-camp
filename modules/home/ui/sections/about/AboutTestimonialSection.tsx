"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Loader2, Play, Quote, Star, User } from "lucide-react";
import { TestimonialFetch } from "@/components/common/TestimonialSlider";
import {
  getTestimonialSourceBadgeColor,
  getTestimonialSourceIcon,
} from "@/lib/utils";

interface VideoPlayerProps {
  youtubeUrl: string;
  title?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  youtubeUrl,
  title = "Student Testimonials",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  // Extract video ID from YouTube URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(youtubeUrl);

  if (!videoId) {
    return (
      <div className="aspect-video bg-gradient-to-r from-red-400 to-red-600 rounded-xl shadow-lg flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-lg font-medium">Invalid YouTube URL</p>
          <p className="text-sm opacity-75">Please check the video link</p>
        </div>
      </div>
    );
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="relative group">
      <div className="aspect-video rounded-xl overflow-hidden shadow-xl bg-black">
        {!showPlayer ? (
          <div
            className="relative w-full h-full cursor-pointer"
            onClick={() => setShowPlayer(true)}
          >
            {/* Thumbnail */}
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onLoad={() => setIsLoaded(true)}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg">
                <Play
                  className="w-8 h-8 text-gray-900 ml-1"
                  fill="currentColor"
                />
              </div>
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="text-white text-xl font-semibold">{title}</h3>
              <p className="text-white/80 text-sm">
                Click to play testimonial video
              </p>
            </div>
          </div>
        ) : (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          />
        )}
      </div>
    </div>
  );
};

interface TestimonialCardProps {
  testimonial: TestimonialFetch;
  index: number;
}
const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  index,
}) => {
  const rating = parseFloat(testimonial.rating);

  const renderStars = () => {
    return Array(5)
      .fill(0)
      .map((_, i) => {
        const fillPercentage = Math.max(0, Math.min(100, (rating - i) * 100));

        return (
          <div key={i} className="relative inline-block">
            {/* Background star (gray) */}
            <Star className="h-4 w-4 text-gray-300" />
            {/* Foreground star (yellow) with precise fill */}
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        );
      });
  };

  return (
    <div
      className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-brand-200 transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            {renderStars()}
            <span className="ml-2 text-sm font-medium text-gray-600">
              {rating.toFixed(1)}
            </span>
          </div>

          <div
            className={`px-3 py-1 rounded-full text-xs font-medium border ${getTestimonialSourceBadgeColor(testimonial.source)} flex items-center space-x-1`}
          >
            <span>{getTestimonialSourceIcon(testimonial.source)}</span>
            <span>
              {testimonial.source.charAt(0).toUpperCase() +
                testimonial.source.slice(1)}
            </span>
          </div>
        </div>

        {/* Quote */}
        <div className="flex-grow mb-6 relative">
          <Quote className="h-6 w-6 text-brand-500 mb-2" />
          <p className="text-gray-700 leading-relaxed italic relative z-10">
            <span className="text-brand-500 text-2xl absolute -left-2 -top-2 opacity-50">
              &ldquo;
            </span>
            {testimonial.content}
            <span className="text-brand-500 text-2xl opacity-50">&rdquo;</span>
          </p>
        </div>

        {/* Author info */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            {testimonial.imageUrl ? (
              <img
                src={testimonial.imageUrl}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white">
                <User className="h-6 w-6" />
              </div>
            )}
            {testimonial.isFeatured === "true" && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                <Star className="h-2.5 w-2.5 text-yellow-800 fill-yellow-800" />
              </div>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-lg">
              {testimonial.name}
            </h4>
            {testimonial.role && (
              <p className="text-sm text-gray-600 ">{testimonial.role}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="flex space-x-1">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-300 rounded"></div>
          ))}
      </div>
      <div className="w-16 h-5 bg-gray-300 rounded-full"></div>
    </div>
    <div className="space-y-3 mb-6">
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 rounded w-4/6"></div>
    </div>
    <div className="flex items-center space-x-3">
      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
      <div>
        <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-16"></div>
      </div>
    </div>
  </div>
);

interface TestimonialsSectionProps {
  testimonials: TestimonialFetch[];
  isLoading: boolean;
  youtubeUrl?: string;
  videoTitle?: string;
}

export function TestimonialsSection({
  testimonials = [],
  isLoading,
  youtubeUrl = "https://youtu.be/QXVzmzhxWWc?si=7U4BAkna_XW5gCYF",
  videoTitle = "Student Success Stories",
}: TestimonialsSectionProps) {
  const stats = React.useMemo(() => {
    if (!testimonials.length)
      return { avgRating: 0, totalCount: 0, fiveStarCount: 0 };

    const totalRating = testimonials.reduce(
      (sum, t) => sum + parseFloat(t.rating),
      0
    );
    const avgRating = totalRating / testimonials.length;
    const fiveStarCount = testimonials.filter(
      (t) => parseFloat(t.rating) === 5.0
    ).length;

    return {
      avgRating,
      totalCount: testimonials.length,
      fiveStarCount,
    };
  }, [testimonials]);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-brand-100 to-accent-100 text-brand-800 border-0 px-4 py-2">
            <Star className="w-4 h-4 mr-2 text-yellow-500" />
            Student Success Stories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Hear From Our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-600">
              Amazing Students
            </span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Watch testimonials from students who have transformed their English
            skills and achieved their dreams with our programs.
          </p>

          {/* Stats */}
          {!isLoading && testimonials.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="bg-white rounded-lg px-6 py-3 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-gray-900">
                    {stats.avgRating.toFixed(1)} Average
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-lg px-6 py-3 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-gray-900">
                    {stats.totalCount} Reviews
                  </span>
                </div>
              </div>
              {stats.fiveStarCount > 0 && (
                <div className="bg-white rounded-lg px-6 py-3 shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-yellow-400 fill-yellow-400"
                          />
                        ))}
                    </div>
                    <span className="font-semibold text-gray-900">
                      {stats.fiveStarCount} Five Stars
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Video Player */}
          <div className="mb-16">
            <VideoPlayer youtubeUrl={youtubeUrl} title={videoTitle} />
          </div>

          {/* Testimonials Grid */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Loading skeletons
              Array(6)
                .fill(0)
                .map((_, i) => <TestimonialSkeleton key={i} />)
            ) : testimonials.length === 0 ? (
              // Empty state
              <div className="col-span-full text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Quote className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No testimonials available
                </h3>
                <p className="text-gray-600">
                  Check back later for student success stories.
                </p>
              </div>
            ) : (
              // Testimonial cards
              testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={index}
                />
              ))
            )}
          </div> */}

          {/* Loading more indicator */}
          {isLoading && (
            <div className="flex items-center justify-center mt-12">
              <Loader2 className="h-6 w-6 animate-spin text-brand-500 mr-3" />
              <span className="text-gray-600 font-medium">
                Loading testimonials...
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
