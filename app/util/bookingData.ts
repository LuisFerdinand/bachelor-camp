import type { Building } from "./buildingData";

// Course interface based on your provided course list
export interface Course {
  id: number;
  slug: string;
  name: string;
  category: "IELTS" | "TOEFL" | "TOEIC" | "PRONUNCIATION";
  level: "INTRO" | "NEXT STEP" | "ADVANCED" | "DRILL CLASS" | "MOCK TEST";
  duration: string;
  totalMeetings: number;
  description: string;
  goals: string[];
  syllabus: string[];
  learningMethod: string[];
  facilities: string[];
  investment: number;
  targetAudience: string[];
  suitableBuildings: number[]; // IDs of buildings that are suitable for this course
  availableStartMonths: {
    month: string; // e.g., "January", "February"
    year: number;
    available: boolean;
  }[];
}

export enum BookingType {
  ACCOMMODATION_ONLY = "accommodation_only",
  PROGRAM_ONLY = "program_only",
  PROGRAM_WITH_ACCOMMODATION = "program_with_accommodation",
}

// Combined booking item that includes both building and course selection
export interface BookingItem {
  bookingType: BookingType;
  building?: Building; // Optional for program-only bookings
  course?: Course; // Optional for accommodation-only bookings
  pricingOption?: Building["pricing"][0]; // Optional for program-only bookings
  personCount?: number; // For accommodation bookings
  selectedStartMonth?: { month: string; year: number }; // For program bookings
  totalPrice: number;
  durationInMonths?: number; // Only relevant for accommodation bookings
}

// Calculate duration in months from course duration string
const calculateDurationInMonths = (duration: string): number => {
  if (duration.includes("Bulan")) {
    const months = Number.parseInt(duration.split(" ")[0]);
    return months;
  } else if (duration.includes("Minggu")) {
    const weeks = Number.parseInt(duration.split(" ")[0]);
    return weeks / 4; // Approximate: 4 weeks = 1 month
  }
  return 0; // Default case
};

