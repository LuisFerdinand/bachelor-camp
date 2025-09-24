"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Star,
  ArrowRight,
  Bookmark,
  User,
  Calendar,
  Clock,
} from "lucide-react";
import { BlogPost } from "@/app/util/blogData";
import Link from "next/link";

interface FeaturedArticlesProps {
  featuredPosts: BlogPost[];
}

export function FeaturedArticles({ featuredPosts }: FeaturedArticlesProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="mb-4 bg-brand-100 text-brand-800 border-0">
            <Star className="w-4 h-4 mr-2" />
            Featured Content
          </Badge>
          <h2 className="text-display-sm md:text-display-md font-bold mb-4">
            Must-Read Articles
          </h2>
          <p className="text-lg text-neutral-600">
            Hand-picked articles that have helped thousands of students improve
            their English skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post, index) => (
            <Card
              key={post.id}
              className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer ${
                index === 0
                  ? "md:col-span-3 md:grid md:grid-cols-2 md:gap-8"
                  : ""
              }`}
            >
              <Link href={`/blog/${post.slug}`} className="contents">
                <div
                  className={`relative ${
                    index === 0 ? "md:h-auto h-64" : "h-48"
                  } overflow-hidden`}
                >
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-brand-500 text-white font-medium">
                      {post.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <Bookmark className="h-4 w-4 text-white cursor-pointer hover:text-brand-300 transition-colors" />
                    </div>
                  </div>
                  {index === 0 && (
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-accent-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent
                  className={`p-6 ${
                    index === 0 ? "flex flex-col justify-center" : ""
                  }`}
                >
                  <h3
                    className={`font-bold mb-3 line-clamp-2 group-hover:text-brand-600 transition-colors ${
                      index === 0
                        ? "text-xl sm:text-2xl md:text-xl lg:text-2xl"
                        : "text-base sm:text-lg"
                    }`}
                  >
                    {post.title}
                  </h3>
                  <p
                    className={`text-neutral-600 mb-4 ${
                      index === 0
                        ? "line-clamp-3 sm:line-clamp-4 text-sm sm:text-base"
                        : "line-clamp-3 text-sm"
                    }`}
                  >
                    {post.excerpt}
                  </p>

                  {/* Improved metadata layout for better responsive behavior */}
                  <div className="flex flex-wrap items-center justify-between gap-y-2 text-sm text-neutral-500 mb-4">
                    <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span className="truncate max-w-[100px] sm:max-w-none">
                          {index === 0
                            ? post.author
                            : post.author.split(" ")[0]}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="whitespace-nowrap">
                          {index === 0 ? post.date : post.date.split(" ")[0]}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-brand-600 hover:text-brand-800 transition-colors">
                    <span className="font-medium text-sm sm:text-base">
                      {index === 0 ? "Read Full Article" : "Read Article"}
                    </span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
