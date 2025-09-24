"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Bookmark,
  Share2,
  Printer,
  User,
  Calendar,
  Clock,
  Eye,
  MessageSquare,
} from "lucide-react";
import { BlogPost } from "@/app/util/blogData";

interface HeroSectionProps {
  blogPost: BlogPost;
  isBookmarked: boolean;
  setIsBookmarked: (bookmarked: boolean) => void;
  isLiked: boolean;
  setIsLiked: (liked: boolean) => void;
  showShareMenu: boolean;
  setShowShareMenu: (show: boolean) => void;
  commentsCount: number;
}

export function HeroSection({
  blogPost,
  isBookmarked,
  setIsBookmarked,
  isLiked,
  setIsLiked,
  showShareMenu,
  setShowShareMenu,
  commentsCount,
}: HeroSectionProps) {
  const articleStats = [
    { icon: Eye, value: "2.1k", label: "Views" },
    { icon: Heart, value: "156", label: "Likes" },
    { icon: MessageSquare, value: commentsCount.toString(), label: "Comments" },
    { icon: Share2, value: "45", label: "Shares" },
  ];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={blogPost.image}
          alt={blogPost.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>

      {/* Back to Blog Button */}
      <div className="relative z-10 container mx-auto px-4">
        <Link
          href="/blog"
          className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors group"
        >
          <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Blog</span>
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Badge className="mb-4 bg-brand-500 text-white border-0 px-4 py-2 text-sm font-medium shadow-lg">
              {blogPost.category}
            </Badge>
            <h1 className="text-display-sm md:text-display-lg font-bold mb-6 text-white drop-shadow-lg leading-tight">
              {blogPost.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl drop-shadow-md leading-relaxed">
              {blogPost.excerpt}
            </p>
          </div>

          {/* Author and Meta Info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center space-x-6 text-white/90">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-3">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">
                    {blogPost.author}
                  </div>
                  <div className="text-sm text-white/70">Expert Writer</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{blogPost.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{blogPost.readTime}</span>
                </div>
              </div>
            </div>

            {/* Article Stats */}
            <div className="flex items-center space-x-3">
              {articleStats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center text-white/90 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2"
                >
                  <stat.icon className="h-4 w-4 mr-2" />
                  <span className="font-medium text-sm">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <Button
              variant="secondary"
              className={`bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all ${
                isLiked ? "bg-red-500/80 hover:bg-red-500" : ""
              }`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart
                className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`}
              />
              {isLiked ? "Liked" : "Like"}
            </Button>
            <Button
              variant="secondary"
              className={`bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all ${
                isBookmarked ? "bg-brand-500/80 hover:bg-brand-500" : ""
              }`}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark
                className={`h-4 w-4 mr-2 ${isBookmarked ? "fill-current" : ""}`}
              />
              {isBookmarked ? "Saved" : "Save"}
            </Button>
            <div className="relative">
              <Button
                variant="secondary"
                className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                onClick={() => setShowShareMenu(!showShareMenu)}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
            <Button
              variant="secondary"
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