// Course data based on your provided list
export const courses: Course[] = [
  // IELTS Courses
  {
    id: 1,
    slug: "ielts-intro",
    name: "IELTS INTRO",
    category: "IELTS",
    level: "INTRO",
    duration: "3 Bulan",
    totalMeetings: 60,
    description:
      "Dirancang khusus untuk pemula yang baru mengenal IELTS atau memiliki skor di bawah Band 4.5.",
    goals: [
      "Meningkatkan kemampuan bahasa Inggris dari level dasar ke intermediate",
      "Mencapai target skor IELTS Band 4.5",
      "Menguasai strategi dasar menjawab soal di keempat skill IELTS",
    ],
    syllabus: [
      "Listening: memahami percakapan sehari-hari, short talks, dan tips dasar note-taking",
      "Reading: mengenali jenis teks (narrative, descriptive, factual), skimming, scanning",
      "Writing: menulis paragraf sederhana, mengenal Task 1 grafik & Task 2 essay pendek",
      "Speaking: latihan perkenalan, menjawab pertanyaan umum, dan part 1 speaking IELTS",
      "Vocabulary dan grammar dasar untuk IELTS",
    ],
    learningMethod: [
      "Latihan intensif dengan tutor berpengalaman",
      "Simulasi mini-test tiap minggu",
      "Interaktif dengan speaking practice dan peer feedback",
    ],
    facilities: [
      "Modul belajar cetak/digital",
      "Progress report tiap bulan",
      "Sertifikat setelah selesai program",
    ],
    investment: 3000000,
    targetAudience: [
      "Siswa yang ingin memulai persiapan IELTS dari nol",
      "Peserta dengan target skor IELTS 3.0–4.5",
      "Mahasiswa / pelajar yang ingin menyiapkan studi luar negeri di masa depan",
    ],
    suitableBuildings: [1, 2, 3], // All buildings suitable
    availableStartMonths: [
      { month: "January", year: 2025, available: true },
      { month: "February", year: 2025, available: true },
      { month: "March", year: 2025, available: false },
      { month: "April", year: 2025, available: true },
      { month: "May", year: 2025, available: true },
      { month: "June", year: 2025, available: true },
    ],
  },
  {
    id: 2,
    slug: "ielts-next-step",
    name: "IELTS NEXT STEP",
    category: "IELTS",
    level: "NEXT STEP",
    duration: "3 Bulan",
    totalMeetings: 60,
    description:
      "Program lanjutan bagi peserta yang sudah memiliki dasar IELTS atau skor sekitar Band 4.5–5.0.",
    goals: [
      "Mencapai target skor IELTS Band 6.5",
      "Menguasai strategi lanjutan Listening, Reading, Writing, dan Speaking",
      "Mampu menulis essay argumentatif dengan struktur yang benar",
      "Meningkatkan kelancaran dan koherensi saat berbicara di Part 2 & 3 Speaking IELTS",
    ],
    syllabus: [
      "Listening: memahami long conversations, academic lectures, dan latihan mengambil informasi detail",
      "Reading: memahami teks akademik panjang, teknik inference & paraphrasing",
      "Writing: menulis Task 1 grafik kompleks, Task 2 essay argumentatif/opinion",
      "Speaking: latihan part 2 (long turn dengan cue card), part 3 (discussion & abstract questions)",
      "Vocabulary akademik, collocations, dan grammar untuk kalimat kompleks",
    ],
    learningMethod: [
      "Drill soal intensif dengan feedback tutor",
      "Simulasi mini-test setiap minggu",
      "Speaking practice dengan peer discussion & mock interview",
      "Latihan menulis dengan review personal dari tutor",
    ],
    facilities: [
      "Modul belajar cetak/digital",
      "Bank soal IELTS berstandar internasional",
      "Progress report bulanan",
      "Sertifikat kelulusan program",
    ],
    investment: 3000000,
    targetAudience: [
      "Peserta dengan kemampuan IELTS dasar (Band 4.5–5.0) yang ingin naik ke Band 6.5",
      "Mahasiswa atau profesional yang ingin memenuhi syarat universitas luar negeri",
      "Mereka yang serius mempersiapkan ujian IELTS dalam jangka 3 bulan",
    ],
    suitableBuildings: [1, 3], // Premium buildings recommended
    availableStartMonths: [
      { month: "February", year: 2025, available: true },
      { month: "March", year: 2025, available: true },
      { month: "April", year: 2025, available: false },
      { month: "May", year: 2025, available: true },
      { month: "June", year: 2025, available: true },
      { month: "July", year: 2025, available: true },
    ],
  },
  {
    id: 3,
    slug: "ielts-drill-class",
    name: "IELTS DRILL CLASS",
    category: "IELTS",
    level: "DRILL CLASS",
    duration: "2 Minggu",
    totalMeetings: 10,
    description:
      "Kelas singkat yang dirancang untuk melatih intensif kemampuan menghadapi soal IELTS.",
    goals: [
      "Membiasakan diri dengan format soal IELTS",
      "Melatih kecepatan dan ketepatan menjawab soal",
      "Mengidentifikasi kelemahan pribadi dalam empat skill IELTS",
    ],
    syllabus: [
      "Listening: latihan soal berbasis percakapan dan monolog akademik",
      "Reading: memahami teks panjang dengan teknik skimming & scanning cepat",
      "Writing: latihan Task 1 (grafik/diagram) & Task 2 (essay singkat) dengan limit waktu",
      "Speaking: simulasi interview IELTS (part 1–3)",
    ],
    learningMethod: [
      "Drill soal asli IELTS di setiap pertemuan",
      "Diskusi strategi pengerjaan dengan tutor",
      "Feedback langsung untuk Writing & Speaking",
    ],
    facilities: [
      "Modul latihan berisi kumpulan soal IELTS",
      "Akses ke mini mock test",
      "Review singkat progress di akhir program",
    ],
    investment: 1000000,
    targetAudience: [
      "Peserta yang sudah mengenal IELTS dan ingin latihan intensif",
      "Mahasiswa/profesional dengan waktu terbatas",
      "Mereka yang ingin tes prediksi atau uji kemampuan sebelum ujian resmi",
    ],
    suitableBuildings: [1, 2, 3], // All buildings suitable
    availableStartMonths: [
      { month: "January", year: 2025, available: true },
      { month: "February", year: 2025, available: true },
      { month: "March", year: 2025, available: true },
      { month: "April", year: 2025, available: true },
      { month: "May", year: 2025, available: false },
      { month: "June", year: 2025, available: true },
    ],
  },
  {
    id: 4,
    slug: "ielts-mock-test",
    name: "IELTS MOCK TEST",
    category: "IELTS",
    level: "MOCK TEST",
    duration: "4 Subtest + 1 Review",
    totalMeetings: 5,
    description: "Simulasi resmi IELTS yang dirancang menyerupai ujian asli.",
    goals: [
      "Mengetahui prediksi skor IELTS realistik",
      "Mengukur kemampuan di setiap skill (Listening, Reading, Writing, Speaking)",
      "Mendapatkan analisis kelemahan dan saran perbaikan",
    ],
    syllabus: [
      "Listening Test: full listening section dengan audio standar IELTS",
      "Reading Test: latihan reading passages dengan soal lengkap",
      "Writing Test: Task 1 (grafik/diagram) & Task 2 (essay)",
      "Speaking Test: wawancara one-on-one dengan tutor sesuai format IELTS",
      "Review Session: pembahasan hasil, feedback detail, strategi perbaikan",
    ],
    learningMethod: [
      "Simulasi ujian sesuai standar internasional",
      "Penilaian skor sesuai rubrik IELTS",
      "Sesi review dengan tutor untuk setiap skill",
    ],
    facilities: [
      "Laporan hasil tes lengkap (score report)",
      "Feedback personal untuk Writing & Speaking",
      "Saran strategi belajar lanjutan",
    ],
    investment: 500000,
    targetAudience: [
      "Peserta yang ingin mengetahui level IELTS terkini sebelum tes resmi",
      "Mereka yang butuh evaluasi komprehensif",
      "Calon test-taker yang ingin mengukur kesiapan akhir",
    ],
    suitableBuildings: [1, 2, 3], // All buildings suitable
    availableStartMonths: [
      { month: "January", year: 2025, available: true },
      { month: "February", year: 2025, available: true },
      { month: "March", year: 2025, available: true },
      { month: "April", year: 2025, available: true },
      { month: "May", year: 2025, available: true },
      { month: "June", year: 2025, available: true },
    ],
  },
  // TOEFL Courses
  {
    id: 5,
    slug: "toefl-intro",
    name: "TOEFL INTRO",
    category: "TOEFL",
    level: "INTRO",
    duration: "2 Minggu",
    totalMeetings: 10,
    description:
      "Program pengantar bagi peserta yang baru pertama kali mengenal TOEFL.",
    goals: [
      "Mengenal format TOEFL (Listening, Structure, Reading)",
      "Menguasai strategi dasar untuk menjawab soal",
      "Mencapai target skor awal 400–450",
      "Menjadi fondasi untuk melanjutkan ke TOEFL Advanced",
    ],
    syllabus: [
      "Listening: percakapan pendek, dialog sehari-hari, dan short talks",
      "Structure: grammar dasar (tenses, subject-verb agreement, simple clauses)",
      "Reading: memahami teks pendek dengan strategi skimming & scanning",
      "Kosakata dasar TOEFL",
    ],
    learningMethod: [
      "Latihan soal dasar setiap pertemuan",
      "Penjelasan format tes dengan contoh",
      "Simulasi mini-test di akhir program",
    ],
    facilities: [
      "Modul pengantar TOEFL",
      "Bank soal latihan level dasar",
      "Feedback tutor di setiap sesi",
      "Sertifikat penyelesaian program",
    ],
    investment: 750000,
    targetAudience: [
      "Peserta pemula yang belum mengenal TOEFL",
      "Mahasiswa yang ingin persiapan TOEFL dari nol",
      "Siswa yang butuh fondasi sebelum lanjut ke TOEFL Advanced",
    ],
    suitableBuildings: [1, 2, 3], // All buildings suitable
    availableStartMonths: [
      { month: "January", year: 2025, available: true },
      { month: "February", year: 2025, available: true },
      { month: "March", year: 2025, available: true },
      { month: "April", year: 2025, available: true },
      { month: "May", year: 2025, available: true },
      { month: "June", year: 2025, available: true },
    ],
  },
  {
    id: 6,
    slug: "toefl-advanced",
    name: "TOEFL ADVANCED",
    category: "TOEFL",
    level: "ADVANCED",
    duration: "1 Bulan",
    totalMeetings: 20,
    description:
      "Ditujukan bagi peserta yang sudah memiliki pemahaman dasar TOEFL dan ingin mencapai skor tinggi.",
    goals: [
      "Mencapai skor 500–550",
      "Menguasai teknik answering cepat & tepat",
      "Memahami teks akademik panjang",
      "Menguasai grammar kompleks yang sering keluar di TOEFL",
    ],
    syllabus: [
      "Listening: long conversations, academic lectures, short talks",
      "Structure: advanced grammar (complex sentences, parallel structure, reduced clauses)",
      "Reading: teks panjang dengan inference, detail questions, vocabulary in context",
      "Simulasi TOEFL lengkap",
    ],
    learningMethod: [
      "Drill soal intensif per skill",
      "Simulasi TOEFL penuh (practice test)",
      "Pembahasan detail setiap kesalahan",
      "Latihan reading akademik dengan strategi time management",
    ],
    facilities: [
      "Modul TOEFL Advanced",
      "Bank soal intensif TOEFL",
      "Progress report mingguan",
      "Sertifikat kelulusan program",
    ],
    investment: 1500000,
    targetAudience: [
      "Peserta yang sudah mengenal TOEFL dasar (Intro)",
      "Mahasiswa yang membutuhkan skor TOEFL 500+ untuk syarat kelulusan atau beasiswa",
      "Profesional yang ingin sertifikasi TOEFL untuk karier",
    ],
    suitableBuildings: [1, 3], // Premium buildings recommended
    availableStartMonths: [
      { month: "January", year: 2025, available: true },
      { month: "February", year: 2025, available: true },
      { month: "March", year: 2025, available: true },
      { month: "April", year: 2025, available: true },
      { month: "May", year: 2025, available: true },
      { month: "June", year: 2025, available: true },
    ],
  },
  // TOEIC Courses
  {
    id: 7,
    slug: "toeic-listening-reading",
    name: "TOEIC LISTENING & READING",
    category: "TOEIC",
    level: "ADVANCED",
    duration: "1 Bulan",
    totalMeetings: 20,
    description:
      "Dirancang untuk meningkatkan kemampuan bahasa Inggris pasif yang dibutuhkan di dunia kerja internasional.",
    goals: [
      "Mencapai skor TOEIC Listening & Reading 500–700",
      "Memahami percakapan dan instruksi workplace dengan cepat",
      "Meningkatkan kecepatan membaca teks bisnis & akademik",
      "Menguasai strategi answering TOEIC dengan efektif",
    ],
    syllabus: [
      "Listening: percakapan workplace, short talks, telephone conversations, announcements",
      "Reading: skimming & scanning teks, grammar TOEIC, memahami email & memo",
      "Test Strategies: teknik menjawab cepat, time management, mengenali jebakan soal",
    ],
    learningMethod: [
      "Latihan intensif soal TOEIC resmi",
      "Simulasi mini-test setiap minggu",
      "Review dan pembahasan soal dengan tutor",
    ],
    facilities: [
      "Modul TOEIC lengkap (listening & reading)",
      "Bank soal TOEIC terbaru",
      "Progress report mingguan",
      "Sertifikat kelulusan program",
    ],
    investment: 1500000,
    targetAudience: [
      "Mahasiswa yang ingin mempersiapkan tes TOEIC untuk syarat kelulusan",
      "Profesional yang butuh sertifikasi TOEIC untuk karier atau perusahaan",
      "Peserta yang ingin melatih listening & reading comprehension untuk dunia kerja",
    ],
    suitableBuildings: [1, 3], // Premium buildings recommended
    availableStartMonths: [
      { month: "January", year: 2025, available: true },
      { month: "February", year: 2025, available: true },
      { month: "March", year: 2025, available: true },
      { month: "April", year: 2025, available: true },
      { month: "May", year: 2025, available: true },
      { month: "June", year: 2025, available: true },
    ],
  },
  {
    id: 8,
    slug: "toeic-speaking-writing",
    name: "TOEIC SPEAKING & WRITING",
    category: "TOEIC",
    level: "ADVANCED",
    duration: "1 Bulan",
    totalMeetings: 20,
    description:
      "Membantu peserta meningkatkan kemampuan komunikasi aktif dalam konteks profesional.",
    goals: [
      "Mencapai skor TOEIC Speaking & Writing 120–160",
      "Menulis email, laporan, dan respon bisnis sederhana",
      "Menyampaikan pendapat secara lisan dengan percaya diri",
      "Menggunakan grammar & kosakata workplace dengan akurat",
    ],
    syllabus: [
      "Speaking: pronunciation & intonation, describing pictures, giving short opinions, role-play situasi kantor, presentasi singkat",
      "Writing: menulis email bisnis, laporan singkat, memberikan saran/pendapat tertulis",
      "Test Strategies: tips menjawab soal dengan waktu terbatas, memperbaiki coherence & accuracy",
    ],
    learningMethod: [
      "Simulasi speaking test dengan tutor",
      "Writing practice dengan koreksi langsung",
      "Drill soal TOEIC Speaking & Writing terbaru",
    ],
    facilities: [
      "Modul TOEIC Speaking & Writing",
      "Feedback personal dari tutor untuk speaking & writing",
      "Sertifikat setelah program selesai",
    ],
    investment: 1500000,
    targetAudience: [
      "Mahasiswa & profesional yang ingin meningkatkan komunikasi workplace",
      "Peserta yang butuh sertifikat TOEIC lengkap (L&R + S&W)",
      "Mereka yang ingin percaya diri berbicara & menulis dalam konteks bisnis internasional",
    ],
    suitableBuildings: [1, 3], // Premium buildings recommended
    availableStartMonths: [
      { month: "January", year: 2025, available: true },
      { month: "February", year: 2025, available: true },
      { month: "March", year: 2025, available: true },
      { month: "April", year: 2025, available: true },
      { month: "May", year: 2025, available: true },
      { month: "June", year: 2025, available: true },
    ],
  },
  // Pronunciation Courses
  {
    id: 9,
    slug: "pronunciation-intro",
    name: "PRONUNCIATION INTRO",
    category: "PRONUNCIATION",
    level: "INTRO",
    duration: "1 Bulan",
    totalMeetings: 20,
    description:
      "Program dasar yang membantu peserta menguasai bunyi huruf, kata, dan intonasi sederhana dalam bahasa Inggris.",
    goals: [
      "Menguasai bunyi dasar alfabet dan kata dalam bahasa Inggris",
      "Mengurangi kesalahan pengucapan umum",
      "Memperoleh kepercayaan diri saat berbicara sederhana",
    ],
    syllabus: [
      "Alphabet sounds dan phonetic symbols dasar",
      "Word stress (penekanan kata) sederhana",
      "Intonasi dasar dalam kalimat pendek",
      "Latihan membaca kata & kalimat pendek dengan benar",
    ],
    learningMethod: [
      "Drill pronunciation dengan tutor",
      "Listening & repeating exercise",
      "Pair practice dengan feedback",
    ],
    facilities: [
      "Modul pronunciation dasar",
      "Audio latihan",
      "Feedback langsung dari tutor",
    ],
    investment: 150000,
    targetAudience: [
      "Pemula yang baru mulai belajar speaking",
      "Peserta yang ingin memperbaiki pengucapan dasar",
      "Siswa yang ingin lancar dalam percakapan sederhana",
    ],
    suitableBuildings: [1, 2, 3], // All buildings suitable
    availableStartMonths: [
      { month: "January", year: 2025, available: true },
      { month: "February", year: 2025, available: true },
      { month: "March", year: 2025, available: true },
      { month: "April", year: 2025, available: true },
      { month: "May", year: 2025, available: true },
      { month: "June", year: 2025, available: true },
    ],
  },
  {
    id: 10,
    slug: "pronunciation-next-step",
    name: "PRONUNCIATION NEXT STEP",
    category: "PRONUNCIATION",
    level: "NEXT STEP",
    duration: "1 Bulan",
    totalMeetings: 20,
    description:
      "Program lanjutan untuk peserta yang sudah menguasai dasar dan ingin memperbaiki accent, intonasi, serta kelancaran berbicara.",
    goals: [
      "Memperbaiki intonasi kalimat panjang",
      "Menguasai sentence stress dan connected speech",
      "Mendekati natural speaker style dalam percakapan",
    ],
    syllabus: [
      "Sentence stress (penekanan dalam kalimat)",
      "Connected speech (penggabungan kata saat berbicara cepat)",
      "Rising & falling intonation dalam percakapan",
      "Latihan membaca dialog & short talks",
    ],
    learningMethod: [
      "Listening & shadowing practice",
      "Role-play conversation dengan tutor",
      "Recording & feedback",
    ],
    facilities: [
      "Modul pronunciation lanjutan",
      "Audio conversation practice",
      "Feedback personal setiap sesi",
    ],
    investment: 150000,
    targetAudience: [
      "Peserta yang sudah selesai Pronunciation Intro",
      "Siswa yang ingin berbicara lebih natural",
      "Mahasiswa/profesional yang sering menggunakan bahasa Inggris sehari-hari",
    ],
    suitableBuildings: [1, 2, 3], // All buildings suitable
    availableStartMonths: [
      { month: "January", year: 2025, available: true },
      { month: "February", year: 2025, available: true },
      { month: "March", year: 2025, available: true },
      { month: "April", year: 2025, available: true },
      { month: "May", year: 2025, available: true },
      { month: "June", year: 2025, available: true },
    ],
  },
  {
    id: 11,
    slug: "pronunciation-advanced",
    name: "PRONUNCIATION ADVANCED",
    category: "PRONUNCIATION",
    level: "ADVANCED",
    duration: "1 Bulan",
    totalMeetings: 20,
    description:
      "Level tertinggi untuk menguasai accent reduction, ritme berbicara, dan fluency ala native speaker.",
    goals: [
      "Mengurangi aksen daerah (accent reduction)",
      "Menguasai rhythm & intonation kompleks",
      "Mencapai kelancaran berbicara setara native-like fluency",
    ],
    syllabus: [
      "Advanced connected speech & linking",
      "Intonasi ekspresif untuk presentasi & public speaking",
      "Rhythmic patterns dalam percakapan panjang",
      "Latihan storytelling & speech delivery",
    ],
    learningMethod: [
      "Shadowing native speakers",
      "Practice debate & presentations",
      "Feedback intensif dari tutor",
    ],
    facilities: [
      "Modul pronunciation advanced",
      "Audio & video practice",
      "Sertifikat penyelesaian program",
    ],
    investment: 150000,
    targetAudience: [
      "Peserta yang sudah menyelesaikan Pronunciation Next Step",
      "Mahasiswa/profesional yang ingin speaking dengan aksen natural",
      "Calon public speaker, presenter, atau pengajar bahasa Inggris",
    ],
    suitableBuildings: [1, 3], // Premium buildings recommended
    availableStartMonths: [
      { month: "January", year: 2025, available: true },
      { month: "February", year: 2025, available: true },
      { month: "March", year: 2025, available: true },
      { month: "April", year: 2025, available: true },
      { month: "May", year: 2025, available: true },
      { month: "June", year: 2025, available: true },
    ],
  },
];

