import { db } from "..";
import { postCategories } from "../schema";
import { v4 as uuidv4 } from "uuid";

export const seedPostCategories = async () => {
  console.log("🌱 Seeding post categories...");

  // Optional: clear existing data
  await db.delete(postCategories);

  type CategoryInsert = typeof postCategories.$inferInsert;

  const data: CategoryInsert[] = [
    {
      id: uuidv4(),
      name: "Study Tips",
      description:
        "Guides, hacks, and resources to help you excel in your studies.",
      slug: "study-tips",
      iconUrl:
        "https://www.flaticon.com/free-icon/book_3145765?term=book+open&page=1&position=4&origin=search&related_id=3145765",
    },
    {
      id: uuidv4(),
      name: "Career Prep",
      description:
        "Articles and advice to prepare you for your future career path.",
      slug: "career-prep",
      iconUrl:
        "https://cdn.jsdelivr.net/npm/@phosphor-icons/core/assets/briefcase.svg",
    },
    {
      id: uuidv4(),
      name: "Scholarships",
      description:
        "Latest updates and guidance on scholarships and funding options.",
      slug: "scholarships",
      iconUrl:
        "https://cdn.jsdelivr.net/npm/@phosphor-icons/core/assets/currency-circle-dollar.svg",
    },
    {
      id: uuidv4(),
      name: "Campus Life",
      description:
        "Explore student experiences, lifestyle, and community stories.",
      slug: "campus-life",
      iconUrl:
        "https://cdn.jsdelivr.net/npm/@phosphor-icons/core/assets/buildings.svg",
    },
    {
      id: uuidv4(),
      name: "Events",
      description: "Upcoming bachelor camps, workshops, and community meetups.",
      slug: "events",
      iconUrl:
        "https://cdn.jsdelivr.net/npm/@phosphor-icons/core/assets/calendar.svg",
    },
    {
      id: uuidv4(),
      name: "Global Programs",
      description: "Information about study abroad and exchange opportunities.",
      slug: "global-programs",
      iconUrl:
        "https://cdn.jsdelivr.net/npm/@phosphor-icons/core/assets/airplane.svg",
    },
    {
      id: uuidv4(),
      name: "Wellness",
      description:
        "Tips on maintaining mental health, physical fitness, and balance during studies.",
      slug: "wellness",
      iconUrl:
        "https://cdn.jsdelivr.net/npm/@phosphor-icons/core/assets/heartbeat.svg",
    },
    {
      id: uuidv4(),
      name: "Technology",
      description:
        "Latest tools, apps, and tech trends that can boost your learning and career.",
      slug: "technology",
      iconUrl:
        "https://cdn.jsdelivr.net/npm/@phosphor-icons/core/assets/device-mobile.svg",
    },
    {
      id: uuidv4(),
      name: "Finance",
      description:
        "Money management, budgeting, and financial planning for students.",
      slug: "finance",
      iconUrl:
        "https://cdn.jsdelivr.net/npm/@phosphor-icons/core/assets/wallet.svg",
    },
    {
      id: uuidv4(),
      name: "Alumni Stories",
      description:
        "Inspiring success stories and journeys from former students.",
      slug: "alumni-stories",
      iconUrl:
        "https://cdn.jsdelivr.net/npm/@phosphor-icons/core/assets/users-three.svg",
    },
    {
      id: uuidv4(),
      name: "Internships",
      description:
        "Guidance and opportunities to kickstart your professional journey.",
      slug: "internships",
      iconUrl:
        "https://cdn.jsdelivr.net/npm/@phosphor-icons/core/assets/student.svg",
    },
    {
      id: uuidv4(),
      name: "Leadership",
      description:
        "Develop leadership skills through camps, clubs, and student organizations.",
      slug: "leadership",
      iconUrl:
        "https://cdn.jsdelivr.net/npm/@phosphor-icons/core/assets/crown.svg",
    },
    {
      id: uuidv4(),
      name: "Volunteering",
      description:
        "Opportunities to give back to the community and build experiences.",
      slug: "volunteering",
      iconUrl:
        "https://cdn.jsdelivr.net/npm/@phosphor-icons/core/assets/hand-heart.svg",
    },
    {
      id: uuidv4(),
      name: "Competitions",
      description:
        "Hackathons, case studies, and contests you can participate in.",
      slug: "competitions",
      iconUrl:
        "https://cdn.jsdelivr.net/npm/@phosphor-icons/core/assets/trophy.svg",
    },
    {
      id: uuidv4(),
      name: "Research",
      description:
        "Student research projects, publications, and innovation highlights.",
      slug: "research",
      iconUrl:
        "https://cdn.jsdelivr.net/npm/@phosphor-icons/core/assets/flask.svg",
    },
    {
      id: uuidv4(),
      name: "Networking",
      description:
        "Tips and opportunities to connect with peers, mentors, and professionals.",
      slug: "networking",
      iconUrl:
        "https://cdn.jsdelivr.net/npm/@phosphor-icons/core/assets/linkedin-logo.svg",
    },
    {
      id: uuidv4(),
      name: "Study Abroad",
      description:
        "Insights, requirements, and stories about studying overseas.",
      slug: "study-abroad",
      iconUrl:
        "https://cdn.jsdelivr.net/npm/@phosphor-icons/core/assets/globe.svg",
    },
    {
      id: uuidv4(),
      name: "Clubs & Societies",
      description:
        "Explore extracurricular clubs, student societies, and how to join.",
      slug: "clubs-societies",
      iconUrl:
        "https://cdn.jsdelivr.net/npm/@phosphor-icons/core/assets/chat-circle-dots.svg",
    },
    {
      id: uuidv4(),
      name: "Housing",
      description:
        "Tips and resources for student housing, dorm life, and rentals.",
      slug: "housing",
      iconUrl:
        "https://cdn.jsdelivr.net/npm/@phosphor-icons/core/assets/house.svg",
    },
    {
      id: uuidv4(),
      name: "Food & Nutrition",
      description: "Affordable and healthy meal ideas for student life.",
      slug: "food-nutrition",
      iconUrl:
        "https://cdn.jsdelivr.net/npm/@phosphor-icons/core/assets/egg.svg",
    },
  ];

  // Insert categories
  await db.insert(postCategories).values(data);

  console.log("✅ Post categories seeded successfully!");
};
