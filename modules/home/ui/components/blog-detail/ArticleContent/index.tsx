"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div className="prose prose-lg max-w-none mb-12">
      <div dangerouslySetInnerHTML={{ __html: content }} />

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
                  Consistent practice combined with real-world application is
                  the most effective way to master English language skills.
                  Focus on daily engagement rather than intensive cramming
                  sessions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