// Function to get all courses
export function getAllCourses(): Course[] {
  return courses;
}

// Function to get a single course by slug
export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

// Function to get courses by category
export function getCoursesByCategory(category: Course["category"]): Course[] {
  return courses.filter((course) => course.category === category);
}

// Function to get courses by level
export function getCoursesByLevel(level: Course["level"]): Course[] {
  return courses.filter((course) => course.level === level);
}

// Function to get suitable buildings for a course
export function getSuitableBuildings(courseId: number): Building[] {
  const course = courses.find((c) => c.id === courseId);
  if (!course) return [];

  // Import buildings from buildingData
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { getAllBuildings } = require("./buildingData");
  const allBuildings = getAllBuildings();

  return allBuildings.filter((building: { id: number }) =>
    course.suitableBuildings.includes(building.id)
  );
}

// Function to get suitable courses for a building
export function getSuitableCourses(buildingId: number): Course[] {
  return courses.filter((course) =>
    course.suitableBuildings.includes(buildingId)
  );
}

// Utility functions for the updated booking system
export function calculateAccommodationOnlyPrice(
  building: Building,
  pricingOption: Building["pricing"][0],
  personCount: number
): number {
  return pricingOption.numericPrice * personCount;
}

export function calculateProgramOnlyPrice(course: Course): number {
  return course.investment;
}

