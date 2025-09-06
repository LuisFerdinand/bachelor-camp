// File: lib/mapsConfig.ts
// Configuration file for Google Maps settings

export interface MapLocation {
  lat: number;
  lng: number;
  name: string;
  address: string;
}

// Replace these coordinates with your exact location
export const BACHELOR_CAMP_LOCATION: MapLocation = {
  lat: -7.8481,  // Replace with your exact latitude
  lng: 112.0178, // Replace with your exact longitude
  name: "BachelorCamp Kediri",
  address: "Your exact address here"
};

// Google Maps API Configuration
export const GOOGLE_MAPS_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY_HERE",
  zoom: 18, // Adjust zoom level (1-20, where 20 is closest)
  mapOptions: {
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: true,
    zoomControl: true,
    styles: [
      {
        featureType: "poi",
        elementType: "labels.text",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "poi.business",
        stylers: [{ visibility: "off" }]
      }
    ]
  }
};

// Helper function to get Google Maps URLs
export const getGoogleMapsUrls = (location: MapLocation) => {
  const { lat, lng } = location;
  return {
    search: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
    directions: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
    embed: `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_CONFIG.apiKey}&q=${lat},${lng}&zoom=${GOOGLE_MAPS_CONFIG.zoom}`
  };
};

/*
HOW TO GET YOUR EXACT COORDINATES:

Method 1 - Using Google Maps:
1. Go to https://maps.google.com
2. Search for your location or navigate to it
3. Right-click on the exact spot where you want the pin
4. Click on the coordinates that appear (they look like: -7.8481, 112.0178)
5. The coordinates will be copied to your clipboard

Method 2 - Using your phone:
1. Open Google Maps on your phone
2. Go to your location
3. Long-press on the exact spot
4. The coordinates will appear at the bottom of the screen

Method 3 - Using GPS coordinates from your device:
1. Stand at the exact location
2. Open any GPS app or your phone's built-in location services
3. Note down the latitude and longitude

SETTING UP GOOGLE MAPS API (FREE):
1. Go to https://console.cloud.google.com/
2. Create a new project or select existing one
3. Enable the "Maps JavaScript API"
4. Create credentials (API Key)
5. Restrict the API key to your domain for security
6. Add the API key to your environment variables:
   - Create .env.local file in your project root
   - Add: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here

FREE TIER LIMITS:
- Google Maps JavaScript API: 28,000 map loads per month
- Geocoding API: 40,000 requests per month  
- This should be more than enough for most websites

ENVIRONMENT VARIABLES (.env.local):
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
*/