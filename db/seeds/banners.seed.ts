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

  const data: BannerInsert[] = [
    // HOME banners
    {
      id: uuidv4(),
      type: "Home" as PageType,
      headline: "Welcome to Bachelor Camp",
      subheadline: "Discover programs, camps, and tests to boost your skills.",
      ctas: [
        {
          ctaText: "Explore Now",
          ctaLink: "/programs",
          isShown: true,
        },
      ],
      mediaUrl:
        "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      badgeText: "New",
      isActive: "false" as BooleanType,
    },
    {
      id: uuidv4(),
      type: "Home" as PageType,
      headline: "Master English with Expert Instructors",
      subheadline:
        "Premium English learning experience with professional facilities, expert instructors, and proven results.",
      ctas: [
        { ctaText: "Explore Programs", ctaLink: "/programs", isShown: true },
        { ctaText: "Book a Consultation", ctaLink: "/", isShown: true },
      ],
      mediaUrl:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      badgeText: "New Programs Available",
      isActive: "true" as BooleanType,
    },
    {
      id: uuidv4(),
      type: "Home" as PageType,
      headline: "Your Journey Starts Here",
      subheadline: "Learn, grow, and connect with like-minded individuals.",
      ctas: [{ ctaText: "Get Started", ctaLink: "/about", isShown: true }],
      mediaUrl:
        "https://images.unsplash.com/photo-1639104796319-3731d8908e47?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8WW91ciUyMEpvdXJuZXklMjBTdGFydHMlMjBIZXJlfGVufDB8fDB8fHww",
      badgeText: "Featured",
      isActive: "false",
    },
    {
      id: uuidv4(),
      type: "Home" as PageType,
      headline: "Find Your Passion",
      subheadline:
        "Choose from a variety of courses and camps tailored for you.",
      ctas: [{ ctaText: "View Courses", ctaLink: "/programs", isShown: true }],

      mediaUrl:
        "https://plus.unsplash.com/premium_photo-1683120730432-b5ea74bd9047?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      badgeText: "Hot",
      isActive: "false",
    },

    // CAMP banners
    {
      id: uuidv4(),
      type: "Camp" as PageType,
      headline: "Comfortable Student Living",
      subheadline:
        "Three modern buildings with complete facilities - AC, laundry, housekeeping, and 24/7 security. Choose from budget-friendly to premium options starting from Rp 600,000/month.",
      ctas: [
        { ctaText: "Check Availability", ctaLink: "/camp", isShown: true },
        { ctaText: "WhatsApp Inquiry", ctaLink: "/camp", isShown: true },
        { ctaText: "Book Now", ctaLink: "/camp", isShown: true },
      ],
      mediaUrl:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      badgeText: "Student Accommodation",
      isActive: "true" as BooleanType,
    },
    {
      id: uuidv4(),
      type: "Camp" as PageType,
      headline: "Adventure Awaits!",
      subheadline: "Join our exciting camps and make memories.",
      ctas: [{ ctaText: "View Camps", ctaLink: "/camp", isShown: true }],
      mediaUrl:
        "https://images.unsplash.com/photo-1531558506007-fe311a2f4729?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      badgeText: "Popular",
      isActive: "false" as BooleanType,
    },
    {
      id: uuidv4(),
      type: "Camp" as PageType,
      headline: "Team Building & Fun",
      subheadline: "Unleash your potential with group activities.",
      ctas: [{ ctaText: "Join Now", ctaLink: "/camp", isShown: true }],
      mediaUrl:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      badgeText: "New",
      isActive: "false",
    },

    // PROGRAMS banners
    {
      id: uuidv4(),
      type: "Programs" as PageType,
      headline: "English Programs for Every Goal",
      subheadline:
        "Specialized courses designed to meet specific learning objectives with expert instruction and proven methodologies.",

      ctas: [
        { ctaText: "View Programs", ctaLink: "/programs", isShown: true },
        { ctaText: "Take Placement Test", ctaLink: "/programs", isShown: true },
        { ctaText: "Contact Us", ctaLink: "/programs", isShown: true },
      ],
      mediaUrl:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      badgeText: "Special Program",
      isActive: "true" as BooleanType,
    },
    {
      id: uuidv4(),
      type: "Programs" as PageType,
      headline: "Level Up Your Skills",
      subheadline: "Enroll in specialized programs designed for you.",
      ctas: [
        { ctaText: "Start Learning", ctaLink: "/programs", isShown: true },
      ],
      mediaUrl:
        "https://plus.unsplash.com/premium_photo-1670002474719-75304e0e81cc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      badgeText: "Top Pick",
      isActive: "false" as BooleanType,
    },
    {
      id: uuidv4(),
      type: "Programs" as PageType,
      headline: "Personal Growth",
      subheadline: "Programs built for self-development and leadership.",
      ctas: [
        { ctaText: "Explore Programs", ctaLink: "/programs", isShown: true },
      ],
      mediaUrl:
        "https://plus.unsplash.com/premium_photo-1681843215421-bd6f1d1e00dd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      badgeText: "Trending",
      isActive: "false",
    },

    // TESTS banners
    {
      id: uuidv4(),
      type: "Tests" as PageType,
      headline: "Test Your Knowledge",
      subheadline: "Challenge yourself with curated tests.",
      ctas: [{ ctaText: "Take a Test", ctaLink: "/tests", isShown: true }],

      mediaUrl:
        "https://plus.unsplash.com/premium_photo-1683535508318-91168d1c292b?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      badgeText: "Featured",
      isActive: "true" as BooleanType,
    },
    {
      id: uuidv4(),
      type: "Tests" as PageType,
      headline: "Sharpen Your Mind",
      subheadline: "Analyze your skills and improve performance.",
      ctas: [{ ctaText: "Try Now", ctaLink: "/tests", isShown: true }],
      mediaUrl:
        "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      badgeText: "New",
      isActive: "false",
    },

    // ABOUT banners
    {
      id: uuidv4(),
      type: "About" as PageType,
      headline: "Excellence in English Education",
      subheadline:
        "For over a decade, we&apos;ve been providing world-class English education with a focus on practical skills and cultural immersion.",
      ctas: [
        { ctaText: "Our Mission", ctaLink: "/about", isShown: true },
        { ctaText: "Meet Our Team", ctaLink: "/about", isShown: true },
        { ctaText: "Contact Us", ctaLink: "/about", isShown: true },
      ],

      mediaUrl:
        "https://images.unsplash.com/photo-1596496356933-9b6e0b186b88?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      badgeText: "About Our Institution",
      isActive: "true" as BooleanType,
    },
    {
      id: uuidv4(),
      type: "About" as PageType,
      headline: "Who We Are",
      subheadline: "Learn more about our mission and values.",
      ctas: [{ ctaText: "Our Story", ctaLink: "/about", isShown: true }],
      mediaUrl:
        "https://plus.unsplash.com/premium_photo-1661756423422-4486e27eb6dd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      badgeText: "Info",
      isActive: "false" as BooleanType,
    },
    {
      id: uuidv4(),
      type: "About" as PageType,
      headline: "Meet The Team",
      subheadline: "Our passionate team makes it all possible.",
      ctas: [{ ctaText: "Our Team", ctaLink: "/about", isShown: true }],

      mediaUrl:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      badgeText: "Highlight",
      isActive: "false",
    },

    // BLOG banners
    {
      id: uuidv4(),
      type: "Blog" as PageType,
      headline: "English Learning Hub",
      subheadline:
        "Discover expert tips, proven strategies, and actionable insights to accelerate your English learning journey.",
      ctas: [
        { ctaText: "Browse All Articles", ctaLink: "/blog", isShown: true },
        { ctaText: "Subscribe to Updates", ctaLink: "/blog", isShown: true },
        { ctaText: "Trending Topics", ctaLink: "/blog", isShown: true },
      ],

      mediaUrl:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      badgeText: "Knowledge Center",
      isActive: "true" as BooleanType,
    },
    {
      id: uuidv4(),
      type: "Blog" as PageType,
      headline: "Latest Insights & News",
      subheadline: "Stay updated with the latest trends and stories.",
      ctas: [{ ctaText: "Read Blog", ctaLink: "/blog", isShown: true }],
      mediaUrl:
        "https://images.unsplash.com/photo-1704881986173-ca3692ae0353?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      badgeText: "Latest",
      isActive: "false" as BooleanType,
    },
    {
      id: uuidv4(),
      type: "Blog" as PageType,
      headline: "Tips & Tricks",
      subheadline: "Helpful advice from experts in the field.",
      ctas: [{ ctaText: "View Posts", ctaLink: "/blog", isShown: true }],

      mediaUrl:
        "https://plus.unsplash.com/premium_vector-1734446350496-0eb26eab111e?q=80&w=1098&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      badgeText: "Guide",
      isActive: "false",
    },

    // CONTACT banners
    {
      id: uuidv4(),
      type: "Contact" as PageType,
      headline: "Contact Us",
      subheadline:
        "Have questions about our programs or ready to start your English learning journey? Our team is here to help you every step of the way.",
      ctas: [
        { ctaText: "Send Message", ctaLink: "/contact", isShown: true },
        { ctaText: "Call Us", ctaLink: "/contact", isShown: true },
        { ctaText: "Visit Campus", ctaLink: "/contact", isShown: false },
      ],

      mediaUrl:
        "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      badgeText: "Get In Touch",
      isActive: "true" as BooleanType,
    },
    {
      id: uuidv4(),
      type: "Contact" as PageType,
      headline: "Get In Touch",
      subheadline: "We’d love to hear from you. Reach out anytime.",
      ctas: [{ ctaText: "Contact Us", ctaLink: "/contact", isShown: true }],
      mediaUrl:
        "https://plus.unsplash.com/premium_vector-1682269372337-0494cb2ebd69?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      badgeText: "Reach Us",
      isActive: "false" as BooleanType,
    },
    {
      id: uuidv4(),
      type: "Contact" as PageType,
      headline: "Let’s Collaborate",
      subheadline: "Have an idea? Let's bring it to life together.",
      ctas: [{ ctaText: "Reach Out", ctaLink: "/contact", isShown: true }],
      mediaUrl:
        "https://plus.unsplash.com/premium_vector-1682302934485-6d593c4020c3?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      badgeText: "Collab",
      isActive: "false",
    },
  ];
  // Insert sample banners
  await db.insert(banners).values(data);

  console.log("✅ Banners seeded successfully!");
};
