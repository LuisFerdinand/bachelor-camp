"use client";

import React, { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Users, MessageSquare, BookOpen, Tag } from "lucide-react";
import {
  getBlogPostBySlug,
  getRelatedBlogPosts,
  getAllBlogPosts,
  getBlogPostWithTOC,
  addIdsToHeadings,
  AuthorDetails,
} from "@/app/util/blogData";
import { HeroSection } from "@/modules/home/ui/components/blog-detail/HeroSection";
import { TableOfContents } from "@/modules/home/ui/components/blog-detail/TableOfContents";
import { ArticleContent } from "@/modules/home/ui/components/blog-detail/ArticleContent";
import { ArticleFeedback } from "@/modules/home/ui/components/blog-detail/ArticleFeedback";
import { RelatedPosts } from "@/modules/home/ui/components/blog-detail/RelatedPosts";
import { CommentsSection } from "@/modules/home/ui/components/blog-detail/CommentsSection";
import { Sidebar } from "@/modules/home/ui/components/blog-detail/Sidebar";

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

interface Comment {
  id: number;
  name: string;
  email: string;
  date: string;
  verified: boolean;
  text: string;
  likes: number;
  liked: boolean;
  replies: Reply[];
}

interface Reply {
  id: number;
  name: string;
  date: string;
  text: string;
  likes: number;
  liked: boolean;
}

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  // State hooks must be called first
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "comments">(
    "overview"
  );
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      date: "2 days ago",
      verified: true,
      text: "This article was incredibly helpful! I've been struggling with vocabulary retention, and these memory techniques are making a real difference in my daily practice sessions.",
      likes: 12,
      liked: false,
      replies: [
        {
          id: 101,
          name: "Sarah Williams",
          date: "1 day ago",
          text: "I agree! The visualization technique mentioned in section 3 has been a game-changer for me too.",
          likes: 5,
          liked: false,
        },
      ],
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria@example.com",
      date: "5 days ago",
      verified: false,
      text: "Great insights! I've been looking for structured approaches to vocabulary building. Would love to see a follow-up article on advanced techniques.",
      likes: 8,
      liked: false,
      replies: [],
    },
  ]);

  // Table of Contents state
  const [isTOCOpen, setIsTOCOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Get the blog post with table of contents
  const blogPost = getBlogPostWithTOC(params.slug);

  // Now you can conditionally return after all hooks have been called
  if (!blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-accent-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-6">📝</div>
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-neutral-600 mb-8">
            The article you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link href="/blog">
            <Button className="bg-brand-500 hover:bg-brand-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Add IDs to headings in the content
  const contentWithIds = addIdsToHeadings(
    blogPost.content,
    blogPost.tableOfContents || []
  );

  // Get related posts using the util function
  const relatedPosts = getRelatedBlogPosts(blogPost.id, 3);
  const allPosts = getAllBlogPosts();
  const currentIndex = allPosts.findIndex((post) => post.id === blogPost.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Table of contents from article headings
  const tableOfContents = blogPost.tableOfContents || [];

  // Mock author details (you might want to get this from your data source)
  const authorDetails: AuthorDetails = {
    name: blogPost.author || "Expert Writer",
    bio: "Passionate about helping students master English through innovative teaching methods and practical learning strategies.",
    articleCount: 42,
    followers: 2500,
    rating: 4.8,
  };

  // Handle navigation to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Close TOC on mobile after navigation
      if (window.innerWidth < 768) {
        setIsTOCOpen(false);
      }

      // Scroll to element
      window.scrollTo({
        top: element.offsetTop - 100, // Offset for sticky header
        behavior: "smooth",
      });

      // Set active section
      setActiveSection(sectionId);
    }
  };

  // Set up intersection observer to track active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    tableOfContents.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      tableOfContents.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [tableOfContents]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        <HeroSection
          blogPost={blogPost}
          isBookmarked={isBookmarked}
          setIsBookmarked={setIsBookmarked}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
          showShareMenu={showShareMenu}
          setShowShareMenu={setShowShareMenu}
          commentsCount={comments.length}
        />

        {/* Article Content with Sidebar */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <div className="lg:w-3/4">
                  <TableOfContents
                    tableOfContents={tableOfContents}
                    isTOCOpen={isTOCOpen}
                    setIsTOCOpen={setIsTOCOpen}
                    activeSection={activeSection}
                    scrollToSection={scrollToSection}
                  />

                  {/* Updated ArticleContent component call */}
                  <ArticleContent blogPost={blogPost} />
                  <ArticleFeedback />

                  {/* Tags */}
                  <div className="mb-12 pt-6 border-t border-neutral-200">
                    <h3 className="font-semibold mb-4 flex items-center">
                      <Tag className="h-5 w-5 mr-2 text-accent-500" />
                      Article Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {blogPost.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="hover:bg-brand-100 hover:text-brand-800 hover:border-brand-200 cursor-pointer transition-colors px-3 py-1"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Between Posts */}
                  <div className="mb-12 pt-8 border-t border-neutral-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {prevPost && (
                        <Link href={`/blog/${prevPost.slug}`}>
                          <Card className="border-0 shadow-md hover:shadow-lg transition-all group cursor-pointer h-full">
                            <CardContent className="p-6 h-full flex flex-col">
                              <div className="flex items-center mb-2">
                                <ArrowLeft className="h-4 w-4 mr-2 text-neutral-400" />
                                <span className="text-sm text-neutral-600">
                                  Previous Article
                                </span>
                              </div>
                              <h4 className="font-semibold group-hover:text-brand-600 transition-colors line-clamp-2 mt-auto">
                                {prevPost.title}
                              </h4>
                            </CardContent>
                          </Card>
                        </Link>
                      )}
                      {nextPost && (
                        <Link href={`/blog/${nextPost.slug}`}>
                          <Card className="border-0 shadow-md hover:shadow-lg transition-all group cursor-pointer h-full">
                            <CardContent className="p-6 h-full flex flex-col">
                              <div className="flex items-center justify-end mb-2">
                                <span className="text-sm text-neutral-600">
                                  Next Article
                                </span>
                                <ArrowLeft className="h-4 w-4 ml-2 text-neutral-400 rotate-180" />
                              </div>
                              <h4 className="font-semibold group-hover:text-brand-600 transition-colors line-clamp-2 mt-auto text-right">
                                {nextPost.title}
                              </h4>
                            </CardContent>
                          </Card>
                        </Link>
                      )}
                    </div>
                  </div>

                  <RelatedPosts relatedPosts={relatedPosts} />
                  <CommentsSection
                    comments={comments}
                    setComments={setComments}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                </div>

                {/* Updated Sidebar component call */}
                <Sidebar
                  blogPost={blogPost}
                  tags={blogPost.tags}
                  authorDetails={authorDetails}
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/20 to-accent-900/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto text-white">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-display-sm md:text-display-md font-bold mb-6">
                Ready to Take Your English Further?
              </h2>
              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
                Join thousands of learners who&apos;ve transformed their English
                skills with our comprehensive programs and expert guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  size="lg"
                  className="bg-white text-brand-600 hover:bg-neutral-100 shadow-xl font-semibold px-8 py-4 text-base"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Explore Courses
                </Button>
                <Button
                  size="lg"
                  className="bg-accent-600 hover:bg-accent-700 text-white shadow-xl font-semibold px-8 py-4 text-base"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Get Free Consultation
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-brand-600 font-semibold px-8 py-4 text-base transition-all"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Download Guide
                </Button>
              </div>
              <div className="pt-8 border-t border-white/20">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
                  <p className="text-white/90 font-medium">
                    <strong className="text-white">Stay Updated:</strong>{" "}
                    Subscribe to our newsletter for weekly English tips and
                    exclusive learning resources
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
