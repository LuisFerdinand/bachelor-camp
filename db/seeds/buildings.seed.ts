// db/seeds/buildings.seed.ts
import { db } from "..";
import { buildings, locations } from "../schema";
import { v4 as uuidv4 } from "uuid";
import { BooleanType, PageType } from "../schema/enums";
import { eq } from "drizzle-orm";
import { ICON_URL_FALLBACK } from "@/constants";

export const seedBuildings = async () => {
  console.log("🌱 Seeding buildings...");

  // Optional: Clear existing data
  await db.delete(buildings);

  type BuildingInsert = typeof buildings.$inferInsert;

  const location = await db
    .select()
    .from(locations)
    .where(eq(locations.isActive, "true"))
    .then((res) => res[0]);

  const data: BuildingInsert[] = [
    {
      locationId: location.id,
      slug: "the-horizon-residence",
      name: "The Horizon Residence",
      description:
        "Premium student accommodation with private rooms and study facilities",
      longDescription:
        "The Horizon Residence is a modern student accommodation located in South Jakarta, just a 10-minute walk from the main university campus. Rooms are fully furnished with private bathrooms, study desks, and high-speed Wi-Fi. Residents have access to communal lounges, a fitness center, and rooftop gardens, providing a balanced environment for study and leisure.",

      imageUrl:
        "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1186&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageKey: null,
      imageAlt: "The Horizon Residence Main",

      badge: "Most Popular",
      badgeColor: "#1F85F5",

      rules: [
        { text: "Quiet hours from 10 PM to 6 AM", iconUrl: ICON_URL_FALLBACK },
        { text: "No smoking inside the building", iconUrl: ICON_URL_FALLBACK },
        {
          text: "Guests must register at reception",
          iconUrl: ICON_URL_FALLBACK,
        },
        { text: "Keep common areas clean", iconUrl: ICON_URL_FALLBACK },
        { text: "Respect fellow residents", iconUrl: ICON_URL_FALLBACK },
        { text: "Pets are not allowed", iconUrl: ICON_URL_FALLBACK },
      ],
      availability: {
        peakSeason: {
          months: ["December", "June", "July"],
          description: "High demand months – book early",
        },
        mediumSeason: {
          months: ["January", "October"],
          description: "Moderate availability and standard rates",
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
          description: "Best availability and discounted rates",
        },
      },
      isActive: "true",
      order: 1,
    },
    {
      locationId: location.id,
      slug: "educamp-west-surabaya",
      name: "EduCamp West Surabaya",
      description:
        "Affordable student accommodation with modern shared facilities",
      longDescription:
        "EduCamp West Surabaya provides budget-friendly student housing with fully furnished shared rooms. Perfect for students seeking a safe, social, and convenient living environment. The building includes study areas, communal lounges, laundry facilities, and high-speed internet to support both learning and leisure.",

      imageUrl:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageKey: null,
      imageAlt: "EduCamp West Surabay Main",

      badge: "Best Value",
      badgeColor: "#22c55e",

      rules: [
        {
          text: "Quiet hours: 10:00 PM - 6:00 AM",
          iconUrl: ICON_URL_FALLBACK,
        },
        {
          text: "No smoking inside the building",
          iconUrl: ICON_URL_FALLBACK,
        },
        {
          text: "Guest registration required at reception",
          iconUrl: ICON_URL_FALLBACK,
        },
        { text: "Keep common areas clean", iconUrl: ICON_URL_FALLBACK },
        {
          text: "Respect other residents' privacy",
          iconUrl: ICON_URL_FALLBACK,
        },
        { text: "No pets allowed", iconUrl: ICON_URL_FALLBACK },
      ],
      availability: {
        peakSeason: {
          months: ["December", "June", "July"],
          description: "High demand period – book early to secure your room",
        },
        mediumSeason: {
          months: ["January", "October"],
          description: "Moderate availability with standard rates",
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
          description: "Rooms readily available with special discounts",
        },
      },
      isActive: "true",
      order: 2,
    },
    {
      locationId: location.id,
      slug: "educamp-bali-premium",
      name: "EduCamp Bali Premium",
      description: "Luxury student accommodation with exclusive amenities",
      longDescription:
        "EduCamp Bali Premium provides an unparalleled luxury living experience for students seeking comfort and style. Each room comes with ensuite bathroom, balcony, and modern furnishings. Premium shared spaces include executive lounge, rooftop garden, gym, and private study rooms, ideal for both study and relaxation.",

      imageUrl:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageKey: null,
      imageAlt: "EduCamp Bali Premium Main",

      badge: "Premium",
      badgeColor: "#083cbc",

      rules: [
        {
          text: "Quiet hours: 10:00 PM - 6:00 AM",
          iconUrl: ICON_URL_FALLBACK,
        },
        {
          text: "No smoking inside the building",
          iconUrl: ICON_URL_FALLBACK,
        },
        {
          text: "Guest registration required at reception",
          iconUrl: ICON_URL_FALLBACK,
        },
        { text: "Keep common areas clean", iconUrl: ICON_URL_FALLBACK },
        {
          text: "Respect other residents' privacy",
          iconUrl: ICON_URL_FALLBACK,
        },
        { text: "No pets allowed", iconUrl: ICON_URL_FALLBACK },
        {
          text: "Use of premium facilities requires prior booking",
          iconUrl: ICON_URL_FALLBACK,
        },
      ],
      availability: {
        peakSeason: {
          months: ["December", "June", "July"],
          description: "High demand period – book early to secure your room",
        },
        mediumSeason: {
          months: ["January", "October"],
          description: "Moderate availability with standard rates",
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
          description: "Rooms readily available with special discounts",
        },
      },
      isActive: "true",
      order: 3,
    },
  ];

  // Insert sample buildings
  await db.insert(buildings).values(data);

  console.log("✅ Buildings seeded successfully!");
};
