"use client";

import React, { useState } from "react";

import { FeaturedArticles } from "@/modules/home/ui/components/blog/FeaturedArticles";
import { ArticleList } from "@/modules/home/ui/components/blog/ArticleList";
import { getAllBlogPosts, getAllCategories } from "@/app/util/blogData";
import { BlogHeroSection } from "../../sections/blog/BlogHeroSection";

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

  // Get data from util
  const blogPosts = getAllBlogPosts();
  const categories = getAllCategories();

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
        <BlogHeroSection
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
          </div>
        </div>
      </main>
    </div>
  );
}
