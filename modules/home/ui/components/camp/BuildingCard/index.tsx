"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { CheckCircle2, Bed } from "lucide-react";
import Link from "next/link";
import { getAllCourses, getSuitableCourses } from "@/app/util/bookingData";

interface Building {
  id: number;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  badge?: string;
  badgeColor?: string;
  rooms: string;
  pricing: Array<{
    id: number;
    type: string;
    price: string;
    description: string;
    highlight?: boolean;
  }>;
  features: string[];
  slug: string;
}

interface BuildingCardProps {
  building: Building;
}

export function BuildingCard({ building }: BuildingCardProps) {
  const [courses, setCourses] = React.useState<any[]>([]);

  React.useEffect(() => {
    // Get courses suitable for this building
    const suitableCourses = getSuitableCourses(building.id);
    setCourses(suitableCourses);
  }, [building.id]);

  // Define color schemes for each building
  const getColorScheme = (buildingId: number) => {
    switch (buildingId) {
      case 1:
        return {
          ring: "ring-2 ring-electric-200",
          gradient: "bg-gradient-to-r from-electric-400 to-electric-500",
          buttonGradient:
            "bg-gradient-to-r from-electric-500 to-electric-600 hover:from-electric-600 hover:to-electric-700",
          shadow: "shadow-electric",
          highlightBg: "bg-gradient-to-r from-electric-50 to-electric-100",
          highlightBorder: "border-electric-200",
          highlightText: "text-electric-700",
        };
      case 2:
        return {
          ring: "ring-2 ring-success-200",
          gradient: "bg-gradient-to-r from-success-400 to-success-500",
          buttonGradient:
            "bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700",
          shadow: "shadow-sm",
          highlightBg: "bg-gradient-to-r from-success-50 to-success-100",
          highlightBorder: "border-success-200",
          highlightText: "text-success-700",
        };
      default:
        return {
          ring: "ring-2 ring-brand-200",
          gradient: "bg-gradient-to-r from-brand-500 to-brand-600",
          buttonGradient:
            "bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700",
          shadow: "shadow-brand",
          highlightBg: "bg-gradient-to-r from-brand-50 to-brand-100",
          highlightBorder: "border-brand-200",
          highlightText: "text-brand-700",
        };
    }
  };

  const colorScheme = getColorScheme(building.id);

  return (
    <Card
      className={`
        border-0 shadow-lg hover:shadow-xl transition-all duration-300 
        relative overflow-hidden flex flex-col h-full
        ${building.id === 1 ? `${colorScheme.ring} lg:scale-105` : ""}
        ${building.id === 1 ? "lg:order-2 order-1" : ""}
        ${building.id === 2 ? "lg:order-1 order-2" : ""}
        ${building.id === 3 ? "lg:order-3 order-3" : ""}
      `}
    >
      {/* Building Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <Image
          src={building.image}
          alt={building.imageAlt}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        {building.badge && (
          <div className="absolute top-4 left-4">
            <Badge
              className={`${building.badgeColor} text-white border-0 px-3 py-1 shadow-md`}
            >
              {building.badge}
            </Badge>
          </div>
        )}
      </div>
      <div className={`h-2 flex-shrink-0 ${colorScheme.gradient}`}></div>
      <CardHeader className="pb-4 flex-shrink-0">
        <CardTitle className="text-xl text-neutral-900">
          {building.name}
        </CardTitle>
        <CardContent className="p-0 pt-2">
          <p className="text-base text-neutral-600">{building.description}</p>
          <div className="text-sm text-neutral-500 flex items-center mt-2">
            <Bed className="h-4 w-4 mr-2" />
            {building.rooms}
          </div>
          <div className="text-sm text-neutral-500 flex items-center mt-1">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            {courses.length} programs available
          </div>
        </CardContent>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow p-6 pt-0">
        <div className="flex-grow">
          <div className="mb-6">
            <h4 className="font-semibold mb-4 text-neutral-800">
              Pricing Options:
            </h4>
            <div className="space-y-3">
              {building.pricing.map((price) => (
                <div
                  key={price.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    price.highlight
                      ? `${colorScheme.highlightBg} ${colorScheme.highlightBorder} shadow-sm`
                      : "bg-neutral-50 border-neutral-200"
                  }`}
                >
                  <div className="text-sm text-neutral-600 mb-1">
                    {price.type}
                  </div>
                  <div
                    className={`font-bold ${
                      price.highlight
                        ? `${colorScheme.highlightText} text-lg`
                        : "text-neutral-800"
                    }`}
                  >
                    {price.price}
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">
                    {price.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-neutral-800">Features:</h4>
            <ul className="space-y-3">
              {building.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <CheckCircle2 className="w-4 h-4 text-success-500 mr-3 flex-shrink-0" />
                  <span className="text-neutral-700">{feature}</span>
                </li>
              ))}
              {building.features.length > 3 && (
                <li className="text-sm text-neutral-500">
                  +{building.features.length - 3} more features
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-neutral-100">
          <div className="flex gap-2">
            <Link href={`/camp/${building.slug}`} className="flex-1">
              <Button
                className={`w-full py-3 font-semibold text-base transition-all ${colorScheme.buttonGradient} ${colorScheme.shadow} text-white`}
              >
                View Details
              </Button>
            </Link>
            <Link href={`/booking?slug=${building.slug}`}>
              <Button
                variant="outline"
                className="border-brand-500 text-brand-600 hover:bg-brand-50"
              >
                Book
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
