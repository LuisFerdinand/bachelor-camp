"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, MessageSquare } from "lucide-react";

interface CTASectionProps {
  title: string;
  description: string;
  buttonTexts: string[];
}

export function CTASection({ title, description, buttonTexts }: CTASectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900/20 to-accent-900/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto text-white">
          <div className="text-5xl mb-6">🎓</div>
          <h2 className="text-display-sm md:text-display-md font-bold mb-6">
            {title}
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-white text-brand-600 hover:bg-neutral-100 shadow-xl font-semibold px-8 py-4 text-base"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              {buttonTexts[0]}
            </Button>
            <Button
              size="lg"
              className="bg-accent-600 hover:bg-accent-700 text-white shadow-xl font-semibold px-8 py-4 text-base"
            >
              <Users className="w-5 h-5 mr-2" />
              {buttonTexts[1]}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-brand-600 font-semibold px-8 py-4 text-base transition-all"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              {buttonTexts[2]}
            </Button>
          </div>
          <div className="pt-8 border-t border-white/20">
            <Card className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border-0">
              <CardContent className="p-0">
                <div className="text-3xl mb-3">💡</div>
                <p className="text-white/90 font-medium">
                  <strong className="text-white">Pro tip:</strong> Schedule a
                  campus tour to experience our facilities and meet our
                  instructors in person
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}