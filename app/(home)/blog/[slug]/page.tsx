"use client";
import React, { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import {
  Calendar,
  User,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  MessageSquare,
  Heart,
  Eye,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  CheckCircle,
  Quote,
  BookOpen,
  Users,
  Award,
  Tag,
  Printer,
  FileText,
  ChevronDown,
  ChevronUp,
  Menu,
} from "lucide-react";
import Link from "next/link";
import {
  getBlogPostBySlug,
  getRelatedBlogPosts,
  getAllBlogPosts,
  getBlogPostWithTOC,
  addIdsToHeadings,
} from "@/app/util/blogData";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface TOCItem {
  id: string;
  title: string;
  level: number;
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

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  // Unwrap the params Promise using React.use()
  const { slug } = use(params);

  // State hooks must be called after unwrapping params
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "comments">(
    "overview"
  );
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentText, setCommentText] = useState("");
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

  // Get the blog post with table of contents using the unwrapped slug
  const blogPost = getBlogPostWithTOC(slug);

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleLikeComment = (commentId: number) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            liked: !comment.liked,
            likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
          };
        }
        return comment;
      })
    );
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName || !commentText) return;

    const newComment: Comment = {
      id: comments.length + 1,
      name: commentName,
      email: commentEmail,
      date: "Just now",
      verified: false,
      text: commentText,
      likes: 0,
      liked: false,
      replies: [],
    };

    setComments([newComment, ...comments]);
    setCommentName("");
    setCommentEmail("");
    setCommentText("");
  };

  // Table of contents from article headings
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tableOfContents = blogPost.tableOfContents || [];

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

  const shareButtons = [
    { icon: Facebook, name: "Facebook", color: "hover:text-blue-600" },
    { icon: Twitter, name: "Twitter", color: "hover:text-blue-400" },
    { icon: Linkedin, name: "LinkedIn", color: "hover:text-blue-700" },
  ];

  const articleStats = [
    { icon: Eye, value: "2.1k", label: "Views" },
    { icon: Heart, value: "156", label: "Likes" },
    {
      icon: MessageSquare,
      value: comments.length.toString(),
      label: "Comments",
    },
    { icon: Share2, value: "45", label: "Shares" },
  ];

  // ... rest of the component remains the same
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        {/* Hero Section with Background Image */}
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
                  className={`bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all ${isLiked ? "bg-red-500/80 hover:bg-red-500" : ""}`}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart
                    className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`}
                  />
                  {isLiked ? "Liked" : "Like"}
                </Button>
                <Button
                  variant="secondary"
                  className={`bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all ${isBookmarked ? "bg-brand-500/80 hover:bg-brand-500" : ""}`}
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
                  {showShareMenu && (
                    <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border p-4 min-w-48 z-10">
                      <div className="space-y-2">
                        {shareButtons.map((button, index) => (
                          <button
                            key={index}
                            className={`w-full flex items-center p-2 rounded-lg hover:bg-neutral-100 transition-colors ${button.color}`}
                          >
                            <button.icon className="h-4 w-4 mr-3" />
                            <span>{button.name}</span>
                          </button>
                        ))}
                        <button
                          onClick={handleCopyLink}
                          className="w-full flex items-center p-2 rounded-lg hover:bg-neutral-100 transition-colors hover:text-green-600"
                        >
                          {copiedLink ? (
                            <CheckCircle className="h-4 w-4 mr-3" />
                          ) : (
                            <Copy className="h-4 w-4 mr-3" />
                          )}
                          <span>
                            {copiedLink ? "Link Copied!" : "Copy Link"}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
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

        {/* Article Content with Sidebar */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <div className="lg:w-3/4">
                  {/* Collapsible Table of Contents */}
                  <Card className="border-0 shadow-md mb-8 sticky top-24 z-10">
                    <CardHeader
                      className="pb-3 cursor-pointer"
                      onClick={() => setIsTOCOpen(!isTOCOpen)}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-brand-500" />
                          Table of Contents
                        </CardTitle>
                        {isTOCOpen ? (
                          <ChevronUp className="h-5 w-5 text-neutral-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-neutral-500" />
                        )}
                      </div>
                    </CardHeader>
                    {isTOCOpen && (
                      <CardContent>
                        <nav>
                          <ul className="space-y-1">
                            {tableOfContents.map((item) => (
                              <li key={item.id}>
                                <button
                                  onClick={() => scrollToSection(item.id)}
                                  className={`w-full text-left py-2 px-3 rounded-lg transition-colors flex items-center ${
                                    activeSection === item.id
                                      ? "bg-brand-100 text-brand-700 font-medium"
                                      : "hover:bg-neutral-100 text-neutral-700"
                                  }`}
                                >
                                  <span
                                    className={`inline-block w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                                      activeSection === item.id
                                        ? "bg-brand-500"
                                        : "bg-neutral-300"
                                    }`}
                                  >
                                    {activeSection === item.id && (
                                      <div className="w-2 h-2 rounded-full bg-white"></div>
                                    )}
                                  </span>
                                  <span
                                    className={`${item.level === 1 ? "font-medium" : item.level === 2 ? "ml-2" : "ml-4 text-sm"}`}
                                  >
                                    {item.title}
                                  </span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </nav>
                      </CardContent>
                    )}
                  </Card>

                  {/* Main Article Content */}
                  <div className="prose prose-lg max-w-none mb-12">
                    <div dangerouslySetInnerHTML={{ __html: contentWithIds }} />

                    {/* Article Highlight Box */}
                    <div className="not-prose my-8">
                      <Card className="border-l-4 border-l-brand-500 bg-gradient-to-r from-brand-50 to-transparent shadow-md">
                        <CardContent className="p-6">
                          <div className="flex items-start">
                            <Quote className="h-6 w-6 text-brand-500 mr-4 mt-1 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold text-lg mb-2 text-brand-800">
                                Key Takeaway
                              </h4>
                              <p className="text-neutral-700">
                                Consistent practice combined with real-world
                                application is the most effective way to master
                                English language skills. Focus on daily
                                engagement rather than intensive cramming
                                sessions.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Article Feedback */}
                  <div className="mb-12">
                    <Card className="border-0 shadow-md">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-4">
                          Was this article helpful?
                        </h3>
                        <div className="flex items-center space-x-4 mb-4">
                          <Button
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            <ThumbsUp className="h-4 w-4" />
                            Yes (89%)
                          </Button>
                          <Button
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            <ThumbsDown className="h-4 w-4" />
                            No (11%)
                          </Button>
                        </div>
                        <p className="text-sm text-neutral-600">
                          Your feedback helps us improve our content quality.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

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

                  {/* Related Posts */}
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
                              <Link
                                href={`/blog/${post.slug}`}
                                className="hover:underline"
                              >
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

                  {/* Comments Section with Tabs */}
                  <div className="pt-8 border-t border-neutral-200">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center">
                        <h3 className="text-display-sm font-bold flex items-center mr-6">
                          <MessageSquare className="h-6 w-6 mr-3 text-brand-500" />
                          Discussion
                        </h3>
                        <Badge className="bg-brand-100 text-brand-800 border-0">
                          {comments.length} Comments
                        </Badge>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-neutral-200 mb-6">
                      <div className="flex space-x-6">
                        <button
                          onClick={() => setActiveTab("overview")}
                          className={`pb-3 px-1 font-medium text-sm ${activeTab === "overview" ? "text-brand-600 border-b-2 border-brand-600" : "text-neutral-500 hover:text-neutral-700"}`}
                        >
                          Overview
                        </button>
                        <button
                          onClick={() => setActiveTab("comments")}
                          className={`pb-3 px-1 font-medium text-sm ${activeTab === "comments" ? "text-brand-600 border-b-2 border-brand-600" : "text-neutral-500 hover:text-neutral-700"}`}
                        >
                          Comments ({comments.length})
                        </button>
                      </div>
                    </div>

                    {/* Tab Content */}
                    {activeTab === "comments" && (
                      <Card className="border-0 shadow-md">
                        <CardContent className="p-6">
                          {/* Comment Form */}
                          <div className="mb-8">
                            <h4 className="font-semibold mb-4 flex items-center">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Join the Discussion
                            </h4>
                            <form
                              onSubmit={handleSubmitComment}
                              className="space-y-4"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                  type="text"
                                  placeholder="Your Name"
                                  value={commentName}
                                  onChange={(e) =>
                                    setCommentName(e.target.value)
                                  }
                                  className="px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                  required
                                />
                                <Input
                                  type="email"
                                  placeholder="Your Email (optional)"
                                  value={commentEmail}
                                  onChange={(e) =>
                                    setCommentEmail(e.target.value)
                                  }
                                  className="px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                />
                              </div>
                              <Textarea
                                placeholder="Share your thoughts, questions, or experiences..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
                                required
                              ></Textarea>
                              <div className="flex items-center justify-between">
                                <p className="text-xs text-neutral-500">
                                  Comments are moderated and will appear after
                                  approval.
                                </p>
                                <Button
                                  type="submit"
                                  className="bg-brand-500 hover:bg-brand-600 px-6"
                                >
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Post Comment
                                </Button>
                              </div>
                            </form>
                          </div>

                          {/* Comments List */}
                          <div className="space-y-6">
                            {comments.map((comment) => (
                              <div
                                key={comment.id}
                                className="border-b border-neutral-100 pb-6 last:border-0 last:pb-0"
                              >
                                <div className="flex items-start gap-4">
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                                    <User className="h-5 w-5 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                      <span className="font-semibold">
                                        {comment.name}
                                      </span>
                                      {comment.verified && (
                                        <Badge
                                          variant="secondary"
                                          className="text-xs bg-brand-100 text-brand-800"
                                        >
                                          Verified Learner
                                        </Badge>
                                      )}
                                      <span className="text-xs text-neutral-500">
                                        {comment.date}
                                      </span>
                                    </div>
                                    <p className="text-neutral-700 mb-3">
                                      {comment.text}
                                    </p>
                                    <div className="flex items-center gap-3 text-sm">
                                      <button
                                        onClick={() =>
                                          handleLikeComment(comment.id)
                                        }
                                        className={`flex items-center gap-1 ${comment.liked ? "text-brand-600" : "text-neutral-500 hover:text-brand-600"} transition-colors`}
                                      >
                                        <ThumbsUp className="h-3 w-3" />
                                        <span>{comment.likes}</span>
                                      </button>
                                      <button className="text-neutral-500 hover:text-brand-600 transition-colors">
                                        Reply
                                      </button>
                                    </div>

                                    {/* Replies */}
                                    {comment.replies.length > 0 && (
                                      <div className="mt-4 ml-6 space-y-4 pl-4 border-l-2 border-neutral-100">
                                        {comment.replies.map((reply) => (
                                          <div
                                            key={reply.id}
                                            className="flex items-start gap-3"
                                          >
                                            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                                              <User className="h-4 w-4 text-neutral-600" />
                                            </div>
                                            <div className="flex-1">
                                              <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium text-sm">
                                                  {reply.name}
                                                </span>
                                                <span className="text-xs text-neutral-500">
                                                  {reply.date}
                                                </span>
                                              </div>
                                              <p className="text-neutral-700 text-sm mb-2">
                                                {reply.text}
                                              </p>
                                              <div className="flex items-center gap-2 text-xs">
                                                <button className="flex items-center gap-1 text-neutral-500 hover:text-brand-600 transition-colors">
                                                  <ThumbsUp className="h-3 w-3" />
                                                  <span>{reply.likes}</span>
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:w-1/4">
                  <div className="sticky top-24 space-y-8">
                    {/* Author Card */}
                    <Card className="border-0 shadow-md">
                      <CardContent className="p-6">
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <User className="h-8 w-8 text-white" />
                          </div>
                          <h3 className="font-bold text-lg">
                            {blogPost.author}
                          </h3>
                          <p className="text-sm text-neutral-600">
                            Expert Writer
                          </p>
                        </div>
                        <p className="text-neutral-700 text-sm mb-4">
                          Passionate English language educator with over 10
                          years of experience helping students achieve fluency
                          through innovative teaching methods.
                        </p>
                        <div className="flex items-center justify-between text-sm text-neutral-600 mb-4">
                          <div>
                            <div className="font-semibold">42</div>
                            <div>Articles</div>
                          </div>
                          <div>
                            <div className="font-semibold">8.2k</div>
                            <div>Followers</div>
                          </div>
                          <div>
                            <div className="font-semibold">4.8</div>
                            <div>Rating</div>
                          </div>
                        </div>
                        <Button className="w-full bg-brand-500 hover:bg-brand-600">
                          Follow Author
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Newsletter Signup */}
                    <Card className="border-0 shadow-md bg-gradient-to-br from-brand-50 via-white to-accent-50">
                      <CardContent className="p-6">
                        <div className="text-center mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <MessageSquare className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="font-bold text-lg mb-2">
                            Stay Updated
                          </h3>
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

                    {/* Popular Tags */}
                    <Card className="border-0 shadow-md">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <Tag className="h-5 w-5 mr-2 text-accent-500" />
                          Popular Tags
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {blogPost.tags.map((tag, index) => (
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
