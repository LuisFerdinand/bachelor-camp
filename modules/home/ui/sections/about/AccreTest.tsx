"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Shield,
  CheckCircle,
  Globe,
  BookOpen,
  GraduationCap,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import { trpc } from "@/trpc/client";
import { PRODUCT_IMAGE_FALLBACK } from "@/constants";

const BritishCouncilIcon = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="20" fill="currentColor" opacity="0.1" />
    <circle cx="50" cy="35" r="15" fill="currentColor" opacity="0.8" />
    <rect
      x="25"
      y="55"
      width="50"
      height="8"
      rx="4"
      fill="currentColor"
      opacity="0.6"
    />
    <rect
      x="30"
      y="70"
      width="40"
      height="6"
      rx="3"
      fill="currentColor"
      opacity="0.4"
    />
    <path
      d="M35 25 L50 15 L65 25"
      stroke="currentColor"
      strokeWidth="3"
      fill="none"
      opacity="0.7"
    />
  </svg>
);

const CambridgeIcon = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="20" fill="currentColor" opacity="0.1" />
    <path
      d="M20 30 L50 15 L80 30 L80 60 L50 75 L20 60 Z"
      fill="currentColor"
      opacity="0.2"
    />
    <circle cx="50" cy="45" r="12" fill="currentColor" opacity="0.8" />
    <path d="M40 45 L47 52 L60 35" stroke="white" strokeWidth="3" fill="none" />
    <rect
      x="35"
      y="65"
      width="30"
      height="4"
      rx="2"
      fill="currentColor"
      opacity="0.6"
    />
  </svg>
);

const TOEFLIcon = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="20" fill="currentColor" opacity="0.1" />
    <rect
      x="20"
      y="25"
      width="60"
      height="50"
      rx="8"
      fill="currentColor"
      opacity="0.2"
    />
    <circle cx="35" cy="45" r="8" fill="currentColor" opacity="0.7" />
    <circle cx="65" cy="45" r="8" fill="currentColor" opacity="0.7" />
    <path
      d="M25 60 Q50 70 75 60"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
      opacity="0.8"
    />
    <rect
      x="45"
      y="15"
      width="10"
      height="15"
      rx="5"
      fill="currentColor"
      opacity="0.6"
    />
  </svg>
);

const IELTSIcon = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="20" fill="currentColor" opacity="0.1" />
    <circle
      cx="50"
      cy="40"
      r="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      opacity="0.6"
    />
    <circle cx="50" cy="40" r="12" fill="currentColor" opacity="0.8" />
    <path
      d="M30 65 L70 65"
      stroke="currentColor"
      strokeWidth="6"
      opacity="0.7"
    />
    <path
      d="M35 75 L65 75"
      stroke="currentColor"
      strokeWidth="4"
      opacity="0.5"
    />
    <circle cx="35" cy="25" r="3" fill="currentColor" opacity="0.8" />
    <circle cx="65" cy="25" r="3" fill="currentColor" opacity="0.8" />
  </svg>
);

// Enhanced fallback icon mapping with custom SVGs
const getFallbackIcon = (title: string, className = "w-16 h-16") => {
  const titleLower = title.toLowerCase();

  if (titleLower.includes("british council")) {
    return <BritishCouncilIcon className={className} />;
  } else if (titleLower.includes("cambridge")) {
    return <CambridgeIcon className={className} />;
  } else if (titleLower.includes("toefl")) {
    return <TOEFLIcon className={className} />;
  } else if (titleLower.includes("ielts")) {
    return <IELTSIcon className={className} />;
  } else if (
    titleLower.includes("council") ||
    titleLower.includes("assessment")
  ) {
    return <Shield className={className} />;
  } else if (
    titleLower.includes("education") ||
    titleLower.includes("language")
  ) {
    return <BookOpen className={className} />;
  } else if (
    titleLower.includes("university") ||
    titleLower.includes("academic")
  ) {
    return <GraduationCap className={className} />;
  } else {
    return <Award className={className} />;
  }
};

