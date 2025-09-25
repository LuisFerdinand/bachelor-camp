import { eq } from "drizzle-orm";
import { db } from "..";
import { departments, teamMembers } from "../schema/marketing/teamMembers";

export const seedTeamMembers = async () => {
  console.log("🌱 Seeding members...");

  await db.delete(departments);

  // --- Insert Departments ---
  await db
    .insert(departments)
    .values([
      {
        name: "Leadership",
        description:
          "The leadership team is responsible for overseeing program strategy, management, and ensuring BachelorCamp runs smoothly.",
        order: 1,
        isActive: "true",
      },
      {
        name: "Academic",
        description:
          "The academic team focuses on delivering high-quality learning experiences, mentoring, and curriculum development for BachelorCamp participants.",
        order: 2,
        isActive: "true",
      },
      // {
      //   name: "Marketing",
      //   description:
      //     "The marketing team handles outreach, branding, and communication to attract students and partners to BachelorCamp.",
      //   order: 0,
      //   isActive: "false",
      // },
      // {
      //   name: "Student Affairs",
      //   description:
      //     "The student affairs team supports participants’ well-being, organizes events, and ensures a positive campus experience.",
      //   order: 0,
      //   isActive: "false",
      // },
      // {
      //   name: "Technology",
      //   description:
      //     "The technology team builds and maintains the digital platforms and tools that support BachelorCamp operations.",
      //   order: 0,
      //   isActive: "false",
      // },
    ])
    .onConflictDoNothing();

  // --- Fetch Department IDs ---
  const getDeptId = async (name: string) => {
    const dept = await db
      .select()
      .from(departments)
      .where(eq(departments.name, name))
      .limit(1);
    if (!dept.length) throw new Error(`Department ${name} not found`);
    return dept[0].id;
  };

  const leadershipId = await getDeptId("Leadership");
  const academicId = await getDeptId("Academic");
  // const marketingId = await getDeptId("Marketing");
  // const studentAffairsId = await getDeptId("Student Affairs");
  // const technologyId = await getDeptId("Technology");

  await db.delete(teamMembers);

  // --- Insert Team Members ---
  await db
    .insert(teamMembers)
    .values([
      // Leadership
      {
        name: "Dr. Sarah Johnson",
        title: "Director of Program",
        departmentId: leadershipId,
        bio: "Oversees overall program strategy and leadership initiatives at BachelorCamp.",
        isActive: "true",
        order: 1,
        socialLinks: [
          { type: "email", url: "sarah.johnson@bachelorcamp.id" },
          { type: "linkedin", url: "https://linkedin.com/in/sarahjohnson" },
        ],
      },
      {
        name: "Michael Tan",
        title: "Head of Operations",
        departmentId: leadershipId,
        bio: "Handles day-to-day operations, resource allocation, and team coordination.",
        isActive: "true",
        order: 2,
        socialLinks: [
          { type: "email", url: "michael.tan@bachelorcamp.id" },
          { type: "whatsapp", url: "+628123456789" },
        ],
      },
      {
        name: "Dr. Priya Sharma",
        title: "Deputy Director",
        departmentId: leadershipId,
        bio: "Supports program leadership and ensures smooth execution of academic and extracurricular activities.",
        isActive: "true",
        order: 3,
        socialLinks: [
          { type: "email", url: "priya.sharma@bachelorcamp.id" },
          { type: "linkedin", url: "https://linkedin.com/in/priyasharma" },
        ],
      },

      // Academic
      {
        name: "Prof. Anita Dewi",
        title: "Instructor – Grammar & Writing",
        departmentId: academicId,
        bio: "Expert in academic writing and grammar, helping students achieve high standards in English proficiency.",
        isActive: "true",
        order: 1,
        socialLinks: [
          { type: "email", url: "anita.dewi@bachelorcamp.id" },
          { type: "linkedin", url: "https://linkedin.com/in/anitadewi" },
        ],
      },
      {
        name: "James Wong",
        title: "Instructor – Speaking & Presentation",
        departmentId: academicId,
        bio: "Coaches students in public speaking, effective communication, and presentation skills.",
        isActive: "true",
        order: 2,
        socialLinks: [
          { type: "email", url: "james.wong@bachelorcamp.id" },
          { type: "instagram", url: "https://instagram.com/jameswong" },
        ],
      },
      {
        name: "Emily Carter",
        title: "Curriculum Designer",
        departmentId: academicId,
        bio: "Designs innovative curricula and learning materials to enhance the BachelorCamp experience.",
        isActive: "true",
        order: 3,
        socialLinks: [
          { type: "email", url: "emily.carter@bachelorcamp.id" },
          { type: "linkedin", url: "https://linkedin.com/in/emilycarter" },
        ],
      },
    ])
    .onConflictDoNothing();

  console.log("✅ Members seeded successfully!");
};