export function calculateProgramWithAccommodationPrice(
  building: Building,
  course: Course,
  pricingOption: Building["pricing"][0],
  personCount: number
): number {
  const durationInMonths = calculateDurationInMonths(course.duration);
  const accommodationCost =
    pricingOption.numericPrice * personCount * durationInMonths;
  return accommodationCost + course.investment;
}

export function createAccommodationOnlyBooking(
  building: Building,
  pricingOption: Building["pricing"][0],
  personCount: number
): BookingItem {
  return {
    bookingType: BookingType.ACCOMMODATION_ONLY,
    building,
    pricingOption,
    personCount,
    totalPrice: calculateAccommodationOnlyPrice(
      building,
      pricingOption,
      personCount
    ),
  };
}

export function createProgramOnlyBooking(
  course: Course,
  selectedStartMonth: { month: string; year: number }
): BookingItem {
  return {
    bookingType: BookingType.PROGRAM_ONLY,
    course,
    selectedStartMonth,
    totalPrice: calculateProgramOnlyPrice(course),
  };
}

export function createProgramWithAccommodationBooking(
  building: Building,
  course: Course,
  pricingOption: Building["pricing"][0],
  personCount: number,
  selectedStartMonth: { month: string; year: number }
): BookingItem {
  const durationInMonths = calculateDurationInMonths(course.duration);
  return {
    bookingType: BookingType.PROGRAM_WITH_ACCOMMODATION,
    building,
    course,
    pricingOption,
    personCount,
    selectedStartMonth,
    durationInMonths,
    totalPrice: calculateProgramWithAccommodationPrice(
      building,
      course,
      pricingOption,
      personCount
    ),
  };
}

