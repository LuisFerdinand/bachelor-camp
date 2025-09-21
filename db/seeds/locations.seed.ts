// db/seeds/locations.seed.ts
import { db } from "..";
import { v4 as uuidv4 } from "uuid";
import { locations } from "../schema";

export const seedLocations = async () => {
  console.log("🌱 Seeding locations...");

  // Optional: clear existing data
  await db.delete(locations);

  type LocationInsert = typeof locations.$inferInsert;

  const defaultHours = [
    { day: "monday", open: "08:00", close: "17:00" },
    { day: "tuesday", open: "08:00", close: "17:00" },
    { day: "wednesday", open: "08:00", close: "17:00" },
    { day: "thursday", open: "08:00", close: "17:00" },
    { day: "friday", open: "08:00", close: "17:00" },
    { day: "saturday", open: "09:00", close: "14:00" },
    { day: "sunday", open: "00:00", close: "00:00", isClosed: true },
  ];

  const data: LocationInsert[] = [
    {
      id: uuidv4(),
      name: "BachelorCamp English Learning Center",
      address: "Jl. Veteran No. 15, Kediri City, East Java 64127",
      phone: "+62 354 123456",
      email: "kediri@bachelorcamp.com",
      lat: "-6.16560972",
      lng: "106.78050486",
      mapsLink: "https://goo.gl/maps/abcd1234kediri",
      hours: defaultHours,
      isActive: "true",
    },
    {
      id: uuidv4(),
      name: "BachelorCamp Jakarta Office",
      address:
        "Jl. Sudirman No.22, Tanah Abang, Jakarta Pusat, DKI Jakarta 10220, Indonesia",
      lat: "-6.2087634",
      lng: "106.8455990",
      mapsLink: "https://goo.gl/maps/abcd1234jakarta",
      phone: "+62 812-2222-3333",
      email: "jakarta@bachelorcamp.id",
      hours: defaultHours,
      isActive: "false",
    },
    {
      id: uuidv4(),
      name: "BachelorCamp Surabaya Branch",
      address:
        "Jl. Raya Darmo No.99, Wonokromo, Surabaya, Jawa Timur 60241, Indonesia",
      lat: "-7.2902931",
      lng: "112.7271381",
      mapsLink: "https://goo.gl/maps/abcd1234surabaya",
      phone: "+62 813-1234-5678",
      email: "surabaya@bachelorcamp.id",
      hours: defaultHours,
      isActive: "false",
    },
    {
      id: uuidv4(),
      name: "BachelorCamp Bali Learning Center",
      address: "Jl. Raya Ubud No.17, Ubud, Gianyar, Bali 80571, Indonesia",
      lat: "-8.506939",
      lng: "115.262478",
      mapsLink: "https://goo.gl/maps/abcd1234bali",
      phone: "+62 819-8765-4321",
      email: "bali@bachelorcamp.id",
      hours: defaultHours,
      isActive: "false",
    },
  ];

  await db.insert(locations).values(data);

  console.log("✅ Locations seeded successfully!");
};
