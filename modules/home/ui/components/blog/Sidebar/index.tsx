"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  TrendingUp,
  MessageSquare,
  Bookmark,
  User,
  Calendar,
  Eye,
  Tag,
} from "lucide-react";
import { BlogPost } from "@/app/util/blogData";

interface SidebarProps {
  categories: Array<{ name: string; count: number }>;
  tags: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  popularPosts: BlogPost[];
}

export function Sidebar({
  categories,
  tags,
  selectedCategory,
  setSelectedCategory,
  popularPosts,
}: SidebarProps) {
  return (
    <div className="lg:w-1/3">
      <div className="sticky top-24 space-y-8">
        {/* Categories */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-brand-500" />
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  !selectedCategory
                    ? "bg-brand-100 text-brand-800"
                    : "hover:bg-brand-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">All Categories</span>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-brand-100 text-brand-800"
                  >
                    {popularPosts.length}
                  </Badge>
                </div>
              </button>
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedCategory === category.name
                      ? "bg-brand-100 text-brand-800"
                      : "hover:bg-brand-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.name}</span>
                    <Badge
                      variant="secondary"
                      className="text-xs bg-brand-100 text-brand-800"
                    >
                      {category.count}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Posts */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-accent-500" />
              Trending Articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularPosts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="flex items-start space-x-3 group hover:bg-brand-50 p-2 rounded-lg transition-colors"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <span className="w-6 h-6 bg-gradient-to-br from-brand-500 to-accent-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                        {index + 1}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                    </div>
                    <h4 className="font-medium line-clamp-2 mb-1 group-hover:text-brand-600 transition-colors">
                      {post.title}
                    </h4>
                    <div className="flex items-center text-xs text-neutral-500">
                      <Eye className="h-3 w-3 mr-1" />
                      <span>1.2k views</span>
                      <span className="mx-2">•</span>
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Newsletter Signup */}
        <Card className="border-0 shadow-md bg-gradient-to-br from-brand-50 via-white to-accent-50">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
              <p className="text-neutral-600 text-sm">
                Get weekly English learning tips and new articles delivered to
                your inbox.
              </p>
            </div>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
              <Button className="w-full bg-gradient-to-r from-brand-500 to-accent-500 hover:from-brand-600 hover:to-accent-600">
                Subscribe Now
              </Button>
            </div>
            <p className="text-xs text-neutral-500 text-center mt-3">
              Join 15,000+ learners. Unsubscribe anytime.
            </p>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Bookmark className="h-5 w-5 mr-2 text-accent-500" />
              Popular Tags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs hover:bg-brand-100 hover:text-brand-800 hover:border-brand-200 cursor-pointer transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