function getAccreditationColor(title: string) {
  const titleLower = title.toLowerCase();

  // Predefined color schemes for specific accreditations
  if (titleLower.includes("british council")) {
    return {
      background: "hsl(220, 50%, 98%)",
      iconBg: "hsl(220, 45%, 94%)",
      icon: "hsl(220, 60%, 50%)",
      border: "hsl(220, 40%, 88%)",
      accent: "hsl(220, 55%, 45%)",
      gradient:
        "linear-gradient(135deg, hsl(220, 50%, 98%) 0%, hsl(220, 45%, 96%) 100%)",
    };
  } else if (titleLower.includes("cambridge")) {
    return {
      background: "hsl(195, 50%, 98%)",
      iconBg: "hsl(195, 45%, 94%)",
      icon: "hsl(195, 60%, 50%)",
      border: "hsl(195, 40%, 88%)",
      accent: "hsl(195, 55%, 45%)",
      gradient:
        "linear-gradient(135deg, hsl(195, 50%, 98%) 0%, hsl(195, 45%, 96%) 100%)",
    };
  } else if (titleLower.includes("toefl")) {
    return {
      background: "hsl(270, 50%, 98%)",
      iconBg: "hsl(270, 45%, 94%)",
      icon: "hsl(270, 60%, 50%)",
      border: "hsl(270, 40%, 88%)",
      accent: "hsl(270, 55%, 45%)",
      gradient:
        "linear-gradient(135deg, hsl(270, 50%, 98%) 0%, hsl(270, 45%, 96%) 100%)",
    };
  } else if (titleLower.includes("ielts")) {
    return {
      background: "hsl(160, 50%, 98%)",
      iconBg: "hsl(160, 45%, 94%)",
      icon: "hsl(160, 60%, 50%)",
      border: "hsl(160, 40%, 88%)",
      accent: "hsl(160, 55%, 45%)",
      gradient:
        "linear-gradient(135deg, hsl(160, 50%, 98%) 0%, hsl(160, 45%, 96%) 100%)",
    };
  }

  // Fallback hash-based color generation
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = (hash % 60) * 6;

  return {
    background: `hsl(${hue}, 50%, 98%)`,
    iconBg: `hsl(${hue}, 45%, 94%)`,
    icon: `hsl(${hue}, 60%, 50%)`,
    border: `hsl(${hue}, 40%, 88%)`,
    accent: `hsl(${hue}, 55%, 45%)`,
    gradient: `linear-gradient(135deg, hsl(${hue}, 50%, 98%) 0%, hsl(${hue}, 45%, 96%) 100%)`,
  };
}

// Loading skeleton for accreditations
const AccreditationsLoading = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {[...Array(4)].map((_, i) => (
      <Card key={i} className="border-0 shadow-lg animate-pulse">
        <CardContent className="p-8 text-center">
          <div className="w-24 h-24 rounded-3xl bg-neutral-200 mx-auto mb-6"></div>
          <div className="h-6 bg-neutral-200 rounded mb-3 w-3/4 mx-auto"></div>
          <div className="space-y-2">
            <div className="h-4 bg-neutral-200 rounded"></div>
            <div className="h-4 bg-neutral-200 rounded w-5/6 mx-auto"></div>
            <div className="h-4 bg-neutral-200 rounded w-4/6 mx-auto"></div>
          </div>
          <div className="h-7 bg-neutral-200 rounded-full w-24 mx-auto mt-6"></div>
        </CardContent>
      </Card>
    ))}
  </div>
);

// Image component with fallback
const AccreditationImage = ({
  imageUrl,
  title,
  colors,
}: {
  imageUrl?: string;
  title: string;
  colors: ReturnType<typeof getAccreditationColor>;
}) => {
  const [imageError, setImageError] = React.useState(false);
  const [imageLoading, setImageLoading] = React.useState(true);

  if (!imageUrl || imageError) {
    return (
      <div
        className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden"
        style={{
          background: colors.gradient,
          color: colors.icon,
          border: `2px solid ${colors.border}`,
        }}
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {getFallbackIcon(title, "w-12 h-12")}
        <div
          className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: colors.accent }}
        >
          <Star className="w-3 h-3 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-24 h-24 mx-auto mb-6 group-hover:scale-110 transition-all duration-500">
      {imageLoading && (
        <div
          className="absolute inset-0 rounded-3xl animate-pulse"
          style={{ background: colors.gradient }}
        />
      )}
      <img
        src={imageUrl}
        alt={`${title} accreditation logo`}
        className={`w-full h-full rounded-3xl object-contain shadow-lg transition-all duration-500 border-2 ${
          imageLoading ? "opacity-0" : "opacity-100"
        }`}
        style={{ borderColor: colors.border }}
        onLoad={() => setImageLoading(false)}
        onError={() => {
          setImageError(true);
          setImageLoading(false);
        }}
      />
      <div
        className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
        style={{ backgroundColor: colors.accent }}
      >
        <Star className="w-3 h-3 text-white" />
      </div>
    </div>
  );
};

