import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ICON_URL_FALLBACK,
  LINK_FALLBACK,
  PRODUCT_IMAGE_FALLBACK,
} from "@/constants";
import { Pillar } from "@/db/schema";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactSVG } from "react-svg";

function getPillarStyles(index: number) {
  const styles = [
    {
      bg: "bg-brand-600",
      iconBg: "bg-white/20 border-white/30",
      text: "text-white",
      hover: "hover:from-brand-700 hover:via-brand-600 hover:to-indigo-700",
      accent: "text-white",
      // CTA Button styles
      buttonBg: "bg-white",
      buttonText: "text-brand-600",
      buttonShadow: "shadow-black/20",
      featureBg: "bg-white/10 border-white/20 hover:bg-white/15",
      featureText: "text-white",
    },
    {
      bg: "bg-accent-500",
      iconBg: "bg-white/20 border-white/30",
      text: "text-white",
      hover: "hover:from-accent-700 hover:via-accent-600 hover:to-pink-700",
      accent: "text-white",
      // CTA Button styles
      buttonBg: "bg-white",
      buttonText: "text-accent-600",
      buttonShadow: "shadow-black/20",
      featureBg: "bg-white/10 border-white/20 hover:bg-white/15",
      featureText: "text-white",
    },
    {
      bg: "bg-electric-500",
      iconBg: "bg-white/20 border-white/30",
      text: "text-white",
      hover:
        "hover:from-electric-700 hover:via-electric-600 hover:to-emerald-700",
      accent: "text-white",
      // CTA Button styles
      buttonBg: "bg-white",
      buttonText: "text-electric-600",
      buttonShadow: "shadow-black/20",
      featureBg: "bg-white/10 border-white/20 hover:bg-white/15",
      featureText: "text-white",
    },
    {
      bg: "bg-gradient-to-br from-orange-600 via-orange-500 to-red-600",
      iconBg: "bg-white/20 border-white/30",
      text: "text-white",
      hover: "hover:from-orange-700 hover:via-orange-600 hover:to-red-700",
      accent: "text-white",
      // CTA Button styles
      buttonBg: "bg-white",
      buttonText: "text-orange-600",
      buttonShadow: "shadow-black/20",
      featureBg: "bg-white/10 border-white/20 hover:bg-white/15",
      featureText: "text-white",
    },
  ];
  return styles[index % styles.length];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FeatureItem = ({ feature, style }: { feature: any; style: any }) => (
  <div
    className={`flex items-center gap-3 rounded-lg border p-3 transition-all duration-200 ${style.featureBg}`}
  >
    <div
      className={`flex-shrink-0 p-2 rounded-full ${style.iconBg} backdrop-blur-sm`}
    >
      <ReactSVG
        src={feature.iconUrl || ICON_URL_FALLBACK}
        className={`${style.text}`}
        beforeInjection={(svg) => {
          svg.setAttribute("width", "16");
          svg.setAttribute("height", "16");
        }}
      />
    </div>
    <span className={`text-sm font-medium ${style.featureText}`}>
      {feature.text}
    </span>
  </div>
);

type Props = {
  pillars?: Pillar[];
  isLoading?: boolean;
};

export default function HomePillarsSection({ pillars, isLoading }: Props) {
  const safePillars = pillars ?? [];

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-display-sm md:text-display-md font-bold mb-6 text-neutral-900 leading-tight">
            Our Learning{" "}
            <span className="text-accent-500 relative">
              Pillars
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-accent-100 rotate-1 rounded-full opacity-60"></div>
            </span>
          </h2>
          <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            We focus on three core areas to ensure comprehensive English
            language mastery.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {isLoading ? (
            // 🔹 Skeleton State
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="border-0 shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Skeleton className="h-full w-full" />
                </div>
                <CardHeader className="text-center pb-4">
                  <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-5/6 mx-auto" />
                    <Skeleton className="h-4 w-4/6 mx-auto" />
                  </div>
                  <Skeleton className="h-10 w-full mt-4" />
                </CardContent>
              </Card>
            ))
          ) : safePillars.length === 0 ? (
            // 🔹 Empty State
            <p className="text-center text-neutral-500 col-span-full">
              No pillars available at the moment.
            </p>
          ) : (
            // 🔹 Loaded State
            safePillars
              .filter((p) => p.isActive === "true")
              .sort((a, b) => a.order - b.order)
              .map((pillar, idx) => {
                const style = getPillarStyles(idx);

                return (
                  <Card
                    key={pillar.id}
                    className={`
                      border-0 shadow-xl hover:shadow-2xl 
                      transition-all duration-300 overflow-hidden 
                      group ${style.bg} ${style.hover}
                    `}
                  >
                    {/* Image + Icon */}
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <Image
                        src={pillar.imageUrl || PRODUCT_IMAGE_FALLBACK}
                        alt={pillar.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end">
                        <div
                          className={`
                            w-16 h-16 sm:w-20 sm:h-20 
                            rounded-full flex items-center justify-center 
                            m-4 shadow-lg backdrop-blur-sm
                            transition-transform duration-300 group-hover:scale-110 
                            ${style.iconBg}
                          `}
                        >
                          <ReactSVG
                            src={pillar.iconUrl || ICON_URL_FALLBACK}
                            className={`${style.text}`}
                            beforeInjection={(svg) => {
                              svg.setAttribute("width", "32");
                              svg.setAttribute("height", "32");
                              svg.style.display = "block";
                              svg.style.margin = "auto";
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Title + Subtitle */}
                    <CardHeader className="text-center pb-4 pt-6 px-4 sm:px-6">
                      <CardTitle className="text-lg sm:text-xl font-bold text-white group-hover:scale-105 transition-transform">
                        {pillar.title}
                      </CardTitle>
                      <CardDescription className="text-white/90 mt-2 text-sm sm:text-base">
                        {pillar.subtitle}
                      </CardDescription>
                    </CardHeader>

                    {/* Content Section */}
                    <CardContent className="px-4 sm:px-6 pb-6">
                      {/* Features List */}
                      {pillar?.features && pillar.features.length > 0 && (
                        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                          {pillar.features.map((feature, i) => (
                            <FeatureItem
                              key={i}
                              feature={feature}
                              style={style}
                            />
                          ))}
                        </div>
                      )}

                      {/* Enhanced CTA Button with Background Color */}
                      {pillar.ctaText && (
                        <Link
                          href={pillar.ctaLink || LINK_FALLBACK}
                          className="block"
                        >
                          <Button
                            className={`
                              w-full font-semibold py-2.5 sm:py-3 px-4 sm:px-6 
                              transition-all duration-200 
                              ${style.buttonBg} ${style.buttonText}
                              active:scale-95 active:shadow-sm
                              border-0 rounded-lg hover:bg-white hover:text-${style.buttonText}
                            `}
                          >
                            <span className="flex items-center justify-center gap-2">
                              <p className="leading-none text-sm sm:text-base">
                                {pillar.ctaText}
                              </p>
                              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </span>
                          </Button>
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                );
              })
          )}
        </div>
      </div>
    </section>
  );
}
