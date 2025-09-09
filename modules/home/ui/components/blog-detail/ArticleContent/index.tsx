// modules/home/ui/components/blog-detail/ArticleContent/index.tsx
"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { BlogPost } from "@/app/util/blogData";

interface ArticleContentProps {
  blogPost: BlogPost;
}

export function ArticleContent({ blogPost }: ArticleContentProps) {
  return (
    <div className="prose prose-lg max-w-none mb-12">
      <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
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
                  {blogPost.keyTakeaway}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}