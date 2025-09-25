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
      bg: "bg-gradient-to-br from-brand-50 to-indigo-100",
      iconBg: "bg-brand-100 border-brand-200",
      text: "text-brand-600",
      hover: "hover:text-brand-800 hover:bg-brand-50",
      accent: "text-brand-500",
      // CTA Button styles
      buttonBg: "bg-brand-600 hover:bg-brand-700",
      buttonText: "text-white",
      buttonShadow: "shadow-brand-200",
    },
    {
      bg: "bg-gradient-to-br from-accent-50 to-pink-100",
      iconBg: "bg-accent-100 border-accent-200",
      text: "text-accent-600",
      hover: "hover:text-accent-800 hover:bg-accent-50",
      accent: "text-accent-500",
      // CTA Button styles
      buttonBg: "bg-accent-600 hover:bg-accent-700",
      buttonText: "text-white",
      buttonShadow: "shadow-accent-200",
    },
    {
      bg: "bg-gradient-to-br from-electric-50 to-emerald-100",
      iconBg: "bg-electric-100 border-electric-200",
      text: "text-electric-600",
      hover: "hover:text-electric-800 hover:bg-electric-50",
      accent: "text-electric-500",
      // CTA Button styles
      buttonBg: "bg-electric-600 hover:bg-electric-700",
      buttonText: "text-white",
      buttonShadow: "shadow-electric-200",
    },
    {
      bg: "bg-gradient-to-br from-orange-50 to-red-100",
      iconBg: "bg-orange-100 border-orange-200",
      text: "text-orange-600",
      hover: "hover:text-orange-800 hover:bg-orange-50",
      accent: "text-orange-500",
      // CTA Button styles
      buttonBg: "bg-orange-600 hover:bg-orange-700",
      buttonText: "text-white",
      buttonShadow: "shadow-orange-200",
    },
  ];
  return styles[index % styles.length];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FeatureItem = ({ feature, style }: { feature: any; style: any }) => (
  <div
    className={`flex items-center gap-3 rounded-lg border p-3 transition-colors duration-200 hover:bg-gray-50 ${style.iconBg} bg-white`}
  >
    <div className={`flex-shrink-0 p-2 rounded-full ${style.iconBg}`}>
      <ReactSVG
        src={feature.iconUrl || ICON_URL_FALLBACK}
        className={`${style.text}`}
        beforeInjection={(svg) => {
          svg.setAttribute("width", "16");
          svg.setAttribute("height", "16");
        }}
      />
    </div>
    <span className="text-sm font-medium text-gray-700">{feature.text}</span>
  </div>
);

type Props = {
  pillars?: Pillar[];
  isLoading?: boolean;
};

export default function HomePillarsSection({ pillars, isLoading }: Props) {
  const safePillars = pillars ?? [];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <p className="text-center text-neutral-500 col-span-3">
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
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* Image + Icon */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={pillar.imageUrl || PRODUCT_IMAGE_FALLBACK}
                        alt={pillar.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
                        <div
                          className={`w-20 h-20 rounded-full flex items-center justify-center m-4 shadow-lg transition-transform duration-300 group-hover:scale-110 ${style.iconBg}`}
                        >
                          <ReactSVG
                            src={pillar.iconUrl || ICON_URL_FALLBACK}
                            className={`${style.text}`}
                            beforeInjection={(svg) => {
                              svg.setAttribute("width", "40");
                              svg.setAttribute("height", "40");
                              svg.style.display = "block";
                              svg.style.margin = "auto";
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Title + Subtitle */}
                    <CardHeader className="text-center pb-4 pt-6">
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {pillar.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 mt-2">
                        {pillar.subtitle}
                      </CardDescription>
                    </CardHeader>

                    {/* Content Section */}
                    <CardContent className="px-6 pb-6">
                      {/* Features List */}
                      {pillar?.features && pillar.features.length > 0 && (
                        <div className="space-y-3 mb-6">
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
                              w-full font-semibold py-3 px-6 
                              transition-all duration-200 
                              ${style.buttonBg} ${style.buttonText}
                              hover:shadow-lg hover:${style.buttonShadow}
                              active:scale-95 active:shadow-sm
                              border-0 rounded-lg
                              group-hover:scale-[1.02]
                            `}
                          >
                            <span className="flex items-center justify-center gap-2">
                              <p className="leading-none">{pillar.ctaText}</p>
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
