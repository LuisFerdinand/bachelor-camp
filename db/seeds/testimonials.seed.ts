// db/seeds/testimonials.seed.ts
import { db } from "..";
import {
  testimonialCategories,
  testimonialCategoryRelations,
  testimonials,
} from "../schema";
import { v4 as uuidv4 } from "uuid";
import { BooleanType, PageType } from "../schema/enums";

export const seedTestimonials = async () => {
  console.log("🌱 Seeding testimonials...");

  // Optional: Clear existing data
  await db.delete(testimonials);
  await db.delete(testimonialCategories);

  type TestimonialCategoryInsert = typeof testimonialCategories.$inferInsert;
  type TestimonialInsert = typeof testimonials.$inferInsert;

  const categories: TestimonialCategoryInsert[] = [
    { name: "Home", slug: "home" },
    { name: "Camp", slug: "camp" },
    { name: "Programs", slug: "programs" },
    { name: "Tests", slug: "tests" },
    { name: "About", slug: "about" },
  ];

  const insertedCategories = await db
    .insert(testimonialCategories)
    .values(categories.map((c) => ({ id: uuidv4(), ...c })))
    .returning();

  const catMap = Object.fromEntries(
    insertedCategories.map((c) => [c.slug, c.id])
  );

  const testimonialData = [
    {
      name: "Alice Johnson",
      role: "High School Student",
      source: "student",
      content:
        "The camp was amazing! I learned so much and met friends from all over the world.",
      rating: "4.8",
      isFeatured: "true",
      isShown: "true",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      order: 1,
      categories: ["Home", "Camp"],
    },
    {
      name: "Michael Smith",
      role: "Parent of Participant",
      source: "parent",
      content:
        "I’ve seen a big improvement in my child’s confidence and communication skills.",
      rating: "5.0",
      isFeatured: "false",
      isShown: "true",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      order: 2,
      categories: ["Home", "About"],
    },
    {
      name: "Sarah Lee",
      role: "Corporate Partner Representative",
      source: "partner",
      content:
        "Partnering with this program has been a rewarding experience for our employees.",
      rating: "4.5",
      isFeatured: "true",
      isShown: "true",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      order: 3,
      categories: ["Programs"],
    },
    {
      name: "Daniel Kim",
      role: "Test Preparation Student",
      source: "student",
      content:
        "The test preparation resources were clear and effective. I felt confident on exam day!",
      rating: "4.7",
      isFeatured: "true",
      isShown: "true",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      order: 4,
      categories: ["Tests"],
    },
    {
      name: "Maria Rodriguez",
      role: "Undergraduate Student",
      source: "student",
      content:
        "The teachers are so supportive and always encourage us to do our best.",
      rating: "4.9",
      isFeatured: "false",
      isShown: "true",
      imageUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      order: 5,
      categories: ["Programs", "Home"],
    },
    {
      name: "David Green",
      role: "Program Alumni",
      source: "student",
      content:
        "After joining the program, I got accepted into my dream university.",
      rating: "5.0",
      isFeatured: "true",
      isShown: "true",
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      order: 6,
      categories: ["About", "Programs"],
    },
    {
      name: "Emily Chen",
      role: "High School Student",
      source: "student",
      content:
        "The interactive classes made learning so much fun and memorable.",
      rating: "4.6",
      isFeatured: "false",
      isShown: "true",
      imageUrl: "",
      order: 7,
      categories: ["Programs"],
    },
    {
      name: "Robert White",
      role: "Parent of Student",
      source: "parent",
      content:
        "I highly recommend this camp for any parent looking to enrich their child’s education.",
      rating: "5.0",
      isFeatured: "true",
      isShown: "true",
      imageUrl: "",
      order: 8,
      categories: ["Camp", "About"],
    },
    {
      name: "Sophia Brown",
      role: "Undergraduate Student",
      source: "student",
      content:
        "The facilities were top-notch and made studying comfortable and effective.",
      rating: "4.4",
      isFeatured: "false",
      isShown: "true",
      imageUrl: "",
      order: 9,
      categories: ["Home"],
    },
    {
      name: "James Wilson",
      role: "Test Preparation Student",
      source: "student",
      content:
        "The mock tests really prepared me for the real thing. Highly accurate practice!",
      rating: "4.9",
      isFeatured: "true",
      isShown: "true",
      imageUrl: "",
      order: 10,
      categories: ["Tests", "Programs"],
    },
    {
      name: "Olivia Martinez",
      role: "High School Student",
      source: "student",
      content:
        "Camp activities were fun and helped me develop teamwork and leadership skills.",
      rating: "4.7",
      isFeatured: "false",
      isShown: "true",
      imageUrl: "",
      order: 11,
      categories: ["Camp"],
    },
    {
      name: "William Scott",
      role: "Corporate Partner Representative",
      source: "partner",
      content:
        "We’ve been collaborating for years and always see positive results for participants.",
      rating: "4.8",
      isFeatured: "true",
      isShown: "true",
      imageUrl: "",
      order: 12,
      categories: ["About"],
    },
    {
      name: "Chloe Taylor",
      role: "Undergraduate Student",
      source: "student",
      content:
        "The programs challenged me to grow and achieve more than I thought possible.",
      rating: "4.6",
      isFeatured: "false",
      isShown: "true",
      imageUrl: "",
      order: 13,
      categories: ["Programs"],
    },
    {
      name: "Ethan Davis",
      role: "High School Student",
      source: "student",
      content:
        "I loved the cultural exchange and how much I learned from international friends.",
      rating: "4.7",
      isFeatured: "true",
      isShown: "true",
      imageUrl: "",
      order: 14,
      categories: ["Camp", "Home"],
    },
    {
      name: "Grace Lee",
      role: "Test Preparation Student",
      source: "student",
      content:
        "Thanks to the preparation, I improved my score significantly and reached my target band.",
      rating: "5.0",
      isFeatured: "true",
      isShown: "true",
      imageUrl: "",
      order: 15,
      categories: ["Tests"],
    },
  ];

  // --- 3. Insert Testimonials + Relations ---
  for (const t of testimonialData) {
    const [inserted] = await db
      .insert(testimonials)
      .values({
        id: uuidv4(),
        name: t.name,
        role: t.role,
        source: t.source as any,
        content: t.content,
        rating: t.rating,
        isFeatured: t.isFeatured as any,
        isShown: t.isShown as any,
        imageUrl: t.imageUrl || "",
        order: t.order,
      })
      .returning();

    for (const cat of t.categories) {
      await db.insert(testimonialCategoryRelations).values({
        id: uuidv4(),
        testimonialId: inserted.id,
        categoryId: catMap[cat.toLowerCase()],
      });
    }
  }
};
