/* eslint-disable @typescript-eslint/no-explicit-any */
// File: pages/Contact/InformationSection.tsx
"use client";
import React, { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Building } from "lucide-react";
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

export default function InformationSection({ bachelorCamp }: InformationSectionProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  // Initialize Google Map
  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    // Parse coordinates from bachelorCamp data or use default Kediri coordinates
    const defaultLat = -7.8481; // Kediri latitude
    const defaultLng = 112.0178; // Kediri longitude

    const mapOptions = {
      center: { lat: defaultLat, lng: defaultLng },
      zoom: 15,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: "poi",
          elementType: "labels.text",
          stylers: [{ visibility: "off" }]
        }
      ]
    };

    // Create map
    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, mapOptions);

    // Add marker
    const marker = new window.google.maps.Marker({
      position: { lat: defaultLat, lng: defaultLng },
      map: mapInstanceRef.current,
      title: bachelorCamp.name,
      icon: {
        url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 0C12.268 0 6 6.268 6 14c0 10.5 14 26 14 26s14-15.5 14-26c0-7.732-6.268-14-14-14zm0 19c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z" fill="#3B82F6"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(40, 40),
        anchor: new window.google.maps.Point(20, 40)
      }
    });

    // Add info window
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="padding: 10px; max-width: 250px;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">${bachelorCamp.name}</h3>
          <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">${bachelorCamp.address}</p>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <a href="tel:${bachelorCamp.phone}" style="color: #3b82f6; text-decoration: none; font-size: 14px;">${bachelorCamp.phone}</a>
            <a href="mailto:${bachelorCamp.email}" style="color: #3b82f6; text-decoration: none; font-size: 14px;">${bachelorCamp.email}</a>
          </div>
        </div>
      `
    });

    // Open info window on marker click
    marker.addListener('click', () => {
      infoWindow.open(mapInstanceRef.current, marker);
    });

    // Geocode address if provided
    if (bachelorCamp.address) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: bachelorCamp.address + ", Kediri, East Java, Indonesia" }, (results: any, status: any) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          mapInstanceRef.current.setCenter(location);
          marker.setPosition(location);
        }
      });
    }
  };

  // Load Google Maps API
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google) {
        initializeMap();
        return;
      }

      // Create script element
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&callback=initMap&libraries=places`;
      script.async = true;
      script.defer = true;

      // Set global callback
      window.initMap = initializeMap;

      // Add error handling
      script.onerror = () => {
        console.error('Failed to load Google Maps API');
      };

      document.head.appendChild(script);
    };

    loadGoogleMaps();

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
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
            BachelorCamp is a leading English language institute dedicated to providing high-quality education to students in Kediri and surrounding areas.
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
                    Our campus in Kediri offers state-of-the-art facilities and a supportive learning environment.
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
                      <a href={`tel:${bachelorCamp.phone}`} className="text-neutral-600 hover:text-brand-500">
                        {bachelorCamp.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-brand-500 mr-3" />
                    <div>
                      <h5 className="font-medium">Email</h5>
                      <a href={`mailto:${bachelorCamp.email}`} className="text-neutral-600 hover:text-brand-500">
                        {bachelorCamp.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-brand-500 mr-3 mt-0.5" />
                    <div>
                      <h5 className="font-medium">Operating Hours</h5>
                      <div className="text-neutral-600" dangerouslySetInnerHTML={{ __html: bachelorCamp.hours }} />
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="flex-1 bg-brand-500 hover:bg-brand-600"
                    onClick={() => {
                      // Use the same coordinates as the map
                      const exactLat = -6.164132732158701;
                      const exactLng = 106.7764701133734;
                      window.open(`https://www.google.com/maps/search/?api=1&query=${exactLat},${exactLng}`, "_blank")
                    }}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    View on Google Maps
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      // Use the same coordinates as the map
                      const exactLat = -6.164132732158701;
                      const exactLng = 106.7764701133734;
                      window.open(`https://www.google.com/maps/dir/?api=1&destination=${exactLat},${exactLng}`, "_blank")
                    }}
                  >
                    Get Directions
                  </Button>
                </div>
              </div>
              <div className="relative h-96 lg:h-auto min-h-[400px]">
                <div
                  ref={mapRef}
                  className="absolute inset-0 rounded-r-lg"
                  style={{ minHeight: '400px' }}
                />
                {/* Loading overlay */}
                <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center rounded-r-lg">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500 mx-auto mb-2"></div>
                    <p className="text-sm text-neutral-600">Loading map...</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}