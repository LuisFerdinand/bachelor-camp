/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock, Building, AlertCircle } from "lucide-react";
import { BachelorCampInfo } from "./types";

interface InformationSectionProps {
  bachelorCamp: BachelorCampInfo;
}

// Declare global google maps types
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default function InformationSection({
  bachelorCamp,
}: InformationSectionProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [mapLoading, setMapLoading] = useState(true);

  // Kediri coordinates
  const coordinates = {
    lat: -6.1656097168538215, 
    lng: 106.78050486274218
  };

  // Initialize Google Map
  const initializeMap = () => {
    if (!mapRef.current || !window.google) {
      setMapError("Google Maps API not available");
      setMapLoading(false);
      return;
    }

    try {
      // Create map
      const map = new window.google.maps.Map(mapRef.current, {
        center: coordinates,
        zoom: 15,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
      });

      // Add simple marker
      new window.google.maps.Marker({
        position: coordinates,
        map: map,
        title: bachelorCamp.name,
      });

      setMapLoading(false);
      setMapError(null);
    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError("Failed to load map");
      setMapLoading(false);
    }
  };

  // Load Google Maps API
  useEffect(() => {
    if (window.google) {
      initializeMap();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;

    window.initMap = initializeMap;

    script.onerror = () => {
      setMapError("Failed to load Google Maps");
      setMapLoading(false);
    };

    document.head.appendChild(script);
  }, [bachelorCamp]);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-brand-100 text-brand-800">
            <Building className="w-4 h-4 mr-2" />
            About BachelorCamp
          </Badge>
          <h2 className="text-display-sm md:text-display-md font-bold mb-4">
            Premier English Learning Center in Kediri
          </h2>
          <p className="text-lg text-neutral-600">
            BachelorCamp is a leading English language institute dedicated to
            providing high-quality education to students in Kediri and
            surrounding areas.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 bg-gradient-to-br from-brand-50 to-accent-50">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2 flex items-center">
                    <Building className="h-6 w-6 mr-2 text-brand-500" />
                    {bachelorCamp.name}
                  </h3>
                  <p className="text-neutral-600">
                    Our campus in Kediri offers state-of-the-art facilities and
                    a supportive learning environment.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-brand-500 mr-3 mt-0.5" />
                    <div>
                      <h5 className="font-medium">Address</h5>
                      <p className="text-neutral-600">{bachelorCamp.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-brand-500 mr-3" />
                    <div>
                      <h5 className="font-medium">Phone</h5>
                      <a
                        href={`tel:${bachelorCamp.phone}`}
                        className="text-neutral-600 hover:text-brand-500 transition-colors"
                      >
                        {bachelorCamp.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-brand-500 mr-3" />
                    <div>
                      <h5 className="font-medium">Email</h5>
                      <a
                        href={`mailto:${bachelorCamp.email}`}
                        className="text-neutral-600 hover:text-brand-500 transition-colors"
                      >
                        {bachelorCamp.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-brand-500 mr-3 mt-0.5" />
                    <div>
                      <h5 className="font-medium">Operating Hours</h5>
                      <div
                        className="text-neutral-600"
                        dangerouslySetInnerHTML={{ __html: bachelorCamp.hours }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative h-96 lg:h-auto min-h-[400px]">
                <div
                  ref={mapRef}
                  className="absolute inset-0 rounded-r-lg"
                  style={{ minHeight: "400px" }}
                />
                
                {/* Loading overlay */}
                {mapLoading && (
                  <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center rounded-r-lg z-10">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500 mx-auto mb-2"></div>
                      <p className="text-sm text-neutral-600">Loading map...</p>
                    </div>
                  </div>
                )}
                
                {/* Error overlay */}
                {mapError && (
                  <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center rounded-r-lg z-10">
                    <div className="text-center p-4">
                      <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                      <p className="text-sm text-red-600 mb-2">{mapError}</p>
                      <p className="text-xs text-neutral-500">
                        Please check your internet connection or try refreshing the page.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}