export function AccreditationsSection2() {
  const { data: accreditations, isLoading: isLoadingAccreditations } =
    trpc.accreditations.getMany.useQuery();

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <Badge className="mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-brand-800 border border-blue-200/50 backdrop-blur-sm px-6 py-2 text-sm font-medium">
            <Award className="w-4 h-4 mr-2" />
            Accreditations & Partnerships
          </Badge>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
            Recognized Excellence
          </h2>

          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We're proud to be recognized by leading international organizations
            for our commitment to quality education and professional standards.
          </p>

          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>{accreditations?.length} Active Partnerships</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Internationally Recognized</span>
            </div>
          </div>
        </div>

        {isLoadingAccreditations ? (
          <AccreditationsLoading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {accreditations?.map((accreditation, index) => {
              const colors = getAccreditationColor(accreditation.title);

              return (
                <Card
                  key={accreditation.id}
                  className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 backdrop-blur-sm relative"
                  style={{
                    background: colors.gradient,
                    borderTop: `4px solid ${colors.accent}`,
                    animation: `fadeInUp 0.8s ease-out forwards ${index * 150}ms both`,
                  }}
                >
                  <CardContent className="p-8 text-center relative">
                    <div
                      className="absolute top-4 right-4 w-8 h-8 opacity-5 group-hover:opacity-10 transition-opacity duration-300 group-hover:rotate-12"
                      style={{ color: colors.icon }}
                    >
                      {getFallbackIcon(accreditation.title, "w-8 h-8")}
                    </div>

                    <div
                      className="absolute bottom-4 left-4 w-6 h-6 opacity-5 group-hover:opacity-10 transition-all duration-300 group-hover:-rotate-12"
                      style={{ color: colors.icon }}
                    >
                      <CheckCircle className="w-6 h-6" />
                    </div>

                    <AccreditationImage
                      imageUrl={accreditation.imageUrl!}
                      title={accreditation.title}
                      colors={colors}
                    />

                    <h3
                      className="font-bold text-xl mb-4 group-hover:opacity-90 transition-opacity duration-300 leading-tight"
                      style={{ color: colors.accent }}
                    >
                      {accreditation.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed group-hover:text-slate-700 transition-colors duration-300 mb-6 line-clamp-4">
                      {accreditation.description}
                    </p>

                    <div className="flex items-center justify-center gap-2">
                      <Badge
                        className="text-xs border-0 shadow-md px-4 py-2 font-medium"
                        style={{
                          backgroundColor: colors.accent,
                          color: "white",
                        }}
                      >
                        <CheckCircle className="w-3 h-3 mr-2" />
                        Verified Partner
                      </Badge>
                    </div>

                    <div
                      className="absolute inset-0 border-2 border-transparent group-hover:border-opacity-30 rounded-lg transition-all duration-500 pointer-events-none opacity-0 group-hover:opacity-100"
                      style={{
                        borderColor: colors.accent,
                        boxShadow: `0 0 20px ${colors.accent}20`,
                      }}
                    ></div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* <div className="mt-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-slate-800 mb-8">
              Trusted by Students Worldwide
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50">
                <Shield className="w-8 h-8 text-blue-600 mb-3" />
                <div className="text-2xl font-bold text-slate-800">100%</div>
                <div className="text-sm text-slate-600">Compliance Rate</div>
              </div>

              <div className="flex flex-col items-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50">
                <Globe className="w-8 h-8 text-green-600 mb-3" />
                <div className="text-2xl font-bold text-slate-800">50+</div>
                <div className="text-sm text-slate-600">Countries Served</div>
              </div>

              <div className="flex flex-col items-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50">
                <Users className="w-8 h-8 text-purple-600 mb-3" />
                <div className="text-2xl font-bold text-slate-800">10K+</div>
                <div className="text-sm text-slate-600">Students Certified</div>
              </div>

              <div className="flex flex-col items-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50">
                <Award className="w-8 h-8 text-orange-600 mb-3" />
                <div className="text-2xl font-bold text-slate-800">15+</div>
                <div className="text-sm text-slate-600">Years Experience</div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .bg-grid-slate-100 {
          background-image: url("data:image/svg+xml,%3csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='smallGrid' width='8' height='8' patternUnits='userSpaceOnUse'%3e%3cpath d='M 8 0 L 0 0 0 8' fill='none' stroke='%23e2e8f0' stroke-width='0.5'/%3e%3c/pattern%3e%3cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3e%3crect width='40' height='40' fill='url(%23smallGrid)'/%3e%3cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%23e2e8f0' stroke-width='1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)'/%3e%3c/svg%3e");
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
