// db/seeds/accreditations.seed.ts
import { db } from "..";
import { accreditations } from "../schema";
import { v4 as uuidv4 } from "uuid";
import { BooleanType, PageType } from "../schema/enums";

export const seedAccreditations = async () => {
  console.log("🌱 Seeding accreditations...");

  // Optional: Clear existing data
  await db.delete(accreditations);

  type AccreditationInsert = typeof accreditations.$inferInsert;

  const data: AccreditationInsert[] = [
    {
      title: "British Council Accredited",
      slug: "british-council-accredited",
      description:
        "Recognized by the British Council for maintaining high standards in English language education.",
      isActive: "true",
      order: 1,
    },
    {
      title: "Cambridge Assessment English",
      slug: "cambridge-assessment-english",
      description:
        "Authorized to prepare students for Cambridge English Qualifications, recognized worldwide.",
      isActive: "true",
      order: 2,
    },
    {
      title: "TOEFL Authorized Test Center",
      slug: "toefl-authorized-test-center",
      description:
        "Accredited as an official center for the Test of English as a Foreign Language (TOEFL).",
      isActive: "true",
      order: 3,
    },
    {
      title: "IELTS Registration Partner",
      slug: "ielts-registration-partner",
      description:
        "Official partner for IELTS test registration, supporting international study and migration needs.",
      isActive: "true",
      order: 4,
    },
    {
      title: "ISO 21001 Certified",
      slug: "iso-21001-certified",
      description:
        "Certified under ISO 21001:2018 for Educational Organizations Management System.",
      isActive: "true",
      order: 5,
    },
    {
      title: "TESOL International Association",
      slug: "tesol-international-association",
      description:
        "Member of TESOL International, ensuring professional standards in teaching English to speakers of other languages.",
      isActive: "true",
      order: 6,
    },
  ];

  // Insert sample accreditations
  await db.insert(accreditations).values(data);

  console.log("✅ Accreditations seeded successfully!");
};
