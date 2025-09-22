"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Heart, ChevronLeft, ChevronRight } from "lucide-react";

interface Bundle {
  id: number;
  title: string;
  description: string;
  price: string;
  discount: string;
  image: string;
  features: string[];
}

interface BundleSliderProps {
  bundles: Bundle[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const BundleSlider: React.FC<BundleSliderProps> = ({
  bundles,
  autoPlay = true,
  autoPlayInterval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);

  // Calculate items per slide based on screen size
  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        // lg breakpoint
        setItemsPerSlide(3);
      } else if (width >= 768) {
        // md breakpoint
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(1);
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const maxIndex = Math.max(0, bundles.length - itemsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused || bundles.length <= itemsPerSlide) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, isPaused, itemsPerSlide, maxIndex]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Calculate the number of indicator dots needed
  const indicatorCount = Math.max(1, maxIndex + 1);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div
        className="overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`,
          }}
        >
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              className={`flex-shrink-0 px-2 pb-8 pt-4 ${
                itemsPerSlide === 1
                  ? "w-full"
                  : itemsPerSlide === 2
                  ? "w-1/2"
                  : "w-1/3"
              }`}
            >
              <Card className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group h-full">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={bundle.image}
                    alt={bundle.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6 text-white w-full">
                      <Badge className="bg-white/20 text-white mb-2">
                        {bundle.discount}
                      </Badge>
                      <h3 className="text-2xl font-bold">{bundle.title}</h3>
                      <p className="opacity-90">{bundle.description}</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-neutral-900">
                      {bundle.price}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {bundle.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-brand-600 hover:bg-brand-500 shadow-lg text-white">
                    <Heart className="h-4 w-4 mr-2" />
                    Get This Bundle
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Only show if there are more items than can be displayed */}
      {bundles.length > itemsPerSlide && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white/80 hover:bg-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-white/80 hover:bg-white"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Indicators - Only show if there are multiple slides */}
      {indicatorCount > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: indicatorCount }, (_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors color-white ${
                index === currentIndex ? "bg-brand-500" : "bg-gray-300"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export { BundleSlider };
