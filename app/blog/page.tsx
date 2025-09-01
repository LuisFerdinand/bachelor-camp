"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Calendar,
  User,
  Clock,
  Search,
  ChevronRight,
  Bookmark,
  BookOpen,
  MessageSquare,
  Star,
  TrendingUp,
  Grid,
  List,
  ArrowRight,
  Eye,
} from "lucide-react";
import Link from "next/link";
import {
  getAllBlogPosts,
  getAllCategories,
  getAllTags,
} from "@/app/util/blogData";

// Define TypeScript interfaces for the CMS data
interface CMSImage {
  url: string;
  alt: string;
}

interface BlogPageCMSData {
  heroMobileImage?: CMSImage;
  heroDesktopImage?: CMSImage;
}

interface BlogPageProps {
  cmsData?: BlogPageCMSData;
}

export default function BlogPage({ cmsData }: BlogPageProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get hero images with fallbacks to Unsplash images
  const heroImages = {
    mobile: {
      src:
        cmsData?.heroMobileImage?.url ||
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      alt:
        cmsData?.heroMobileImage?.alt || "English learning books - mobile view",
    },
    desktop: {
      src:
        cmsData?.heroDesktopImage?.url ||
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      alt:
        cmsData?.heroDesktopImage?.alt ||
        "English learning resources - desktop view",
    },
  };

  // Get data from util
  const blogPosts = getAllBlogPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.slice(0, 3);
  const stats = [
    { value: "200+", label: "Articles", icon: BookOpen },
    { value: "50K+", label: "Readers", icon: User },
    { value: "15", label: "Categories", icon: TrendingUp },
    { value: "4.9", label: "Rating", icon: Star },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background Images */}
          <div className="absolute inset-0">
            {/* Mobile Background */}
            <div className="block md:hidden absolute inset-0">
              <Image
                src={heroImages.mobile.src}
                alt={heroImages.mobile.alt}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Desktop Background */}
            <div className="hidden md:block absolute inset-0">
              <Image
                src={heroImages.desktop.src}
                alt={heroImages.desktop.alt}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/60"></div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30 border border-white/30 backdrop-blur-sm px-4 py-2">
                <BookOpen className="w-4 h-4 mr-2" />
                Knowledge Center
              </Badge>
              <h1 className="text-display-md md:text-display-xl font-bold mb-6 text-white drop-shadow-lg">
                English Learning Hub
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md leading-relaxed">
                Discover expert tips, proven strategies, and actionable insights
                to accelerate your English learning journey.
              </p>

              {/* Enhanced Search Bar */}
              <div className="relative max-w-2xl mx-auto mb-12">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search articles, topics, or tips..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-4 pr-14 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-lg"
                  />
                  <Search className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white h-6 w-6" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button
                  size="lg"
                  className="bg-brand-500 hover:bg-brand-600 text-white shadow-brand px-8 py-3 text-base font-semibold"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse All Articles
                </Button>
                <Button
                  size="lg"
                  className="bg-accent-500 hover:bg-accent-600 text-white shadow-accent px-8 py-3 text-base font-semibold"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Subscribe to Updates
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-brand-600 px-8 py-3 text-base font-semibold transition-all"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Trending Topics
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
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
                Hand-picked articles that have helped thousands of students
                improve their English skills.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {featuredPosts.map((post, index) => (
                <Card
                  key={post.id}
                  className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer ${index === 0 ? "md:col-span-3 md:grid md:grid-cols-2 md:gap-8" : ""}`}
                >
                  <Link href={`/blog/${post.slug}`} className="contents">
                    <div
                      className={`relative ${index === 0 ? "md:h-auto h-64" : "h-48"} overflow-hidden`}
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
                      className={`p-6 ${index === 0 ? "flex flex-col justify-center" : ""}`}
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
                              {index === 0 ? post.author : post.author.split(' ')[0]}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span className="whitespace-nowrap">
                              {index === 0 ? post.date : post.date.split(' ')[0]}
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
        {/* Main Content Area */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="lg:w-2/3">
                <div className="mb-8">
                  {/* Enhanced Header with Search Bar */}
                  <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <h2 className="text-display-sm font-bold">
                          All Articles
                        </h2>
                        <Badge className="bg-brand-100 text-brand-800 border-0">
                          {filteredPosts.length} Articles
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant={viewMode === "grid" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setViewMode("grid")}
                          className="h-9"
                        >
                          <Grid className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={viewMode === "list" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setViewMode("list")}
                          className="h-9"
                        >
                          <List className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="relative max-w-xl">
                      <Input
                        type="text"
                        placeholder="Search articles by title, content, or tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 pr-12 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent shadow-sm"
                      />
                      <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm("")}
                          className="absolute right-12 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                    </div>
                    
                    {/* Active Filters Display */}
                    {(searchTerm || selectedCategory) && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="text-sm text-neutral-500">Active filters:</span>
                        {searchTerm && (
                          <Badge variant="secondary" className="gap-1">
                            Search: {searchTerm}
                            <button
                              onClick={() => setSearchTerm("")}
                              className="ml-1 rounded-full hover:bg-neutral-200"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </Badge>
                        )}
                        {selectedCategory && (
                          <Badge variant="secondary" className="gap-1">
                            Category: {selectedCategory}
                            <button
                              onClick={() => setSelectedCategory(null)}
                              className="ml-1 rounded-full hover:bg-neutral-200"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </Badge>
                        )}
                        <button
                          onClick={() => {
                            setSearchTerm("");
                            setSelectedCategory(null);
                          }}
                          className="text-sm text-brand-600 hover:text-brand-800 flex items-center"
                        >
                          Clear all filters
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 gap-8"
                        : "space-y-6"
                    }
                  >
                    {filteredPosts.map((post) => (
                      <Card
                        key={post.id}
                        className={`border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer ${viewMode === "list" ? "md:grid md:grid-cols-3 md:gap-6" : ""}`}
                      >
                        <Link href={`/blog/${post.slug}`} className="contents">
                          <div
                            className={`relative ${viewMode === "list" ? "h-48 md:h-auto" : "h-48"} overflow-hidden`}
                          >
                            <Image
                              src={post.image}
                              alt={post.imageAlt}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-brand-500 text-white">
                                {post.category}
                              </Badge>
                            </div>
                            <div className="absolute top-4 right-4 flex gap-2">
                              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                                <Bookmark className="h-4 w-4 text-white cursor-pointer hover:text-brand-300 transition-colors" />
                              </div>
                            </div>
                          </div>
                          <CardContent
                            className={`p-6 ${viewMode === "list" ? "md:col-span-2 flex flex-col justify-between" : ""}`}
                          >
                            <div>
                              <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors">
                                {post.title}
                              </h3>
                              <p className="text-neutral-600 mb-4 line-clamp-3">
                                {post.excerpt}
                              </p>
                            </div>
                            <div>
                              <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
                                <div className="flex items-center">
                                  <User className="h-4 w-4 mr-1" />
                                  <span>{post.author}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    <span>{post.date}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    <span>{post.readTime}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between text-brand-600 hover:text-brand-800 transition-colors">
                                <span className="font-medium">Read Article</span>
                                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </CardContent>
                        </Link>
                      </Card>
                    ))}
                  </div>
                  {filteredPosts.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-4">📝</div>
                      <h3 className="text-xl font-semibold mb-2">
                        No articles found
                      </h3>
                      <p className="text-neutral-600 mb-6">
                        Try adjusting your search terms or category filter.
                      </p>
                      <Button
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory(null);
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                  {filteredPosts.length > 0 && (
                    <div className="mt-12 text-center">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-brand-500 to-accent-500 hover:from-brand-600 hover:to-accent-600 text-white px-8 py-3 text-base font-semibold"
                      >
                        Load More Articles
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              {/* Enhanced Sidebar */}
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
                          className={`w-full text-left p-3 rounded-lg transition-colors ${!selectedCategory ? "bg-brand-100 text-brand-800" : "hover:bg-brand-50"}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">All Categories</span>
                            <Badge
                              variant="secondary"
                              className="text-xs bg-brand-100 text-brand-800"
                            >
                              {blogPosts.length}
                            </Badge>
                          </div>
                        </button>
                        {categories.map((category, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedCategory(category.name)}
                            className={`w-full text-left p-3 rounded-lg transition-colors ${selectedCategory === category.name ? "bg-brand-100 text-brand-800" : "hover:bg-brand-50"}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">
                                {category.name}
                              </span>
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
                        {blogPosts.slice(0, 4).map((post, index) => (
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
                          Get weekly English learning tips and new articles
                          delivered to your inbox.
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}