// Function to get all available booking combinations
export function getAllBookingCombinations(): BookingItem[] {
  // const { getAllBuildings } = require("./buildingData");
  // const allBuildings = getAllBuildings();

  const combinations: BookingItem[] = [];

  courses.forEach((course) => {
    const suitableBuildings = getSuitableBuildings(course.id);

    suitableBuildings.forEach((building) => {
      building.pricing.forEach((pricingOption) => {
        combinations.push(
          createProgramWithAccommodationBooking(
            building,
            course,
            pricingOption,
            1,
            { month: "January", year: 2025 }
          )
        );
      });
    });

    // Add program-only bookings
    combinations.push(
      createProgramOnlyBooking(course, { month: "January", year: 2025 })
    );
    combinations.push(
      createProgramOnlyBooking(course, { month: "February", year: 2025 })
    );
    combinations.push(
      createProgramOnlyBooking(course, { month: "March", year: 2025 })
    );
    combinations.push(
      createProgramOnlyBooking(course, { month: "April", year: 2025 })
    );
    combinations.push(
      createProgramOnlyBooking(course, { month: "May", year: 2025 })
    );
    combinations.push(
      createProgramOnlyBooking(course, { month: "June", year: 2025 })
    );
  });

  return combinations;
}

// Function to filter booking combinations by building
export function getBookingCombinationsByBuilding(
  buildingId: number
): BookingItem[] {
  return getAllBookingCombinations().filter(
    (item) => item.building?.id === buildingId
  );
}

// Function to filter booking combinations by course
export function getBookingCombinationsByCourse(
  courseId: number
): BookingItem[] {
  return getAllBookingCombinations().filter(
    (item) => item.course?.id === courseId
  );
}

// Function to get booking combinations by category
export function getBookingCombinationsByCategory(
  category: Course["category"]
): BookingItem[] {
  return getAllBookingCombinations().filter(
    (item) => item.course?.category === category
  );
}

export type { Building };
