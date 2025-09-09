// modules/home/ui/components/blog-detail/Sidebar/index.tsx
"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { User, MessageSquare, Tag } from "lucide-react";
import { BlogPost, AuthorDetails } from "@/app/util/blogData";

interface SidebarProps {
  blogPost: BlogPost;
  tags: string[];
  authorDetails: AuthorDetails;
}

export function Sidebar({ /*blogPost*/ tags, authorDetails }: SidebarProps) {
  // Helper function to format followers count
  const formatFollowers = (count: number): string => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count.toString();
  };

  return (
    <div className="lg:w-1/4">
      <div className="sticky top-24 space-y-8">
        {/* Author Card */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg">{authorDetails.name}</h3>
              <p className="text-sm text-neutral-600">Expert Writer</p>
            </div>
            <p className="text-neutral-700 text-sm mb-4">
              {authorDetails.bio}
            </p>
            <div className="flex items-center justify-between text-sm text-neutral-600 mb-4">
              <div>
                <div className="font-semibold">{authorDetails.articleCount}</div>
                <div>Articles</div>
              </div>
              <div>
                <div className="font-semibold">{formatFollowers(authorDetails.followers)}</div>
                <div>Followers</div>
              </div>
              <div>
                <div className="font-semibold">{authorDetails.rating}</div>
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