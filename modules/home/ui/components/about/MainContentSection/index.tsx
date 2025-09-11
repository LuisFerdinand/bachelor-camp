"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, TrendingUp } from "lucide-react";
import Image from "next/image";

interface Value {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
}

interface Stat {
  id: number;
  value: string;
  label: string;
}

interface CompanyInfo {
  paragraph1?: string;
  paragraph2?: string;
}

interface MainContentSectionProps {
  values: Value[];
  stats: Stat[];
  companyInfo?: CompanyInfo;
}

export function MainContentSection({
  values,
  stats,
  companyInfo,
}: MainContentSectionProps) {
  // Default company information
  const defaultCompanyInfo = {
    paragraph1:
      "Founded with a passion for excellence in education, we have grown to become one of the leading English language institutions in Southeast Asia. Our commitment to innovative teaching methods and personalized learning experiences has helped thousands of students achieve their academic and professional goals.",
    paragraph2:
      "We believe that language learning is more than just grammar and vocabulary - it's about building confidence, fostering global connections, and opening doors to new opportunities. Our diverse community of students and expert instructors creates an environment where learning thrives and friendships flourish across cultures.",
  };

  const content = companyInfo || defaultCompanyInfo;

  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 to-brand-50/30">
      <div className="container mx-auto px-4">
        {/* Unified Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-brand-100 text-brand-800 border-0">
            <BookOpen className="w-4 h-4 mr-2" />
            About Our Institution
          </Badge>
          <h2 className="text-display-sm md:text-display-md font-bold">
            Empowering Students Through Excellence & Values
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Left Side - Company About */}
          <div className="space-y-8">
            {/* Image added at the top */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <Image
                src="/home/banner.png"
                alt="Company visual"
                className="w-full h-64 object-cover"
                width={1000}
                height={1000}
              />
            </div>

            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-brand-500">
                <p className="text-lg text-neutral-700 leading-relaxed">
                  {content.paragraph1}
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-accent-500">
                <p className="text-lg text-neutral-700 leading-relaxed">
                  {content.paragraph2}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Stats & Values */}
          <div className="space-y-12">
            {/* Stats Section */}
            <div>
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-full bg-success-100 flex items-center justify-center mr-4">
                  <TrendingUp className="w-6 h-6 text-success-700" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900">
                    Our Impact
                  </h3>
                  <p className="text-neutral-600">
                    Numbers that speak for themselves
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.id}
                    className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 border-t-4 border-success-800"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-success-500 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-neutral-600 font-medium text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Values Section */}
            <div>
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center mr-4">
                  <BookOpen className="w-6 h-6 text-accent-700" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900">
                    Guiding Principles
                  </h3>
                  <p className="text-neutral-600">
                    Values that drive our mission
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {values.map((value, index) => {
                  const IconComponent = value.icon;
                  return (
                    <Card
                      key={index}
                      className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div
                            className={`w-12 h-12 rounded-full ${value.color} flex items-center justify-center flex-shrink-0`}
                          >
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg mb-2">
                              {value.title}
                            </h4>
                            <p className="text-neutral-600 text-sm leading-relaxed">
                              {value.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
