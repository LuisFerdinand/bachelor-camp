// db/seeds/courses.seed.ts
import { db } from "..";
import { v4 as uuidv4 } from "uuid";
import {
  courses,
  courseBatches,
  batchWeeklySchedule,
  batchSessions,
  buildings,
  buildingCourses,
} from "../schema";
import { asc, eq, sql } from "drizzle-orm";
import { addDays, isBefore } from "date-fns";
import { ICON_URL_FALLBACK } from "@/constants";

export const seedCourses = async () => {
  console.log("🌱 Seeding courses...");

  // Optional: Clear existing data
  await db.delete(batchSessions);
  await db.delete(batchWeeklySchedule);
  await db.delete(courseBatches);
  await db.delete(courses);

  type CourseInsert = typeof courses.$inferInsert;
  type CourseScheduleInsert = typeof courseBatches.$inferInsert;
  type CourseDailyScheduleInsert = typeof batchWeeklySchedule.$inferInsert;
  type CourseMeetInsert = typeof batchSessions.$inferInsert;

  const courseData: CourseInsert[] = [
    {
      isActive: "true",
      slug: "ielts-intro",
      title: "IELTS Intro",
      category: "IELTS",
      level: "Intro",
      duration: "3 months",
      totalSessions: 60,
      description:
        "Designed specifically for beginners who are new to IELTS or have a score below Band 4.5.",
      learningGoals: [
        {
          text: "Improve English skills from basic to intermediate level",
          iconUrl: ICON_URL_FALLBACK,
        },
        {
          text: "Reach target IELTS Band score 4.5",
          iconUrl: ICON_URL_FALLBACK,
        },
        {
          text: "Master basic strategies for answering questions in all four IELTS skills",
          iconUrl: ICON_URL_FALLBACK,
        },
      ],
      syllabus: [
        {
          text: "Listening: understanding daily conversations, short talks, and basic note-taking tips",
          iconUrl: ICON_URL_FALLBACK,
        },
        {
          text: "Reading: recognizing text types (narrative, descriptive, factual), skimming, scanning",
          iconUrl: ICON_URL_FALLBACK,
        },
        {
          text: "Writing: writing simple paragraphs, introduction to Task 1 charts & Task 2 short essays",
          iconUrl: ICON_URL_FALLBACK,
        },
        {
          text: "Speaking: practice introductions, answering general questions, and IELTS Speaking Part 1",
          iconUrl: ICON_URL_FALLBACK,
        },
        {
          text: "Basic vocabulary and grammar for IELTS",
          iconUrl: ICON_URL_FALLBACK,
        },
      ],
      teachingMethods: [
        {
          text: "Intensive practice with experienced tutors",
          iconUrl: ICON_URL_FALLBACK,
        },
        { text: "Weekly mini-test simulations", iconUrl: ICON_URL_FALLBACK },
        {
          text: "Interactive speaking practice and peer feedback",
          iconUrl: ICON_URL_FALLBACK,
        },
      ],
      resources: [
        {
          text: "Printed/digital learning modules",
          iconUrl: ICON_URL_FALLBACK,
        },
        { text: "Monthly progress report", iconUrl: ICON_URL_FALLBACK },
        {
          text: "Certificate upon program completion",
          iconUrl: ICON_URL_FALLBACK,
        },
      ],
      targetAudience: [
        {
          text: "Students starting IELTS preparation from zero",
          iconUrl: ICON_URL_FALLBACK,
        },
        {
          text: "Participants targeting IELTS Band 3.0–4.5",
          iconUrl: ICON_URL_FALLBACK,
        },
        {
          text: "University students preparing for future overseas study",
          iconUrl: ICON_URL_FALLBACK,
        },
      ],
      price: 3000000,
      isFeatured: "false",
      order: 1,
    },
    {
      isActive: "true",
      slug: "ielts-next-step",
      title: "IELTS Next Step",
      category: "IELTS",
      level: "Next Step",
      duration: "3 months",
      totalSessions: 60,
      description:
        "An advanced program for participants who already have IELTS basics or a score around Band 4.5–5.0.",
      learningGoals: [
        { text: "Achieve IELTS Band 6.5" },
        {
          text: "Master advanced strategies for Listening, Reading, Writing, and Speaking",
        },
        { text: "Write argumentative essays with correct structure" },
        { text: "Improve fluency and coherence in IELTS Speaking Parts 2 & 3" },
      ],
      syllabus: [
        {
          text: "Listening: understanding long conversations, academic lectures, and practicing detailed information extraction",
        },
        {
          text: "Reading: comprehending long academic texts, inference & paraphrasing techniques",
        },
        {
          text: "Writing: writing complex Task 1 charts and Task 2 argumentative/opinion essays",
        },
        {
          text: "Speaking: practice for Part 2 (long turn with cue card) and Part 3 (discussion & abstract questions)",
        },
        {
          text: "Academic vocabulary, collocations, and grammar for complex sentences",
        },
      ],
      teachingMethods: [
        { text: "Intensive question drills with tutor feedback" },
        { text: "Weekly mini-test simulations" },
        { text: "Speaking practice with peer discussion & mock interviews" },
        { text: "Essay writing practice with personalized tutor review" },
      ],
      resources: [
        { text: "Printed/digital learning modules" },
        { text: "International standard IELTS question bank" },
        { text: "Monthly progress report" },
        { text: "Certificate upon program completion" },
      ],
      targetAudience: [
        {
          text: "Participants with IELTS basics (Band 4.5–5.0) aiming for Band 6.5",
        },
        {
          text: "University students or professionals meeting overseas study requirements",
        },
        { text: "Learners committed to preparing for IELTS within 3 months" },
      ],
      price: 3000000,
      isFeatured: "true",
      order: 2,
    },
    {
      isActive: "true",
      slug: "ielts-drill-class",
      title: "IELTS DRILL CLASS",
      category: "IELTS",
      level: "Drill Class",
      duration: "2 weeks", // keep varchar
      totalSessions: 10,
      description:
        "A short, intensive class designed to practice IELTS exam skills.",
      learningGoals: [
        { text: "Familiarize with the IELTS test format" },
        { text: "Train speed and accuracy in answering questions" },
        { text: "Identify personal weaknesses across all four IELTS skills" },
      ],
      syllabus: [
        {
          text: "Listening: practice with academic conversations and monologues",
        },
        { text: "Reading: long passages with skimming & fast scanning" },
        {
          text: "Writing: Task 1 (graph/diagram) & Task 2 (short essay) under time limits",
        },
        { text: "Speaking: full IELTS interview simulation (Parts 1–3)" },
      ],
      teachingMethods: [
        { text: "Real IELTS drills in every session" },
        { text: "Strategy discussions with tutor" },
        { text: "Immediate feedback for Writing & Speaking" },
      ],
      resources: [
        { text: "Practice module with IELTS question bank" },
        { text: "Access to mini mock test" },
        { text: "Quick progress review at the end of the program" },
      ],
      price: 1000000,
      targetAudience: [
        {
          text: "Participants already familiar with IELTS who want intensive practice",
        },
        { text: "Students/professionals with limited time" },
        { text: "Those who want a prediction test before the official exam" },
      ],
      isFeatured: "false",
      order: 3,
    },
    {
      isActive: "true",
      slug: "ielts-mock-test",
      title: "IELTS MOCK TEST",
      category: "IELTS",
      level: "Mock Test",
      duration: "1 week", // 4 subtests + 1 review
      totalSessions: 5,
      description:
        "An official-style IELTS simulation designed to mirror the real exam.",
      learningGoals: [
        { text: "Obtain a realistic IELTS score prediction" },
        {
          text: "Evaluate performance in all four skills (Listening, Reading, Writing, Speaking)",
        },
        { text: "Receive detailed feedback and improvement advice" },
      ],
      syllabus: [
        {
          text: "Listening Test: complete section with official-standard audio",
        },
        { text: "Reading Test: academic passages with full questions" },
        { text: "Writing Test: Task 1 (graph/diagram) & Task 2 (essay)" },
        { text: "Speaking Test: one-on-one interview following IELTS format" },
        {
          text: "Review Session: results discussion, detailed feedback, improvement strategies",
        },
      ],
      teachingMethods: [
        { text: "Simulation under international test standards" },
        { text: "Scoring according to IELTS rubric" },
        { text: "Review session with tutor for each skill" },
      ],
      resources: [
        { text: "Complete score report" },
        { text: "Personalized feedback for Writing & Speaking" },
        { text: "Recommended strategies for further preparation" },
      ],
      price: 500000,
      targetAudience: [
        { text: "Test-takers who want to know their current IELTS level" },
        { text: "Those needing a full evaluation before the official exam" },
        { text: "Candidates preparing for their final readiness check" },
      ],
      isFeatured: "true",
      order: 4,
    },

    {
      isActive: "true",
      slug: "toefl-intro",
      title: "TOEFL INTRO",
      category: "TOEFL",
      level: "Intro",
      duration: "2 weeks",
      totalSessions: 10,
      description:
        "An introductory program for participants who are new to TOEFL.",
      learningGoals: [
        { text: "Understand the TOEFL format (Listening, Structure, Reading)" },
        { text: "Master basic strategies for answering questions" },
        { text: "Achieve an initial target score of 400–450" },
        { text: "Build a foundation to continue to TOEFL Advanced" },
      ],
      syllabus: [
        {
          text: "Listening: short conversations, daily dialogues, and short talks",
        },
        {
          text: "Structure: basic grammar (tenses, subject-verb agreement, simple clauses)",
        },
        {
          text: "Reading: understanding short texts with skimming & scanning strategies",
        },
        { text: "Basic TOEFL vocabulary" },
      ],
      teachingMethods: [
        { text: "Basic practice questions in each session" },
        { text: "Explanation of test format with examples" },
        { text: "Mini-test simulation at the end of the program" },
      ],
      resources: [
        { text: "Introductory TOEFL module" },
        { text: "Basic-level practice question bank" },
        { text: "Tutor feedback in every session" },
        { text: "Certificate of completion" },
      ],
      targetAudience: [
        { text: "Beginners who are not yet familiar with TOEFL" },
        { text: "University students preparing for TOEFL from scratch" },
        {
          text: "Students needing a foundation before continuing to TOEFL Advanced",
        },
      ],
      price: 750000,
      isFeatured: "true",
      order: 5,
    },
    {
      order: 6,
      isActive: "true",
      slug: "toefl-advanced",
      title: "TOEFL ADVANCED",
      category: "TOEFL",
      level: "Advanced",
      duration: "1 month",
      totalSessions: 20,
      description:
        "Designed for participants who already have basic TOEFL knowledge and aim for higher scores.",
      learningGoals: [
        { text: "Achieve a score of 500–550" },
        { text: "Master fast & accurate answering techniques" },
        { text: "Understand longer academic texts" },
        { text: "Master complex grammar frequently appearing in TOEFL" },
      ],
      syllabus: [
        {
          text: "Listening: long conversations, academic lectures, short talks",
        },
        {
          text: "Structure: advanced grammar (complex sentences, parallel structure, reduced clauses)",
        },
        {
          text: "Reading: long texts with inference, detail questions, vocabulary in context",
        },
        { text: "Full TOEFL simulation" },
      ],
      teachingMethods: [
        { text: "Intensive drills per skill" },
        { text: "Full TOEFL practice test simulation" },
        { text: "Detailed discussion of each mistake" },
        { text: "Academic reading practice with time management strategies" },
      ],
      resources: [
        { text: "TOEFL Advanced module" },
        { text: "Intensive TOEFL question bank" },
        { text: "Weekly progress reports" },
        { text: "Certificate of program completion" },
      ],
      price: 1500000,
      targetAudience: [
        { text: "Participants who already know basic TOEFL (Intro)" },
        {
          text: "University students who need a TOEFL score of 500+ for graduation or scholarships",
        },
        {
          text: "Professionals needing TOEFL certification for career purposes",
        },
      ],
      isFeatured: "true",
    },
    // TOEIC Courses
    {
      order: 7,
      isActive: "true",
      slug: "toeic-listening-reading",
      title: "TOEIC LISTENING & READING",
      category: "TOEIC",
      level: "Advanced",
      duration: "1 month",
      totalSessions: 20,
      description:
        "Designed to improve passive English skills needed in the international workplace.",
      learningGoals: [
        { text: "Achieve a TOEIC Listening & Reading score of 500–700" },
        { text: "Quickly understand workplace conversations and instructions" },
        { text: "Increase reading speed for business & academic texts" },
        { text: "Master effective TOEIC answering strategies" },
      ],
      syllabus: [
        {
          text: "Listening: workplace conversations, short talks, telephone conversations, announcements",
        },
        {
          text: "Reading: skimming & scanning texts, TOEIC grammar, understanding emails & memos",
        },
        {
          text: "Test Strategies: quick answering techniques, time management, recognizing tricky questions",
        },
      ],
      teachingMethods: [
        { text: "Intensive practice with official TOEIC questions" },
        { text: "Weekly mini-test simulation" },
        { text: "Review and discussion with tutor" },
      ],
      resources: [
        { text: "Complete TOEIC module (listening & reading)" },
        { text: "Latest TOEIC question bank" },
        { text: "Weekly progress reports" },
        { text: "Certificate of program completion" },
      ],
      price: 1500000,
      targetAudience: [
        {
          text: "University students preparing for TOEIC as a graduation requirement",
        },
        {
          text: "Professionals needing TOEIC certification for career or company requirements",
        },
        {
          text: "Participants wanting to train listening & reading comprehension for the workplace",
        },
      ],
    },
    {
      order: 8,
      isActive: "true",
      slug: "toeic-speaking-writing",
      title: "TOEIC SPEAKING & WRITING",
      category: "TOEIC",
      level: "Advanced",
      duration: "1 month",
      totalSessions: 20,
      description:
        "Helps participants improve active communication skills in professional contexts.",
      learningGoals: [
        { text: "Achieve a TOEIC Speaking & Writing score of 120–160" },
        { text: "Write emails, reports, and simple business responses" },
        { text: "Express opinions orally with confidence" },
        { text: "Use workplace grammar & vocabulary accurately" },
      ],
      syllabus: [
        {
          text: "Speaking: pronunciation & intonation, describing pictures, giving short opinions, office role-plays, short presentations",
        },
        {
          text: "Writing: writing business emails, short reports, giving written suggestions/opinions",
        },
        {
          text: "Test Strategies: tips for answering within time limits, improving coherence & accuracy",
        },
      ],
      teachingMethods: [
        { text: "Speaking test simulations with tutor" },
        { text: "Writing practice with direct feedback" },
        { text: "Latest TOEIC Speaking & Writing drills" },
      ],
      resources: [
        { text: "TOEIC Speaking & Writing module" },
        { text: "Personalized feedback from tutor for speaking & writing" },
        { text: "Certificate after program completion" },
      ],
      price: 1500000,
      targetAudience: [
        {
          text: "Students & professionals who want to improve workplace communication",
        },
        {
          text: "Participants who need a complete TOEIC certificate (L&R + S&W)",
        },
        {
          text: "Those who want confidence in speaking & writing in international business contexts",
        },
      ],
    },
    // Pronunciation Courses
    {
      order: 9,
      isActive: "true",
      slug: "pronunciation-intro",
      title: "PRONUNCIATION INTRO",
      category: "Pronounciation",
      level: "Intro",
      duration: "1 month",
      totalSessions: 20,
      description:
        "A basic program to help participants master sounds of letters, words, and simple intonation in English.",
      learningGoals: [
        { text: "Master basic English alphabet and word sounds" },
        { text: "Reduce common pronunciation errors" },
        { text: "Gain confidence when speaking simple sentences" },
      ],
      syllabus: [
        { text: "Alphabet sounds and basic phonetic symbols" },
        { text: "Simple word stress" },
        { text: "Basic intonation in short sentences" },
        { text: "Practice reading words & short sentences correctly" },
      ],
      teachingMethods: [
        { text: "Pronunciation drills with tutor" },
        { text: "Listening & repeating exercises" },
        { text: "Pair practice with feedback" },
      ],
      resources: [
        { text: "Basic pronunciation module" },
        { text: "Practice audio files" },
        { text: "Direct feedback from tutor" },
      ],
      price: 150000,
      targetAudience: [
        { text: "Beginners just starting to learn speaking" },
        { text: "Participants wanting to fix basic pronunciation" },
        { text: "Students wanting fluency in simple conversations" },
      ],
    },
    {
      order: 10,
      isActive: "true",
      slug: "pronunciation-next-step",
      title: "PRONUNCIATION NEXT STEP",
      category: "Pronounciation",
      level: "Next Step",
      duration: "1 month",
      totalSessions: 20,
      description:
        "An intermediate program for those who already know the basics and want to improve accent, intonation, and speaking fluency.",
      learningGoals: [
        { text: "Improve intonation in longer sentences" },
        { text: "Master sentence stress and connected speech" },
        { text: "Approach natural speaker style in conversations" },
      ],
      syllabus: [
        { text: "Sentence stress (emphasis in sentences)" },
        { text: "Connected speech (word linking in fast speech)" },
        { text: "Rising & falling intonation in conversations" },
        { text: "Practice reading dialogues & short talks" },
      ],
      teachingMethods: [
        { text: "Listening & shadowing practice" },
        { text: "Role-play conversations with tutor" },
        { text: "Recording & feedback" },
      ],
      resources: [
        { text: "Intermediate pronunciation module" },
        { text: "Audio conversation practice" },
        { text: "Personal feedback in each session" },
      ],
      price: 150000,
      targetAudience: [
        { text: "Participants who completed Pronunciation Intro" },
        { text: "Students wanting to speak more naturally" },
        {
          text: "University students/professionals who often use English daily",
        },
      ],
    },
    {
      order: 11,
      isActive: "true",
      slug: "pronunciation-advanced",
      title: "PRONUNCIATION ADVANCED",
      category: "Pronounciation",
      level: "Advanced",
      duration: "1 month",
      totalSessions: 20,
      description:
        "The highest level program to master accent reduction, speech rhythm, and native-like fluency.",
      learningGoals: [
        { text: "Reduce regional accent (accent reduction)" },
        { text: "Master complex rhythm & intonation" },
        { text: "Achieve fluent speech with native-like style" },
      ],
      syllabus: [
        { text: "Advanced connected speech & word linking" },
        { text: "Expressive intonation for presentations & public speaking" },
        { text: "Rhythmic patterns in long conversations" },
        { text: "Practice storytelling & speech delivery" },
      ],
      teachingMethods: [
        { text: "Shadowing native speakers" },
        { text: "Debate & presentation practice" },
        { text: "Intensive tutor feedback" },
      ],
      resources: [
        { text: "Advanced pronunciation module" },
        { text: "Audio & video practice materials" },
        { text: "Certificate of completion" },
      ],
      price: 150000,
      targetAudience: [
        { text: "Participants who completed Pronunciation Next Step" },
        { text: "University students/professionals wanting a natural accent" },
        { text: "Aspiring public speakers, presenters, or English teachers" },
      ],
    },
  ];

  const building = await db
    .select()
    .from(buildings)
    .orderBy(asc(buildings.order));

  const insertedCourse = await db
    .insert(courses)
    .values(courseData)
    .returning();

  for (const course of insertedCourse) {
    // Randomly decide how many buildings this course will be linked to (1 to all buildings)
    const numberOfBuildings = Math.floor(Math.random() * building.length) + 1;

    // Shuffle the buildings array and take the first `numberOfBuildings` items
    const shuffledBuildings = building.sort(() => 0.5 - Math.random());
    const selectedBuildings = shuffledBuildings.slice(0, numberOfBuildings);

    // Create a link for each selected building
    for (const building of selectedBuildings) {
      await db.insert(buildingCourses).values({
        id: uuidv4(),
        buildingId: building.id,
        courseId: course.id,
      });
    }
  }

  const startDate = new Date("2025-10-01");

  const [insertedSchedule] = await db
    .insert(courseBatches)
    .values({
      courseId: insertedCourse[0].id,
      startDate: startDate.toISOString().split("T")[0],
      capacity: 20,
      price: insertedCourse[0].price ?? 0,
    })
    .returning();

  const dailyPatterns: CourseDailyScheduleInsert[] = [
    {
      courseBatchId: insertedSchedule.id,
      dayOfWeek: "monday",
      startTime: "10:00",
      endTime: "12:00",
    },
    {
      courseBatchId: insertedSchedule.id,
      dayOfWeek: "tuesday",
      startTime: "10:00",
      endTime: "12:00",
    },
    {
      courseBatchId: insertedSchedule.id,
      dayOfWeek: "thursday",
      startTime: "10:00",
      endTime: "12:00",
    },
    {
      courseBatchId: insertedSchedule.id,
      dayOfWeek: "wednesday",
      startTime: "10:00",
      endTime: "12:00",
    },
    {
      courseBatchId: insertedSchedule.id,
      dayOfWeek: "friday",
      startTime: "10:00",
      endTime: "12:00",
    },
    {
      courseBatchId: insertedSchedule.id,
      dayOfWeek: "saturday",
      isClosed: "true",
      startTime: "00:00",
      endTime: "00:00",
    },
    {
      courseBatchId: insertedSchedule.id,
      dayOfWeek: "sunday",
      isClosed: "true",
      startTime: "00:00",
      endTime: "00:00",
    },
  ];

  const insertedDaily = await db
    .insert(batchWeeklySchedule)
    .values(dailyPatterns)
    .returning();

  const dayMap: Record<string, number> = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  const meets: any[] = [];
  let current = startDate;

  while (meets.length < insertedCourse[0].totalSessions) {
    for (const daily of insertedDaily) {
      if (daily.isClosed === "true") continue;

      if (current.getDay() === dayMap[daily.dayOfWeek]) {
        const [sh, sm] = (daily.startTime as string).split(":").map(Number);
        const [eh, em] = (daily.endTime as string).split(":").map(Number);

        const startDateTime = new Date(
          current.getFullYear(),
          current.getMonth(),
          current.getDate(),
          sh,
          sm
        );
        const endDateTime = new Date(
          current.getFullYear(),
          current.getMonth(),
          current.getDate(),
          eh,
          em
        );

        meets.push({
          courseBatchId: insertedSchedule.id,
          date: current,
          startDateTime,
          endDateTime,
          status: "scheduled",
        });

        // Stop immediately if totalSessions reached
        if (meets.length === insertedCourse[0].totalSessions) break;
      }
    }

    current = addDays(current, 1);
  }

  await db.insert(batchSessions).values(meets);

  const lastSessionDate = meets[meets.length - 1].date;
  await db
    .update(courseBatches)
    .set({ endDate: lastSessionDate.toISOString().split("T")[0] })
    .where(eq(courseBatches.id, insertedSchedule.id));

  console.log(
    `✅ Seeded: ${insertedCourse[0].title} with ${meets.length} course sessions.`
  );
};
