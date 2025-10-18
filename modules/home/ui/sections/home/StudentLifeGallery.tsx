import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, Sparkles, Users, Globe } from "lucide-react";
import { ACTIVITY_FALLBACKS } from "@/constants";

export const StudentLifeGallery = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const galleryActivities = [
    {
      src: ACTIVITY_FALLBACKS["activity1"],
      alt: "Group Activities",
      title: "Group Activities",
      description:
        "Engage in collaborative learning sessions and team-building exercises that enhance communication skills through interactive workshops and peer discussions.",
      accent: "accent",
      icon: Users,
    },
    {
      src: ACTIVITY_FALLBACKS["activity2"],
      alt: "Study Groups",
      title: "Study Groups",
      description:
        "Join peer-led study sessions where students practice English together in a supportive environment, sharing knowledge and building confidence.",
      accent: "electric",
      icon: Sparkles,
    },
    {
      src: ACTIVITY_FALLBACKS["activity3"],
      alt: "Outdoor Learning",
      title: "Outdoor Learning",
      description:
        "Experience hands-on learning through field trips and outdoor activities that bring English to life in real-world contexts and natural settings.",
      accent: "brand",
      icon: Globe,
    },
    {
      src: ACTIVITY_FALLBACKS["activity4"],
      alt: "Volunteer",
      title: "Volunteer Programs",
      description:
        "Participate in community service projects while practicing real-world English communication, making a positive impact while developing language skills.",
      accent: "accent",
      icon: Users,
    },
    {
      src: ACTIVITY_FALLBACKS["activity5"],
      alt: "Cultural Study",
      title: "Cultural Exchange",
      description:
        "Immerse yourself in diverse cultural activities that broaden perspectives and language understanding through authentic cultural experiences.",
      accent: "electric",
      icon: Sparkles,
    },
    {
      src: ACTIVITY_FALLBACKS["activity6"],
      alt: "International Program",
      title: "International Programs",
      description:
        "Connect with students worldwide through exchange programs and international collaboration projects that expand your global network.",
      accent: "brand",
      icon: Globe,
    },
  ];

  const getAccentColors = (accent: string) => {
    switch (accent) {
      case "accent":
        return {
          gradient: "from-white via-accent-50/30 to-accent-100/40",
          border: "border-accent-200",
          iconBg: "bg-accent-100",
          iconText: "text-accent-600",
          titleText: "text-accent-600",
        };
      case "electric":
        return {
          gradient: "from-white via-electric-50/30 to-electric-100/40",
          border: "border-electric-200",
          iconBg: "bg-electric-100",
          iconText: "text-electric-600",
          titleText: "text-electric-600",
        };
      default:
        return {
          gradient: "from-white via-brand-50/30 to-brand-100/40",
          border: "border-brand-200",
          iconBg: "bg-brand-100",
          iconText: "text-brand-600",
          titleText: "text-brand-600",
        };
    }
  };

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((card, index) => {
      if (card) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  setVisibleCards((prev) => {
                    const newVisible = [...prev];
                    newVisible[index] = true;
                    return newVisible;
                  });
                }, index * 200);
              }
            });
          },
          {
            threshold: 0.2,
            rootMargin: "0px 0px -50px 0px",
          }
        );

        observer.observe(card);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-display-sm md:text-display-md font-bold mb-4">
            <span className="text-brand-600 relative">
              Student{" "}
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-brand-100 rotate-3 rounded-full opacity-70"></div>
            </span>
            Life at Kediri
          </h2>
          <p className="text-lg text-neutral-600">
            Experience the vibrant community and rich activities that make
            learning English enjoyable and memorable.
          </p>
        </div>

        {/* Activity List */}
        <div className="space-y-8 lg:space-y-12 mb-12">
          {galleryActivities.map((activity, index) => {
            const isEven = index % 2 === 0;
            const colors = getAccentColors(activity.accent);
            const Icon = activity.icon;

            return (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`
                  relative overflow-hidden duration-700
                  bg-gradient-to-r ${colors.gradient}
                  ${
                    visibleCards[index]
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-16"
                  }
                `}
              >
                <div
                  className={`
                  flex flex-col ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-0
                `}
                >
                  {/* Image Section */}
                  <div className="w-full sm lg:w-1/2 relative overflow-hidden group">
                    <div className="relative aspect-[16/10] lg:aspect-[4/3]">
                      <Image
                        src={activity.src}
                        alt={activity.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-${
                          isEven ? "r" : "l"
                        } from-transparent via-transparent to-white/40`}
                      />
                    </div>

                    {/* Floating Icon Badge */}
                    <div
                      className={`
                      absolute top-6 ${isEven ? "right-6" : "left-6"} 
                      ${colors.iconBg} p-3 rounded-full shadow-xl 
                      transform transition-transform duration-500 
                      group-hover:scale-110 group-hover:rotate-12
                    `}
                    >
                      <Icon className={`h-6 w-6 ${colors.iconText}`} />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="w-full lg:w-1/2 p-8 lg:p-12">
                    <div className="space-y-4">
                      {/* Title with Accent */}
                      <h3
                        className={`
                        text-2xl lg:text-3xl xl:text-4xl font-bold 
                        ${colors.titleText} mb-4
                        transition-all duration-500 hover:scale-105
                      `}
                      >
                        {activity.title}
                      </h3>

                      {/* Description */}
                      <p className="text-neutral-700 text-base lg:text-lg leading-relaxed">
                        {activity.description}
                      </p>

                      {/* Decorative Line */}
                      <div
                        className={`
                        w-20 h-1 ${colors.iconBg} rounded-full 
                        transition-all duration-500 hover:w-32
                      `}
                      />

                      {/* Activity Number Badge */}
                      <div className="flex items-center gap-3 pt-2">
                        <div
                          className={`
                          ${colors.iconBg} ${colors.iconText} 
                          text-sm font-bold px-4 py-2 rounded-full
                        `}
                        >
                          Activity {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Corner Element */}
                <div
                  className={`
                  absolute ${isEven ? "bottom-0 right-0" : "bottom-0 left-0"} 
                  w-32 h-32 ${colors.iconBg} opacity-20 rounded-full 
                  transform translate-x-16 translate-y-16 blur-2xl
                `}
                />
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link href="/accommodation-booking">
            <Button
              size="lg"
              className="bg-brand-600 text-white shadow-xl px-10 py-6 text-base md:text-lg group transition-all duration-300 hover:shadow-2xl rounded-full"
            >
              Book Accommodation
              <ChevronRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
