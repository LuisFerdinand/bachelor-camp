"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  ArrowLeft,
  Bookmark,
  User,
  Calendar,
  Clock,
} from "lucide-react";
import { BlogPost } from "@/app/util/blogData";

interface RelatedPostsProps {
  relatedPosts: BlogPost[];
}

export function RelatedPosts({ relatedPosts }: RelatedPostsProps) {
  return (
    <div className="mb-12 pt-8 border-t border-neutral-200">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-display-sm font-bold flex items-center">
          <TrendingUp className="h-6 w-6 mr-3 text-accent-500" />
          Related Articles
        </h3>
        <Badge className="bg-accent-100 text-accent-800 border-0">
          {relatedPosts.length} Articles
        </Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Card
            key={post.id}
            className="border-0 shadow-md hover:shadow-xl transition-all overflow-hidden group"
          >
            <div className="relative h-48">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute top-3 left-3">
                <Badge className="bg-brand-500 text-white text-xs font-medium">
                  {post.category}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <Bookmark className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h4>
              <p className="text-neutral-600 text-sm line-clamp-2 mb-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
