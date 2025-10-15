import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Camera, ChevronRight } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ACTIVITY_FALLBACKS, STUDENT_LIFE_FALLBACKS } from "@/constants";

export const StudentLifeGallery = () => {
  const galleryImages = [
    {
      src: ACTIVITY_FALLBACKS["activity1"],
      alt: "Group Activities",
      fallback: ACTIVITY_FALLBACKS.activity1,
    },
    {
      src: ACTIVITY_FALLBACKS["activity2"],
      alt: "Study Groups",
      fallback: ACTIVITY_FALLBACKS.activity2,
    },
    {
      src: ACTIVITY_FALLBACKS["activity3"],
      alt: "Outdoor Learning",
    },
    {
      src: ACTIVITY_FALLBACKS["activity4"],
      alt: "Voulunteer",
    },
    {
      src: ACTIVITY_FALLBACKS["activity5"],
      alt: "Cultural Study",
    },
    {
      src: ACTIVITY_FALLBACKS["activity6"],
      alt: "International Program",
    },
  ];

  // Slider settings for mobile
  const mobileSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
          {/* Left Side - Main Image (1/4 width on desktop) */}
          <div className="order-1 lg:order-1 lg:col-span-1">
            <div className="relative max-w-xs mx-auto lg:max-w-none">
              {/* Mobile Image */}
              <div className="relative rounded-2xl overflow-hidden block lg:hidden">
                <Image
                  src={STUDENT_LIFE_FALLBACKS["mobile"]}
                  alt="Students enjoying campus life"
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Desktop Image */}
              <div className="relative rounded-2xl overflow-hidden hidden lg:block">
                <Image
                  src={STUDENT_LIFE_FALLBACKS["desktop"]}
                  alt="Students enjoying campus life"
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white p-2 rounded-full shadow-lg">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                  <Camera className="h-5 w-5 text-brand-600" />
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white p-2 rounded-full shadow-lg">
                <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                  <span className="text-accent-600 font-bold">6+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Asymmetric Bubble with Gallery (3/4 width on desktop) */}
          <div className="order-2 lg:order-2 lg:col-span-3 relative">
            <div className="relative">
              {/* Asymmetric Bubble Shape */}
              <div className="bg-brand-600 p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden">
                {/* Bubble Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIiBmaWxsPSIjZmZmIi8+PC9zdmc+')]" />
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Student Showcase Gallery
                  </h3>
                  <p className="text-white/90 mb-6 max-w-2xl">
                    Discover moments from our vibrant campus life and learning
                    experiences.
                  </p>

                  {/* Mobile Slider */}
                  <div className="block lg:hidden mb-8">
                    <Slider {...mobileSliderSettings}>
                      {galleryImages.map((image, index) => (
                        <div key={index} className="px-2">
                          <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>

                  {/* Desktop Grid */}
                  <div className="hidden lg:grid grid-cols-3 grid-rows-2 gap-4 mb-8">
                    {galleryImages.map((image, index) => (
                      <div
                        key={index}
                        className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                      >
                        <div className="aspect-square">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                          <Camera className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Call to Action */}
                  <Link href="/accommodation-booking">
                    <Button
                      size="lg"
                      className="bg-white text-brand-600 hover:bg-neutral-100 shadow-lg w-full md:w-auto px-8 py-3 text-lg"
                    >
                      Book Accomodation
                      <ChevronRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Bubble Tail */}
              <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 hidden lg:block">
                <div className="w-0 h-0 border-t-[20px] border-t-transparent border-r-[30px] border-r-brand-600 border-b-[20px] border-b-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
