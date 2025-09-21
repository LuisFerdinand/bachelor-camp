/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { AlertCircle } from "lucide-react";

// Declare global google maps types
declare global {
  interface Window {
    google: any;
    initMap: () => void;
    googleMapsScriptLoading?: boolean;
  }
}

interface MapProps {
  coordinates: {
    lat: number;
    lng: number;
  };
  title: string;
  className?: string;
  loadingElement?: React.ReactNode;
  errorElement?: React.ReactNode;
}

export default function Map({
  coordinates,
  title,
  className = "",
  loadingElement,
  errorElement,
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [mapLoading, setMapLoading] = useState(true);

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
        title: title,
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
    // If Google Maps is already loaded, initialize the map
    if (window.google) {
      initializeMap();
      return;
    }

    // If script is already loading, just set up the callback
    if (window.googleMapsScriptLoading) {
      const originalCallback = window.initMap;
      window.initMap = () => {
        initializeMap();
        if (originalCallback) originalCallback();
      };
      return;
    }

    // Otherwise, load the script
    window.googleMapsScriptLoading = true;
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;

    window.initMap = initializeMap;

    script.onerror = () => {
      setMapError("Failed to load Google Maps");
      setMapLoading(false);
      window.googleMapsScriptLoading = false;
    };

    document.head.appendChild(script);

    return () => {
      // Clean up callback if component unmounts
      if (window.initMap === initializeMap) {
        window.initMap = () => {};
      }
    };
  }, [coordinates, title]);

  return (
    <div className={`relative ${className}`} style={{ minHeight: "200px" }}>
      <div ref={mapRef} className="absolute inset-0" />

      {/* Loading overlay */}
      {mapLoading &&
        (loadingElement || (
          <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500 mx-auto mb-2"></div>
              <p className="text-sm text-neutral-600">Loading map...</p>
            </div>
          </div>
        ))}

      {/* Error overlay */}
      {mapError &&
        (errorElement || (
          <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center">
            <div className="text-center p-4">
              <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <p className="text-sm text-red-600 mb-2">{mapError}</p>
              <p className="text-xs text-neutral-500">
                Please check your internet connection or try refreshing the
                page.
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
