// app/util/buildingData.ts
export interface Building {
  id: number;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  imageAlt: string;
  gallery: {
    id: number;
    image: string;
    imageAlt: string;
    title: string;
    description: string;
  }[];
  rooms: string;
  features: string[];
  amenities: string[];
  pricing: {
    id: number;
    type: string;
    price: string;
    description: string;
    highlight: boolean;
  }[];
  badge: string;
  badgeColor: string;
  location: {
    address: string;
    mapUrl: string;
  };
  contact: {
    phone: string;
    email: string;
  };
  rules: string[];
  availability: {
    peakSeason: {
      months: string[];
      description: string;
    };
    mediumSeason: {
      months: string[];
      description: string;
    };
    lowSeason: {
      months: string[];
      description: string;
    };
  };
  relatedBuildings: {
    id: number;
    name: string;
    slug: string;
    image: string;
    imageAlt: string;
    shortDescription: string;
  }[];
}

export const buildings: Building[] = [
  {
    id: 1,
    slug: "building-1-premium",
    name: "Building 1",
    description: "Premium accommodation with private facilities",
    longDescription:
      "Building 1 offers the ultimate student living experience with premium amenities and private facilities. Located in the heart of the city, this building provides easy access to public transportation, shopping centers, and educational institutions. Each room is designed with student comfort in mind, featuring modern furniture, ample storage space, and high-speed internet access.",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1186&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Building 1 exterior",
    gallery: [
      {
        id: 1,
        image:
          "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1186&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageAlt: "Building 1 exterior",
        title: "Building Exterior",
        description: "Modern architecture with beautiful landscaping",
      },
      {
        id: 2,
        image:
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageAlt: "Premium room in Building 1",
        title: "Premium Room",
        description: "Spacious room with modern furniture and air conditioning",
      },
      {
        id: 3,
        image:
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageAlt: "Study area in Building 1",
        title: "Study Area",
        description: "Quiet study areas with high-speed internet",
      },
      {
        id: 4,
        image:
          "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageAlt: "Common lounge in Building 1",
        title: "Common Lounge",
        description: "Comfortable lounge area for socializing and relaxation",
      },
      {
        id: 5,
        image:
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageAlt: "Study room in Building 1",
        title: "Study Room",
        description: "Fully equipped study rooms for focused learning",
      },
    ],
    rooms: "55 rooms",
    features: [
      "Air Conditioning",
      "Private Bathroom (KM dalam)",
      "Individual Rooms",
      "Study Desk",
      "Wardrobe",
      "High-Speed Internet",
    ],
    amenities: [
      "24/7 Security",
      "Laundry Service",
      "Weekly Housekeeping",
      "Common Lounge",
      "Study Rooms",
      "Kitchen Facilities",
      "Fitness Center",
      "Rooftop Garden",
    ],
    pricing: [
      {
        id: 1,
        type: "Per Room/Month",
        price: "Rp 2,500,000",
        description: "Private room with ensuite bathroom",
        highlight: false,
      },
      {
        id: 2,
        type: "2 Students/Room",
        price: "Rp 1,300,000/student",
        description: "Shared room with ensuite bathroom",
        highlight: true,
      },
      {
        id: 3,
        type: "3 Students/Room",
        price: "Rp 1,000,000/student",
        description: "Shared room with ensuite bathroom",
        highlight: true,
      },
    ],
    badge: "Most Popular",
    badgeColor: "bg-accent-500",
    location: {
      address: "123 Education Street, Central Jakarta, Indonesia 10110",
      mapUrl: "https://maps.google.com/?q=123+Education+Street+Central+Jakarta",
    },
    contact: {
      phone: "+62 21 1234 5678",
      email: "building1@educamp.com",
    },
    rules: [
      "Quiet hours: 10:00 PM - 6:00 AM",
      "No smoking inside the building",
      "Guest registration required at reception",
      "Keep common areas clean",
      "Respect other residents' privacy",
      "No pets allowed",
    ],
    availability: {
      peakSeason: {
        months: ["December", "June", "July"],
        description: "High demand period - book early for best availability",
      },
      mediumSeason: {
        months: ["January", "October"],
        description: "Moderate availability with good rates",
      },
      lowSeason: {
        months: [
          "February",
          "March",
          "April",
          "May",
          "August",
          "September",
          "November",
        ],
        description: "Best availability and special rates",
      },
    },
    relatedBuildings: [
      {
        id: 2,
        name: "Building 2",
        slug: "building-2-budget",
        image:
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageAlt: "Building 2 exterior",
        shortDescription: "Budget-friendly shared accommodation",
      },
      {
        id: 3,
        name: "Building 3 Premium",
        slug: "building-3-luxury",
        image:
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageAlt: "Building 3 exterior",
        shortDescription: "Luxury accommodation with premium facilities",
      },
    ],
  },
  {
    id: 2,
    slug: "building-2-budget",
    name: "Building 2",
    description: "Budget-friendly shared accommodation",
    longDescription:
      "Building 2 offers affordable student accommodation without compromising on quality and comfort. Designed for students who are budget-conscious but still want a safe and convenient place to live. The building features shared rooms with modern amenities, common areas for socializing, and easy access to public transportation and educational facilities.",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Building 2 exterior",
    gallery: [
      {
        id: 1,
        image:
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageAlt: "Building 2 exterior",
        title: "Building Exterior",
        description: "Modern building with affordable accommodation options",
      },
      {
        id: 2,
        image:
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageAlt: "Shared room in Building 2",
        title: "Shared Room",
        description: "Clean and comfortable shared rooms for students",
      },
      {
        id: 3,
        image:
          "https://images.unsplash.com/photo-1621171631089-6f55cd995b0d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageAlt: "Shared bathroom in Building 2",
        title: "Shared Bathroom",
        description: "Clean and well-maintained shared bathroom facilities",
      },
      {
        id: 4,
        image:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        imageAlt: "Common area in Building 2",
        title: "Common Area",
        description: "Spacious common area for socializing and studying",
      },
      {
        id: 5,
        image:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageAlt: "Study corner in Building 2",
        title: "Study Corner",
        description: "Quiet study corners with good lighting",
      },
    ],
    rooms: "8 large rooms, 12 small rooms",
    features: [
      "Shared Bathroom (KM luar)",
      "Large Rooms (6-10 students)",
      "Budget Friendly",
      "Study Desk",
      "Lockers",
      "High-Speed Internet",
    ],
    amenities: [
      "24/7 Security",
      "Laundry Service",
      "Weekly Housekeeping",
      "Common Lounge",
      "Study Areas",
      "Kitchen Facilities",
      "Bicycle Parking",
      "Game Room",
    ],
    pricing: [
      {
        id: 1,
        type: "Per Student/Month",
        price: "Rp 600,000",
        description: "Shared room with shared bathroom",
        highlight: true,
      },
    ],
    badge: "Best Value",
    badgeColor: "bg-success-500",
    location: {
      address: "456 Learning Avenue, West Surabaya, Indonesia 60291",
      mapUrl: "https://maps.google.com/?q=456+Learning+Avenue+West+Surabaya",
    },
    contact: {
      phone: "+62 31 8765 4321",
      email: "building2@educamp.com",
    },
    rules: [
      "Quiet hours: 10:00 PM - 6:00 AM",
      "No smoking inside the building",
      "Guest registration required at reception",
      "Keep common areas clean",
      "Respect other residents' privacy",
      "No pets allowed",
    ],
    availability: {
      peakSeason: {
        months: ["December", "June", "July"],
        description: "High demand period - book early for best availability",
      },
      mediumSeason: {
        months: ["January", "October"],
        description: "Moderate availability with good rates",
      },
      lowSeason: {
        months: [
          "February",
          "March",
          "April",
          "May",
          "August",
          "September",
          "November",
        ],
        description: "Best availability and special rates",
      },
    },
    relatedBuildings: [
      {
        id: 1,
        name: "Building 1",
        slug: "building-1-premium",
        image:
          "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1186&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageAlt: "Building 1 exterior",
        shortDescription: "Premium accommodation with private facilities",
      },
      {
        id: 3,
        name: "Building 3 Premium",
        slug: "building-3-luxury",
        image:
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageAlt: "Building 3 exterior",
        shortDescription: "Luxury accommodation with premium facilities",
      },
    ],
  },
  {
    id: 3,
    slug: "building-3-luxury",
    name: "Building 3 Premium",
    description: "Luxury accommodation perfect for course packages",
    longDescription:
      "Building 3 Premium offers the ultimate luxury student living experience. Designed for students who want the best of everything, this building features premium amenities, spacious rooms, and exclusive services. Located in a prime area with easy access to educational institutions, shopping centers, and recreational facilities, Building 3 Premium is the perfect choice for students who want to live in style and comfort.",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Building 3 Premium exterior",
    gallery: [
      {
        id: 1,
        image:
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageAlt: "Building 3 Premium exterior",
        title: "Building Exterior",
        description: "Luxury building with premium architecture and design",
      },
      {
        id: 2,
        image:
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageAlt: "Premium room in Building 3",
        title: "Premium Room",
        description: "Spacious and luxurious rooms with premium amenities",
      },
      {
        id: 3,
        image:
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageAlt: "Ensuite bathroom in Building 3",
        title: "Ensuite Bathroom",
        description: "Luxurious ensuite bathroom with premium fixtures",
      },
      {
        id: 4,
        image:
          "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageAlt: "Premium lounge in Building 3",
        title: "Premium Lounge",
        description: "Luxurious lounge area for relaxation and socializing",
      },
      {
        id: 5,
        image:
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageAlt: "Premium study room in Building 3",
        title: "Premium Study Room",
        description: "State-of-the-art study rooms with premium facilities",
      },
    ],
    rooms: "16 premium rooms",
    features: [
      "Premium Facilities",
      "Course Bundle Ready",
      "Exclusive Access",
      "Ensuite Bathroom",
      "Mini Kitchen",
      "Balcony",
      "High-Speed Internet",
      "Smart TV",
    ],
    amenities: [
      "24/7 Concierge",
      "Premium Laundry Service",
      "Daily Housekeeping",
      "Executive Lounge",
      "Private Study Rooms",
      "Gourmet Kitchen",
      "Fitness Center",
      "Swimming Pool",
      "Rooftop Garden",
      "Parking Space",
    ],
    pricing: [
      {
        id: 1,
        type: "Per Room/Month",
        price: "Rp 2,800,000 - Rp 3,500,000",
        description: "Premium room with ensuite bathroom and balcony",
        highlight: false,
      },
    ],
    badge: "Premium",
    badgeColor: "bg-brand-600",
    location: {
      address: "789 Language Road, Denpasar, Bali 80221",
      mapUrl: "https://maps.google.com/?q=789+Language+Road+Denpasar+Bali",
    },
    contact: {
      phone: "+62 361 9876 5432",
      email: "building3@educamp.com",
    },
    rules: [
      "Quiet hours: 10:00 PM - 6:00 AM",
      "No smoking inside the building",
      "Guest registration required at reception",
      "Keep common areas clean",
      "Respect other residents' privacy",
      "No pets allowed",
      "Use of facilities requires prior booking",
    ],
    availability: {
      peakSeason: {
        months: ["December", "June", "July"],
        description: "High demand period - book early for best availability",
      },
      mediumSeason: {
        months: ["January", "October"],
        description: "Moderate availability with good rates",
      },
      lowSeason: {
        months: [
          "February",
          "March",
          "April",
          "May",
          "August",
          "September",
          "November",
        ],
        description: "Best availability and special rates",
      },
    },
    relatedBuildings: [
      {
        id: 1,
        name: "Building 1",
        slug: "building-1-premium",
        image:
          "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1186&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageAlt: "Building 1 exterior",
        shortDescription: "Premium accommodation with private facilities",
      },
      {
        id: 2,
        name: "Building 2",
        slug: "building-2-budget",
        image:
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageAlt: "Building 2 exterior",
        shortDescription: "Budget-friendly shared accommodation",
      },
    ],
  },
];

// Function to get all buildings
export function getAllBuildings(): Building[] {
  return buildings;
}

// Function to get a single building by slug
export function getBuildingBySlug(slug: string): Building | undefined {
  return buildings.find((building) => building.slug === slug);
}

// Function to get related buildings (excluding the current building)
export function getRelatedBuildings(
  currentBuildingId: number,
  limit = 2,
): Building[] {
  return buildings
    .filter((building) => building.id !== currentBuildingId)
    .slice(0, limit);
}
