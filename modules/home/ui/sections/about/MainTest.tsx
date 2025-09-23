"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CircleCheck, TrendingUp } from "lucide-react";
import Image from "next/image";
import { ReactSVG } from "react-svg";
import { trpc } from "@/trpc/client";
import { ICON_URL_FALLBACK } from "@/constants";

interface CompanyInfo {
  paragraph1?: string;
  paragraph2?: string;
}

interface MainContentSectionProps {
  companyInfo?: CompanyInfo;
}

// Loading skeleton component for stats
const StatsLoading = () => (
  <div className="grid grid-cols-2 gap-4">
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="bg-white p-6 rounded-xl shadow-md text-center border-t-4 border-neutral-200 animate-pulse"
      >
        <div className="h-8 md:h-10 bg-neutral-200 rounded mb-2"></div>
        <div className="h-4 bg-neutral-200 rounded w-3/4 mx-auto"></div>
      </div>
    ))}
  </div>
);

// Loading skeleton component for principles
const PrinciplesLoading = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {[...Array(4)].map((_, i) => (
      <Card key={i} className="border-0 shadow-md bg-white animate-pulse">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-neutral-200 rounded-full flex-shrink-0"></div>
            <div className="flex-1">
              <div className="h-5 bg-neutral-200 rounded mb-2 w-3/4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-neutral-200 rounded"></div>
                <div className="h-3 bg-neutral-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export function MainContentSection2({ companyInfo }: MainContentSectionProps) {
  const { data: stats, isLoading: isLoadingStats } =
    trpc.statistics.getMany.useQuery();
  const { data: principles, isLoading: isLoadingPrinciples } =
    trpc.principles.getMany.useQuery();

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
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mx-auto">
          {/* Left Side - Company About */}
          <div className="space-y-8">
            {/* Image added at the top */}
            <div className="">
              <Image
                src="/about/about.png"
                alt="Company visual"
                className="w-full h-full object-cover rounded-2xl shadow-lg"
                width={500}
                height={500}
              />
            </div>

            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-brand-500 hover:shadow-xl transition-shadow duration-300">
                <p className="text-lg text-neutral-700 leading-relaxed">
                  {content.paragraph1}
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-accent-500 hover:shadow-xl transition-shadow duration-300">
                <p className="text-lg text-neutral-700 leading-relaxed">
                  {content.paragraph2}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Stats & Values */}
          <div className="space-y-12">
            {/* Stats Section */}
            <div className="">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-success-100 to-success-200 flex items-center justify-center mr-4 shadow-lg">
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

              {isLoadingStats ? (
                <StatsLoading />
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {stats?.map((stat, index) => (
                    <div
                      key={stat.id}
                      className="group bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition-all duration-300 border-t-4 border-success-500 hover:border-success-600 hover:-translate-y-1"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: "fadeInUp 0.6s ease-out forwards",
                      }}
                    >
                      {/* Icon */}
                      <div className="flex justify-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-success-100 to-success-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <ReactSVG
                            src={stat.iconUrl || ICON_URL_FALLBACK}
                            beforeInjection={(svg) => {
                              svg.setAttribute(
                                "class",
                                "w-5 h-5 stroke-success-700"
                              );
                              svg.setAttribute("stroke-width", "2");
                            }}
                          />
                        </div>
                      </div>

                      {/* Value */}
                      <div className="text-2xl md:text-3xl font-bold text-success-600 mb-2 group-hover:text-success-700 transition-colors">
                        {stat.value}
                      </div>

                      {/* Label */}
                      <div className="text-neutral-600 font-medium text-sm group-hover:text-neutral-700 transition-colors">
                        {stat.label}
                      </div>

                      {/* Description if available */}
                      {stat.description && (
                        <div className="text-xs text-neutral-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {stat.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Values Section */}
            <div>
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-100 to-accent-200 flex items-center justify-center mr-4 shadow-lg">
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

              {isLoadingPrinciples ? (
                <PrinciplesLoading />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {principles?.map((principle, index) => {
                    return (
                      <Card
                        key={principle.id || index}
                        className="group border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-1 overflow-hidden"
                        style={{
                          animationDelay: `${index * 150}ms`,
                          animation: "fadeInUp 0.6s ease-out forwards",
                        }}
                      >
                        <CardContent className="p-6 relative">
                          {/* Background pattern */}
                          <div className="absolute top-0 right-0 w-20 h-20 opacity-5 group-hover:opacity-20 transition-opacity duration-300">
                            <ReactSVG
                              src={principle.iconUrl || ICON_URL_FALLBACK}
                              beforeInjection={(svg) => {
                                svg.setAttribute(
                                  "class",
                                  "w-full h-full stroke-accent-600"
                                );
                                svg.setAttribute("stroke-width", "1");
                              }}
                            />
                          </div>

                          <div className="flex items-start space-x-4 relative z-10">
                            {/* Icon */}
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-100 to-accent-200 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">
                              <ReactSVG
                                src={principle.iconUrl || ICON_URL_FALLBACK}
                                className="w-6 h-6 [&>div>svg]:stroke-accent-700 [&>div>svg]:w-6 [&>div>svg]:h-6"
                              />
                            </div>

                            <div className="flex-1">
                              {/* Title */}
                              <h4 className="font-bold text-lg mb-2 text-neutral-900 group-hover:text-accent-800 transition-colors duration-300">
                                {principle.title}
                              </h4>

                              {/* Subtitle */}
                              <p className="text-neutral-600 text-sm leading-relaxed group-hover:text-neutral-700 transition-colors duration-300">
                                {principle.subtitle}
                              </p>
                            </div>
                          </div>

                          {/* Hover border effect */}
                          <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent-200 rounded-lg transition-colors duration-300 pointer-events-none"></div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
