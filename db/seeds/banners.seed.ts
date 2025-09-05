// db/seeds/banners.seed.ts
import { db } from "..";
import { banners } from "../schema";
import { v4 as uuidv4 } from "uuid";
import { BooleanType, PageType } from "../schema/enums";

export const seedBanners = async () => {
  console.log("🌱 Seeding banners...");

  // Optional: Clear existing data
  await db.delete(banners);

  type BannerInsert = typeof banners.$inferInsert;

   const data : BannerInsert[] =  [
    // HOME banners
    {
      id: uuidv4(),
      type: "Home" as PageType,
      headline: "Welcome to Bachelor Camp",
      subheadline: "Discover programs, camps, and tests to boost your skills.",
      ctaText1: "Explore Now",
      ctaLink1: "/programs",
      ctaColor1: "bg-blue-500 text-white",
      isShown1: "true" as BooleanType,
      mediaUrl: "/images/banner-home-1.jpg",
      isActive: "true" as BooleanType,
    },
    {
      id: uuidv4(),
      type: "Home" as PageType,
      headline: "Your Journey Starts Here",
      subheadline: "Learn, grow, and connect with like-minded individuals.",
      ctaText1: "Get Started",
      ctaLink1: "/about",
      ctaColor1: "bg-indigo-500 text-white",
      isShown1: "true" as BooleanType,
      mediaUrl: "/images/banner-home-2.jpg",
      isActive: "false",
    },
    {
      id: uuidv4(),
      type: "Home" as PageType,
      headline: "Find Your Passion",
      subheadline: "Choose from a variety of courses and camps tailored for you.",
      ctaText1: "View Courses",
      ctaLink1: "/programs",
      ctaColor1: "bg-pink-500 text-white",
      isShown1: "true" as BooleanType,
      mediaUrl: "/images/banner-home-3.jpg",
      isActive: "false",
    },

    // CAMP banners
    {
      id: uuidv4(),
      type: "Camp" as PageType,
      headline: "Adventure Awaits!",
      subheadline: "Join our exciting camps and make memories.",
      ctaText1: "View Camps",
      ctaLink1: "/camp",
      ctaColor1: "bg-green-500 text-white",
      isShown1: "true" as BooleanType,
      mediaUrl: "/images/banner-camp-1.jpg",
      isActive: "true" as BooleanType,
    },
    {
      id: uuidv4(),
      type: "Camp" as PageType,
      headline: "Team Building & Fun",
      subheadline: "Unleash your potential with group activities.",
      ctaText1: "Join Now",
      ctaLink1: "/camp",
      ctaColor1: "bg-yellow-500 text-black",
      isShown1: "true" as BooleanType,
      mediaUrl: "/images/banner-camp-2.jpg",
      isActive: "false",
    },

    // PROGRAMS banners
    {
      id: uuidv4(),
      type: "Programs" as PageType,
      headline: "Level Up Your Skills",
      subheadline: "Enroll in specialized programs designed for you.",
      ctaText1: "Start Learning",
      ctaLink1: "/programs",
      ctaColor1: "bg-purple-500 text-white",
      isShown1: "true" as BooleanType,
      mediaUrl: "/images/banner-programs-1.jpg",
      isActive: "true" as BooleanType,
    },
    {
      id: uuidv4(),
      type: "Programs" as PageType,
      headline: "Personal Growth",
      subheadline: "Programs built for self-development and leadership.",
      ctaText1: "Explore Programs",
      ctaLink1: "/programs",
      ctaColor1: "bg-teal-500 text-white",
      isShown1: "true" as BooleanType,
      mediaUrl: "/images/banner-programs-2.jpg",
      isActive: "false",
    },

    // TESTS banners
    {
      id: uuidv4(),
      type: "Tests" as PageType,
      headline: "Test Your Knowledge",
      subheadline: "Challenge yourself with curated tests.",
      ctaText1: "Take a Test",
      ctaLink1: "/tests",
      ctaColor1: "bg-orange-500 text-white",
      isShown1: "true" as BooleanType,
      mediaUrl: "/images/banner-tests-1.jpg",
      isActive: "true" as BooleanType,
    },
    {
      id: uuidv4(),
      type: "Tests" as PageType,
      headline: "Sharpen Your Mind",
      subheadline: "Analyze your skills and improve performance.",
      ctaText1: "Try Now",
      ctaLink1: "/tests",
      ctaColor1: "bg-gray-700 text-white",
      isShown1: "true" as BooleanType,
      mediaUrl: "/images/banner-tests-2.jpg",
      isActive: "false",
    },

    // ABOUT banners
    {
      id: uuidv4(),
      type: "About" as PageType,
      headline: "Who We Are",
      subheadline: "Learn more about our mission and values.",
      ctaText1: "Our Story",
      ctaLink1: "/about",
      ctaColor1: "bg-blue-800 text-white",
      isShown1: "true" as BooleanType,
      mediaUrl: "/images/banner-about-1.jpg",
      isActive: "true" as BooleanType,
    },
    {
      id: uuidv4(),
      type: "About" as PageType,
      headline: "Meet The Team",
      subheadline: "Our passionate team makes it all possible.",
      ctaText1: "Team",
      ctaLink1: "/about",
      ctaColor1: "bg-pink-700 text-white",
      isShown1: "true" as BooleanType,
      mediaUrl: "/images/banner-about-2.jpg",
      isActive: "false",
    },

    // BLOG banners
    {
      id: uuidv4(),
      type: "Blog" as PageType,
      headline: "Latest Insights & News",
      subheadline: "Stay updated with the latest trends and stories.",
      ctaText1: "Read Blog",
      ctaLink1: "/blog",
      ctaColor1: "bg-indigo-700 text-white",
      isShown1: "true" as BooleanType,
      mediaUrl: "/images/banner-blog-1.jpg",
      isActive: "true" as BooleanType,
    },
    {
      id: uuidv4(),
      type: "Blog" as PageType,
      headline: "Tips & Tricks",
      subheadline: "Helpful advice from experts in the field.",
      ctaText1: "View Posts",
      ctaLink1: "/blog",
      ctaColor1: "bg-lime-600 text-white",
      isShown1: "true" as BooleanType,
      mediaUrl: "/images/banner-blog-2.jpg",
      isActive: "false",
    },

    // CONTACT banners
    {
      id: uuidv4(),
      type: "Contact" as PageType,
      headline: "Get In Touch",
      subheadline: "We’d love to hear from you. Reach out anytime.",
      ctaText1: "Contact Us",
      ctaLink1: "/contact",
      ctaColor1: "bg-red-600 text-white",
      isShown1: "true" as BooleanType,
      mediaUrl: "/images/banner-contact-1.jpg",
      isActive: "true" as BooleanType,
    },
    {
      id: uuidv4(),
      type: "Contact" as PageType,
      headline: "Let’s Collaborate",
      subheadline: "Have an idea? Let's bring it to life together.",
      ctaText1: "Reach Out",
      ctaLink1: "/contact",
      ctaColor1: "bg-emerald-600 text-white",
      isShown1: "true" as BooleanType,
      mediaUrl: "/images/banner-contact-2.jpg",
      isActive: "false",
    },
  ];

  // Insert sample banners
  await db.insert(banners).values(data);

  console.log("✅ Banners seeded successfully!");
};
