// db/seeds/milestones.seed.ts
import { db } from "..";
import { milestones } from "../schema";
import { v4 as uuidv4 } from "uuid";
import { BooleanType, PageType } from "../schema/enums";

export const seedMilestones = async () => {
  console.log("🌱 Seeding milestones...");

  // Optional: Clear existing data
  await db.delete(milestones);

  type MilestoneInsert = typeof milestones.$inferInsert;

  const data: MilestoneInsert[] = [
    {
      id: uuidv4(),
      year: 2010,
      title: "Founded",
      slug: "founded",
      isActive: "true",
      description:
        "Our institution was established with the vision to provide accessible, high-quality English education for students of all backgrounds.",
      order: 1,
    },
    {
      id: uuidv4(),
      year: 2012,
      title: "First 100 Graduates",
      slug: "first-100-graduates",
      isActive: "true",
      description:
        "Celebrated our first 100 students successfully completing the English proficiency program, marking an important milestone in our journey.",
      order: 2,
    },
    {
      id: uuidv4(),
      year: 2015,
      title: "First Campus in Jakarta",
      slug: "first-campus-in-jakarta",
      isActive: "true",
      description:
        "Opened our first dedicated campus in Jakarta to provide a modern and inspiring learning environment.",
      order: 3,
    },
    {
      id: uuidv4(),
      year: 2017,
      title: "Accreditation Achieved",
      slug: "accreditation-achieved",
      isActive: "true",
      description:
        "Received international accreditation for maintaining high academic standards and innovative teaching methodologies.",
      order: 4,
    },
    {
      id: uuidv4(),
      year: 2018,
      title: "International Expansion",
      slug: "international-expansion",
      isActive: "true",
      description:
        "Started welcoming students from across Asia, creating a diverse and multicultural learning community.",
      order: 5,
    },
    {
      id: uuidv4(),
      year: 2020,
      title: "Digital Transformation",
      slug: "digital-transformation",
      isActive: "true",
      description:
        "Launched an online learning platform to ensure uninterrupted education and expand our reach globally.",
      order: 6,
    },
    {
      id: uuidv4(),
      year: 2021,
      title: "Scholarship Program",
      slug: "scholarship-program",
      isActive: "true",
      description:
        "Introduced scholarships to support underprivileged students in accessing world-class English education.",
      order: 7,
    },
    {
      id: uuidv4(),
      year: 2023,
      title: "New Facilities Expansion",
      slug: "new-facilities-expansion",
      isActive: "true",
      description:
        "Opened state-of-the-art classrooms, digital labs, and collaborative spaces to enhance the student experience.",
      order: 8,
    },
    {
      id: uuidv4(),
      year: 2025,
      title: "Global Partnerships",
      slug: "global-partnerships",
      isActive: "true",
      description:
        "Established collaborations with international universities and institutions to provide students with broader learning opportunities.",
      order: 9,
    },
  ];

  // Insert sample milestones
  await db.insert(milestones).values(data);

  console.log("✅ Milestones seeded successfully!");
};
