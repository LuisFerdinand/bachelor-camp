"use client";

import React, { useState } from "react";
import { HeroSection } from "@/modules/home/ui/components/blog/HeroSection";
import { FeaturedArticles } from "@/modules/home/ui/components/blog/FeaturedArticles";
import { ArticleList } from "@/modules/home/ui/components/blog/ArticleList";
import { Sidebar } from "@/modules/home/ui/components/blog/Sidebar";
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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        <HeroSection
          heroImages={heroImages}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <FeaturedArticles featuredPosts={featuredPosts} />

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <ArticleList
              filteredPosts={filteredPosts}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />

            <Sidebar
              categories={categories}
              tags={tags}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              popularPosts={blogPosts.slice(0, 4)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
