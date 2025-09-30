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
import { addDays, format, isWeekend, startOfDay } from "date-fns";
import { ICON_URL_FALLBACK } from "@/constants";
import { DayOfWeek } from "../schema/enums";

type CourseInsert = typeof courses.$inferInsert;
type CourseBatchInsert = typeof courseBatches.$inferInsert;
type BatchWeeklyScheduleInsert = typeof batchWeeklySchedule.$inferInsert;
type BatchSessionInsert = typeof batchSessions.$inferInsert;

async function generateBatchSessions(
  courseBatchId: string,
  startDate: Date,
  totalSessions: number,
  weeklySchedule: any[]
): Promise<BatchSessionInsert[]> {
  const dayMap: Record<string, number> = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  const sessions: BatchSessionInsert[] = [];
  let currentDate = startOfDay(startDate);
  let sessionsCreated = 0;

  // Safety limit to prevent infinite loops
  const maxIterations = totalSessions * 10;
  let iterations = 0;

  while (sessionsCreated < totalSessions && iterations < maxIterations) {
    iterations++;

    const dayOfWeek = Object.keys(dayMap).find(
      (day) => dayMap[day] === currentDate.getDay()
    );

    if (dayOfWeek) {
      const scheduleForDay = weeklySchedule.find(
        (s) => s.dayOfWeek === dayOfWeek && s.isClosed === "false"
      );

      if (scheduleForDay) {
        const [startHour, startMinute] = scheduleForDay.startTime
          .split(":")
          .map(Number);
        const [endHour, endMinute] = scheduleForDay.endTime
          .split(":")
          .map(Number);

        const sessionStartDateTime = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          startHour,
          startMinute
        );

        const sessionEndDateTime = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          endHour,
          endMinute
        );

        sessions.push({
          courseBatchId,
          date: format(currentDate, "yyyy-MM-dd"),
          startDateTime: sessionStartDateTime,
          endDateTime: sessionEndDateTime,
          status: "scheduled" as const,
        });

        sessionsCreated++;
      }
    }

    currentDate = addDays(currentDate, 1);
  }

  if (sessionsCreated < totalSessions) {
    console.warn(
      `⚠️  Warning: Only generated ${sessionsCreated}/${totalSessions} sessions. Check schedule configuration.`
    );
  }

  return sessions;
}

export const seedCourses = async () => {
  console.log("🌱 Seeding courses...");

  // Optional: Clear existing data
  await db.delete(batchSessions);
  await db.delete(batchWeeklySchedule);
  await db.delete(courseBatches);
  await db.delete(buildingCourses);
  await db.delete(courses);

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

  const buildingList = await db
    .select()
    .from(buildings)
    .orderBy(asc(buildings.order));

  if (buildingList.length === 0) {
    console.log("⚠️  No buildings found. Please seed buildings first.");
    return;
  }

  const insertedCourses = await db
    .insert(courses)
    .values(courseData)
    .returning();

  console.log(`📚 Inserted ${insertedCourses.length} courses`);

  for (const course of insertedCourses) {
    // Randomly decide how many buildings this course will be linked to (1 to all buildings)
    const numberOfBuildings =
      Math.floor(Math.random() * buildingList.length) + 1;

    // Shuffle the buildings array and take the first `numberOfBuildings` items
    const shuffledBuildings = [...buildingList].sort(() => 0.5 - Math.random());
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

  const schedulePatterns = [
    {
      name: "Weekday Intensive",
      pattern: [
        { day: "monday" as DayOfWeek, start: "10:00", end: "12:00" },
        { day: "tuesday" as DayOfWeek, start: "10:00", end: "12:00" },
        { day: "wednesday" as DayOfWeek, start: "10:00", end: "12:00" },
        { day: "thursday" as DayOfWeek, start: "10:00", end: "12:00" },
        { day: "friday" as DayOfWeek, start: "10:00", end: "12:00" },
      ],
    },
    {
      name: "Evening Classes",
      pattern: [
        { day: "monday" as DayOfWeek, start: "18:00", end: "20:00" },
        { day: "tuesday" as DayOfWeek, start: "18:00", end: "20:00" },
        { day: "wednesday" as DayOfWeek, start: "18:00", end: "20:00" },
        { day: "thursday" as DayOfWeek, start: "18:00", end: "20:00" },
        { day: "friday" as DayOfWeek, start: "18:00", end: "20:00" },
      ],
    },
    {
      name: "Week Intensive",
      pattern: [
        { day: "monday" as DayOfWeek, start: "09:00", end: "10:00" },
        { day: "tuesday" as DayOfWeek, start: "09:00", end: "10:00" },
        { day: "wednesday" as DayOfWeek, start: "09:00", end: "10:00" },
        { day: "thursday" as DayOfWeek, start: "09:00", end: "10:00" },
        { day: "friday" as DayOfWeek, start: "09:00", end: "10:00" },
        { day: "saturday" as DayOfWeek, start: "09:00", end: "15:00" },
      ],
    },
  ];
  for (let i = 0; i < insertedCourses.length; i++) {
    const course = insertedCourses[i];
    const schedulePattern = schedulePatterns[i % schedulePatterns.length];

    // Create multiple batches per course with different start dates
    const numberOfBatches = Math.floor(Math.random() * 3) + 1; // 1-3 batches

    for (let batchIndex = 0; batchIndex < numberOfBatches; batchIndex++) {
      // Stagger start dates
      const baseStartDate = new Date("2025-10-01");
      const startDate = addDays(baseStartDate, batchIndex * 30); // Start batches 30 days apart

      const [insertedBatch] = await db
        .insert(courseBatches)
        .values({
          courseId: course.id,
          number: batchIndex + 1,
          startDate: format(startDate, "yyyy-MM-dd"),
          capacity: Math.floor(Math.random() * 20) + 15, // 15-35 capacity
          price: course.price + batchIndex * 200000, // Slight price variation
        })
        .returning();

      // Create weekly schedule with all 7 days
      const allDays: DayOfWeek[] = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ];
      const weeklyScheduleData: BatchWeeklyScheduleInsert[] = allDays.map(
        (day) => {
          const scheduledDay = schedulePattern.pattern.find(
            (p) => p.day === day
          );

          if (scheduledDay) {
            return {
              courseBatchId: insertedBatch.id,
              dayOfWeek: day,
              startTime: scheduledDay.start,
              endTime: scheduledDay.end,
              isClosed: "false",
            };
          } else {
            return {
              courseBatchId: insertedBatch.id,
              dayOfWeek: day,
              startTime: "00:00",
              endTime: "00:00",
              isClosed: "true",
            };
          }
        }
      );

      const insertedWeeklySchedule = await db
        .insert(batchWeeklySchedule)
        .values(weeklyScheduleData)
        .returning();

      // Generate sessions based on weekly schedule
      const sessions = await generateBatchSessions(
        insertedBatch.id,
        startDate,
        course.totalSessions,
        insertedWeeklySchedule
      );

      await db.insert(batchSessions).values(sessions);

      // Update batch end date based on last session
      if (sessions.length > 0) {
        const lastSessionDate = sessions[sessions.length - 1].date;
        await db
          .update(courseBatches)
          .set({
            endDate:
              typeof lastSessionDate === "string"
                ? lastSessionDate
                : format(lastSessionDate, "yyyy-MM-dd"),
          })
          .where(eq(courseBatches.id, insertedBatch.id));
      }

      console.log(
        `✅ Created batch ${batchIndex + 1} for ${course.title}: ${sessions.length} sessions (${schedulePattern.name})`
      );
    }
  }

  console.log("🎉 Course seeding completed successfully!");
};
