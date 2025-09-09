"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";

export function ArticleFeedback() {
  return (
    <div className="mb-12">
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4">
            Was this article helpful?
          </h3>
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="outline" className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4" />
              Yes (89%)
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
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
  );
}
