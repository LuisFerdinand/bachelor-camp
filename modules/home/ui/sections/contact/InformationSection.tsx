/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { BachelorCampInfo } from "./types";
import Map from "@/components/common/Map";
import Image from "next/image";

interface InformationSectionProps {
  bachelorCamp: BachelorCampInfo;
}

export default function InformationSection({
  bachelorCamp,
}: InformationSectionProps) {
  // Kediri coordinates
  const coordinates = {
    lat: -6.1656097168538215,
    lng: 106.78050486274218,
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* <Badge className="mb-6 bg-brand-100 text-brand-800 px-4 py-2">
            <div className="relative w-4 h-4 mr-2">
              <Image
                src="/images/bachelorcamp-icon.png"
                alt="BachelorCamp Icon"
                fill
                className="object-contain"
              />
            </div>
            About BachelorCamp
          </Badge> */}
          <h2 className="text-display-sm md:text-display-md font-bold mb-6 text-neutral-900">
            Premier English Learning Center in{" "}
            <span className="text-brand-600 relative">
              Kediri
              <div className="absolute -bottom-3 left-0 right-0 h-3 bg-brand-100 -rotate-1 rounded-full opacity-70"></div>
            </span>
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            BachelorCamp is a leading English language institute dedicated to
            providing high-quality education to students in Kediri and
            surrounding areas.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="max-w-6xl mx-auto">
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              {/* Information Section */}
              <div className="lg:col-span-3 p-8 lg:p-12 bg-gradient-to-br from-brand-50 via-white to-accent-50">
                {/* Company Header */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="relative w-12 h-12">
                      <Image
                        src="/Logo.png"
                        alt="BachelorCamp Logo"
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900">
                        {bachelorCamp.name}
                      </h3>
                      <p className="text-brand-600 font-medium">
                        English Learning Center
                      </p>
                    </div>
                  </div>
                  <p className="text-neutral-600 leading-relaxed">
                    Our campus in Kediri offers state-of-the-art facilities and
                    a supportive learning environment for students of all
                    levels.
                  </p>
                </div>

                {/* Contact Information Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/50">
                    <div className="flex items-start">
                      <div className="bg-brand-100 rounded-lg p-2 mr-4">
                        <MapPin className="h-5 w-5 text-brand-600" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-neutral-900 mb-2">
                          Address
                        </h5>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                          {bachelorCamp.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/50">
                    <div className="flex items-start">
                      <div className="bg-brand-100 rounded-lg p-2 mr-4">
                        <Phone className="h-5 w-5 text-brand-600" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-neutral-900 mb-2">
                          Phone
                        </h5>
                        <a
                          href={`tel:${bachelorCamp.phone}`}
                          className="text-neutral-600 hover:text-brand-600 transition-colors text-sm"
                        >
                          {bachelorCamp.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/50">
                    <div className="flex items-start">
                      <div className="bg-brand-100 rounded-lg p-2 mr-4">
                        <Mail className="h-5 w-5 text-brand-600" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-neutral-900 mb-2">
                          Email
                        </h5>
                        <a
                          href={`mailto:${bachelorCamp.email}`}
                          className="text-neutral-600 hover:text-brand-600 transition-colors text-sm break-all"
                        >
                          {bachelorCamp.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/50">
                    <div className="flex items-start">
                      <div className="bg-brand-100 rounded-lg p-2 mr-4">
                        <Clock className="h-5 w-5 text-brand-600" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-neutral-900 mb-2">
                          Operating Hours
                        </h5>
                        <div
                          className="text-neutral-600 text-sm"
                          dangerouslySetInnerHTML={{
                            __html: bachelorCamp.hours,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <div className="lg:col-span-2 relative">
                <div className="h-96 lg:h-full min-h-[400px] relative">
                  <Map
                    coordinates={coordinates}
                    title={bachelorCamp.name}
                    className="absolute inset-0 w-full h-full rounded-none lg:rounded-r-lg"
                  />
                  {/* Map Overlay Info */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs">
                    <div className="flex items-center mb-2">
                      <MapPin className="h-4 w-4 text-brand-600 mr-2" />
                      <span className="font-semibold text-sm text-neutral-900">
                        Our Location
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600">
                      Visit us at our Kediri campus for more information about
                      our programs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Additional Info Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-neutral-100">
              <div className="bg-brand-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-600 font-bold text-lg">5+</span>
              </div>
              <h4 className="font-semibold text-neutral-900 mb-2">
                Years of Excellence
              </h4>
              <p className="text-sm text-neutral-600">
                Providing quality English education
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-neutral-100">
              <div className="bg-brand-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-600 font-bold text-lg">50+</span>
              </div>
              <h4 className="font-semibold text-neutral-900 mb-2">
                Expert Instructors
              </h4>
              <p className="text-sm text-neutral-600">
                Qualified and experienced teachers
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-neutral-100">
              <div className="bg-brand-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-600 font-bold text-lg">1K+</span>
              </div>
              <h4 className="font-semibold text-neutral-900 mb-2">
                Happy Students
              </h4>
              <p className="text-sm text-neutral-600">
                Successful learners and counting
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
