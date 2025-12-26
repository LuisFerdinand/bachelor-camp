import { Role } from "@/db/schema/enums";
import {
  Award,
  AwardIcon,
  BadgeCheckIcon,
  BarChart3,
  BarChart3Icon,
  BedDouble,
  BedDoubleIcon,
  BookmarkIcon,
  BookOpen,
  BookOpenIcon,
  Boxes,
  BoxesIcon,
  Building2,
  Building2Icon,
  CalendarDays,
  CalendarRangeIcon,
  ClockIcon,
  DatabaseBackup,
  DoorOpenIcon,
  FileClock,
  FileText,
  FileTextIcon,
  Flag,
  FlagIcon,
  FlaskConical,
  FlaskConicalIcon,
  FolderIcon,
  FolderTree,
  FolderTreeIcon,
  GraduationCap,
  HelpCircle,
  HelpCircleIcon,
  ImageIcon,
  Landmark,
  LandmarkIcon,
  LayersIcon,
  LayoutDashboard,
  LayoutDashboardIcon,
  LayoutGridIcon,
  LibraryIcon,
  ListTreeIcon,
  Mail,
  MailIcon,
  MapPin,
  MapPinIcon,
  MegaphoneIcon,
  PenToolIcon,
  Quote,
  QuoteIcon,
  ReceiptIcon,
  Scale,
  ScaleIcon,
  SearchCheck,
  Share2,
  Share2Icon,
  ShieldCheckIcon,
  ShieldIcon,
  Sparkles,
  SparklesIcon,
  TagIcon,
  Tags,
  Tent,
  TentIcon,
  UserCogIcon,
  UserIcon,
  Users,
  UsersIcon,
  WrenchIcon,
} from "lucide-react";

export const DEFAULT_LIMIT = 10;
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export const MAX_IMAGES = 5;
export const PRODUCT_IMAGE_FALLBACK = "/images/ImagePlaceholder.png";
export const USER_IMAGE_FALLBACK = "/images/UserPlaceholder.jpg";

// Header/Logo fallbacks
export const LOGO_PRIMARY_FALLBACK = "/header/Logo1.png";
export const LOGO_SECONDARY_FALLBACK = "/header/Logo2.png";

// Hero section fallbacks
export const ABOUT_BANNER_FALLBACK = "/HeroBg/About/AboutBanner.png";
export const CAMP_DESKTOP_FALLBACK = "/HeroBg/Camp/CampBgDesktop.png";
export const CAMP_MOBILE_FALLBACK = "/HeroBg/Camp/CampBgMobile.png";
export const CONTACT_BANNER_FALLBACK = "/HeroBg/Contact/ContactBanner.png";
export const PROGRAM_BANNER_FALLBACK = "/HeroBg/Program/ProgBanner.png";
export const BLOG_IMAGE_FALLBACK = "/images/ImagePlaceholder.png";

// Activity fallbacks (you can pick one as default or use specific ones)
export const ACTIVITY_DEFAULT_FALLBACK = "/activity/Activity1.png";
export const ACTIVITY_FALLBACKS = {
  activity1: "/home/activity/Activity1.png",
  activity2: "/home/activity/Activity2.png",
  activity3: "/home/activity/Activity3.png",
  activity4: "/home/activity/Activity4.png",
  activity5: "/home/activity/Activity5.png",
  activity6: "/home/activity/Activity6.png",
} as const;

// Facilities fallbacks
export const FACILITIES_FALLBACKS = {
  culturalCenter: "/home/facilities/culCen.png",
  interFood: "/home/facilities/intFood.png",
  luxuryDorm: "/home/facilities/luxDorm.png",
  studyRoom: "/home/facilities/StudyRoom.png",
} as const;

// Student life fallbacks
export const STUDENT_LIFE_FALLBACKS = {
  mobile: "/home/student-life/student-life-mobile.png",
  desktop: "/home/student-life/student-life.png",
} as const;

// Home why choose us profile
export const ProfileBC = "/home/whyUs.png";

// Test fallbacks
export const TEST_IMAGE_FALLBACK = "/home/testi/testi.png";

export const ICON_URL_FALLBACK =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJhZGdlLWNoZWNrLWljb24gbHVjaWRlLWJhZGdlLWNoZWNrIj48cGF0aCBkPSJNMy44NSA4LjYyYTQgNCAwIDAgMSA0Ljc4LTQuNzcgNCA0IDAgMCAxIDYuNzQgMCA0IDQgMCAwIDEgNC43OCA0Ljc4IDQgNCAwIDAgMSAwIDYuNzQgNCA0IDAgMCAxLTQuNzcgNC43OCA0IDQgMCAwIDEtNi43NSAwIDQgNCAwIDAgMS00Ljc4LTQuNzcgNCA0IDAgMCAxIDAtNi43NloiLz48cGF0aCBkPSJtOSAxMiAyIDIgNC00Ii8+PC9zdmc+";

export const LINK_FALLBACK = "/";

export const bannerStyles = {
  badge: {
    base: "bg-accent-100 text-accent-800 hover:bg-accent-200",
  },
  buttons: {
    primary: {
      base: "bg-brand-500 text-white shadow-lg hover:bg-brand-600",
    },
    outline: {
      base: "border-2 border-accent-500 text-accent-600 hover:bg-accent-500 hover:text-white bg-white/10 backdrop-blur-sm shadow-lg",
    },
    gradient: {
      base: `relative overflow-hidden rounded-2xl border-2 border-indigo-500 
             bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
             px-6 py-3 font-semibold text-white shadow-lg 
             transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl`,
      inner: "relative z-10",
      hoverOverlay:
        "absolute inset-0 -z-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
    },
  },
} as const;

export const MAX_LEARNING_GOALS = 5;
export const MAX_SYLLABUS = 10;
export const MAX_TEACHING_METHODS = 5;
export const MAX_RESOURCES = 5;
export const MAX_TARGET_AUDIENCE = 5;

const FULL_ACCESS = ["super_admin", "admin"] as const;

export const contentRoutes = [
  {
    label: "Brand & Identity",
    icon: BadgeCheckIcon,
    items: [
      {
        label: "Accreditations",
        url: "/dashboard/content/accreditations",
        icon: AwardIcon,
        roles: [...FULL_ACCESS] as Role[],
      },
      {
        label: "Milestones",
        url: "/dashboard/content/milestones",
        icon: FlagIcon,
        roles: [...FULL_ACCESS] as Role[],
      },
      {
        label: "Pillars",
        url: "/dashboard/content/pillars",
        icon: LandmarkIcon,
        roles: [...FULL_ACCESS] as Role[],
      },
      {
        label: "Principles",
        url: "/dashboard/content/principles",
        icon: ScaleIcon,
        roles: [...FULL_ACCESS] as Role[],
      },
      {
        label: "Statistics",
        url: "/dashboard/content/statistics",
        icon: BarChart3Icon,
        roles: [...FULL_ACCESS] as Role[],
      },
      {
        label: "Team Members",
        url: "/dashboard/content/team-members",
        icon: UsersIcon,
        roles: [...FULL_ACCESS] as Role[],
      },
    ],
  },

  {
    label: "Media & Marketing",
    icon: MegaphoneIcon,
    items: [
      {
        label: "Banners",
        url: "/dashboard/content/banners",
        icon: ImageIcon,
        roles: [...FULL_ACCESS, "author"] as Role[],
      },
      {
        label: "Highlights",
        url: "/dashboard/content/highlights",
        icon: SparklesIcon,
        roles: [...FULL_ACCESS, "author", "teacher"] as Role[],
      },
      {
        label: "Locations",
        url: "/dashboard/content/locations",
        icon: MapPinIcon,
        roles: [...FULL_ACCESS] as Role[],
      },
      {
        label: "Social Medias",
        url: "/dashboard/content/social-medias",
        icon: Share2Icon,
        roles: [...FULL_ACCESS, "author"] as Role[],
      },
    ],
  },

  {
    label: "Trust & Support",
    icon: ShieldCheckIcon,
    items: [
      {
        label: "FAQs",
        url: "/dashboard/content/faqs",
        icon: HelpCircleIcon,
        roles: [...FULL_ACCESS, "author"] as Role[],
      },
      {
        label: "Testimonials",
        url: "/dashboard/content/testimonials",
        icon: QuoteIcon,
        roles: [...FULL_ACCESS, "author", "teacher"] as Role[],
      },
    ],
  },
];

export const servicesRoutes = [
  {
    label: "Accommodation",
    icon: BedDoubleIcon,
    items: [
      {
        label: "Buildings",
        icon: Building2Icon,
        url: "/dashboard/services/accommodation/buildings",
        roles: [...FULL_ACCESS, "room_master"] as Role[],
      },
      {
        label: "Room Types",
        icon: LayoutGridIcon,
        url: "/dashboard/services/accommodation/room-types",
        roles: [...FULL_ACCESS, "room_master"] as Role[],
      },
      {
        label: "Rooms",
        icon: DoorOpenIcon,
        url: "/dashboard/services/accommodation/rooms",
        roles: [...FULL_ACCESS, "room_master", "accommodation_staff"] as Role[],
      },
      {
        label: "Facilities",
        icon: WrenchIcon,
        url: "/dashboard/services/accommodation/facilities",
        roles: [...FULL_ACCESS, "room_master"] as Role[],
      },
    ],
  },

  {
    label: "Courses",
    icon: BookOpenIcon,
    items: [
      {
        label: "Courses",
        icon: LayersIcon,
        url: "/dashboard/services/courses",
        roles: [...FULL_ACCESS, "teacher"] as Role[],
      },
      {
        label: "Batches", // + WeeklySchedules
        icon: CalendarRangeIcon,
        url: "/dashboard/services/courses/batches",
        roles: [...FULL_ACCESS, "teacher"] as Role[],
      },
      {
        label: "Sessions",
        icon: ClockIcon,
        url: "/dashboard/services/courses/sessions",
        roles: [...FULL_ACCESS, "teacher"] as Role[],
      },
    ],
  },
  {
    // Coming Soon
    label: "Tests",
    url: "/dashboard/services/tests",
    icon: FlaskConicalIcon,
    roles: [...FULL_ACCESS, "teacher"] as Role[],
  },
  {
    // Coming Soon
    label: "Bundles",
    url: "/dashboard/services/bundles",
    icon: BoxesIcon,
    roles: [...FULL_ACCESS] as Role[],
  },
];

export const articlesRoutes = [
  {
    label: "Editorial",
    icon: PenToolIcon,
    items: [
      {
        label: "Posts",
        icon: FileTextIcon,
        url: "/dashboard/articles/posts",
        roles: ["super_admin", "admin", "author"] as Role[],
      },
    ],
  },

  {
    label: "Organization",
    icon: FolderTreeIcon,
    items: [
      {
        label: "Categories",
        icon: FolderIcon,
        url: "/dashboard/articles/categories",
        roles: ["super_admin", "admin", "author"] as Role[],
      },
      {
        label: "Tags",
        icon: TagIcon,
        url: "/dashboard/articles/tags",
        roles: ["super_admin", "admin", "author"] as Role[],
      },
    ],
  },

  {
    label: "Collections",
    icon: LayersIcon,
    items: [
      {
        label: "System Collections",
        icon: ShieldIcon,
        url: "/dashboard/articles/collections/system",
        roles: ["super_admin", "admin"] as Role[],
      },
    ],
  },
];

export const engagementRoutes = [
  {
    label: "Leads",
    url: "/dashboard/engagement/leads",
    icon: Mail,
    roles: [...FULL_ACCESS] as Role[],
  },
];

export const userRoutes = [
  {
    label: "User Management",
    url: "/dashboard/admin/users",
    icon: UserCogIcon,
    roles: ["super_admin"] as Role[],
  },
];

export const systemRoutes = [
  {
    label: "Logs",
    url: "/system/logs",
    icon: FileClock,
    roles: ["super_admin", "admin"] as Role[],
  },
  {
    label: "Backups",
    url: "/system/backups",
    icon: DatabaseBackup,
    roles: ["super_admin"] as Role[],
  },
];

export const mainRoutes = [
  {
    label: "My Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    label: "Inbox",
    url: "/dashboard/inbox",
    icon: MailIcon,
  },
];

export const personalRoutes = [
  {
    label: "My Courses",
    url: "/dashboard/courses",
    icon: BookOpenIcon,
    roles: [] as Role[],
  },
  {
    label: "My Accommodations",
    url: "/dashboard/accommodations",
    icon: DoorOpenIcon,
    roles: [] as Role[],
  },
  {
    label: "My Orders",
    url: "/dashboard/orders",
    icon: ReceiptIcon,
    roles: [] as Role[],
  },
  {
    label: "My Collections",
    url: "/dashboard/collections",
    icon: BookmarkIcon,
    roles: [] as Role[],
  },
];

export const tableData = [
  {
    id: 1,
    header: "Cover page",
    type: "Cover page",
    status: "In Process",
    target: "18",
    limit: "5",
    reviewer: "Eddie Lake",
  },
  {
    id: 2,
    header: "Table of contents",
    type: "Table of contents",
    status: "Done",
    target: "29",
    limit: "24",
    reviewer: "Eddie Lake",
  },
  {
    id: 3,
    header: "Executive summary",
    type: "Narrative",
    status: "Done",
    target: "10",
    limit: "13",
    reviewer: "Eddie Lake",
  },
  {
    id: 4,
    header: "Technical approach",
    type: "Narrative",
    status: "Done",
    target: "27",
    limit: "23",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 5,
    header: "Design",
    type: "Narrative",
    status: "In Process",
    target: "2",
    limit: "16",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 6,
    header: "Capabilities",
    type: "Narrative",
    status: "In Process",
    target: "20",
    limit: "8",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 7,
    header: "Integration with existing systems",
    type: "Narrative",
    status: "In Process",
    target: "19",
    limit: "21",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 8,
    header: "Innovation and Advantages",
    type: "Narrative",
    status: "Done",
    target: "25",
    limit: "26",
    reviewer: "Assign reviewer",
  },
  {
    id: 9,
    header: "Overview of EMR's Innovative Solutions",
    type: "Technical content",
    status: "Done",
    target: "7",
    limit: "23",
    reviewer: "Assign reviewer",
  },
  {
    id: 10,
    header: "Advanced Algorithms and Machine Learning",
    type: "Narrative",
    status: "Done",
    target: "30",
    limit: "28",
    reviewer: "Assign reviewer",
  },
  {
    id: 11,
    header: "Adaptive Communication Protocols",
    type: "Narrative",
    status: "Done",
    target: "9",
    limit: "31",
    reviewer: "Assign reviewer",
  },
  {
    id: 12,
    header: "Advantages Over Current Technologies",
    type: "Narrative",
    status: "Done",
    target: "12",
    limit: "0",
    reviewer: "Assign reviewer",
  },
  {
    id: 13,
    header: "Past Performance",
    type: "Narrative",
    status: "Done",
    target: "22",
    limit: "33",
    reviewer: "Assign reviewer",
  },
  {
    id: 14,
    header: "Customer Feedback and Satisfaction Levels",
    type: "Narrative",
    status: "Done",
    target: "15",
    limit: "34",
    reviewer: "Assign reviewer",
  },
  {
    id: 15,
    header: "Implementation Challenges and Solutions",
    type: "Narrative",
    status: "Done",
    target: "3",
    limit: "35",
    reviewer: "Assign reviewer",
  },
  {
    id: 16,
    header: "Security Measures and Data Protection Policies",
    type: "Narrative",
    status: "In Process",
    target: "6",
    limit: "36",
    reviewer: "Assign reviewer",
  },
  {
    id: 17,
    header: "Scalability and Future Proofing",
    type: "Narrative",
    status: "Done",
    target: "4",
    limit: "37",
    reviewer: "Assign reviewer",
  },
  {
    id: 18,
    header: "Cost-Benefit Analysis",
    type: "Plain language",
    status: "Done",
    target: "14",
    limit: "38",
    reviewer: "Assign reviewer",
  },
  {
    id: 19,
    header: "User Training and Onboarding Experience",
    type: "Narrative",
    status: "Done",
    target: "17",
    limit: "39",
    reviewer: "Assign reviewer",
  },
  {
    id: 20,
    header: "Future Development Roadmap",
    type: "Narrative",
    status: "Done",
    target: "11",
    limit: "40",
    reviewer: "Assign reviewer",
  },
  {
    id: 21,
    header: "System Architecture Overview",
    type: "Technical content",
    status: "In Process",
    target: "24",
    limit: "18",
    reviewer: "Maya Johnson",
  },
  {
    id: 22,
    header: "Risk Management Plan",
    type: "Narrative",
    status: "Done",
    target: "15",
    limit: "22",
    reviewer: "Carlos Rodriguez",
  },
  {
    id: 23,
    header: "Compliance Documentation",
    type: "Legal",
    status: "In Process",
    target: "31",
    limit: "27",
    reviewer: "Sarah Chen",
  },
  {
    id: 24,
    header: "API Documentation",
    type: "Technical content",
    status: "Done",
    target: "8",
    limit: "12",
    reviewer: "Raj Patel",
  },
  {
    id: 25,
    header: "User Interface Mockups",
    type: "Visual",
    status: "In Process",
    target: "19",
    limit: "25",
    reviewer: "Leila Ahmadi",
  },
  {
    id: 26,
    header: "Database Schema",
    type: "Technical content",
    status: "Done",
    target: "22",
    limit: "20",
    reviewer: "Thomas Wilson",
  },
  {
    id: 27,
    header: "Testing Methodology",
    type: "Technical content",
    status: "In Process",
    target: "17",
    limit: "14",
    reviewer: "Assign reviewer",
  },
  {
    id: 28,
    header: "Deployment Strategy",
    type: "Narrative",
    status: "Done",
    target: "26",
    limit: "30",
    reviewer: "Eddie Lake",
  },
  {
    id: 29,
    header: "Budget Breakdown",
    type: "Financial",
    status: "In Process",
    target: "13",
    limit: "16",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 30,
    header: "Market Analysis",
    type: "Research",
    status: "Done",
    target: "29",
    limit: "32",
    reviewer: "Sophia Martinez",
  },
  {
    id: 31,
    header: "Competitor Comparison",
    type: "Research",
    status: "In Process",
    target: "21",
    limit: "19",
    reviewer: "Assign reviewer",
  },
  {
    id: 32,
    header: "Maintenance Plan",
    type: "Technical content",
    status: "Done",
    target: "16",
    limit: "23",
    reviewer: "Alex Thompson",
  },
  {
    id: 33,
    header: "User Personas",
    type: "Research",
    status: "In Process",
    target: "27",
    limit: "24",
    reviewer: "Nina Patel",
  },
  {
    id: 34,
    header: "Accessibility Compliance",
    type: "Legal",
    status: "Done",
    target: "18",
    limit: "21",
    reviewer: "Assign reviewer",
  },
  {
    id: 35,
    header: "Performance Metrics",
    type: "Technical content",
    status: "In Process",
    target: "23",
    limit: "26",
    reviewer: "David Kim",
  },
  {
    id: 36,
    header: "Disaster Recovery Plan",
    type: "Technical content",
    status: "Done",
    target: "14",
    limit: "17",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 37,
    header: "Third-party Integrations",
    type: "Technical content",
    status: "In Process",
    target: "25",
    limit: "28",
    reviewer: "Eddie Lake",
  },
  {
    id: 38,
    header: "User Feedback Summary",
    type: "Research",
    status: "Done",
    target: "20",
    limit: "15",
    reviewer: "Assign reviewer",
  },
  {
    id: 39,
    header: "Localization Strategy",
    type: "Narrative",
    status: "In Process",
    target: "12",
    limit: "19",
    reviewer: "Maria Garcia",
  },
  {
    id: 40,
    header: "Mobile Compatibility",
    type: "Technical content",
    status: "Done",
    target: "28",
    limit: "31",
    reviewer: "James Wilson",
  },
  {
    id: 41,
    header: "Data Migration Plan",
    type: "Technical content",
    status: "In Process",
    target: "19",
    limit: "22",
    reviewer: "Assign reviewer",
  },
  {
    id: 42,
    header: "Quality Assurance Protocols",
    type: "Technical content",
    status: "Done",
    target: "30",
    limit: "33",
    reviewer: "Priya Singh",
  },
  {
    id: 43,
    header: "Stakeholder Analysis",
    type: "Research",
    status: "In Process",
    target: "11",
    limit: "14",
    reviewer: "Eddie Lake",
  },
  {
    id: 44,
    header: "Environmental Impact Assessment",
    type: "Research",
    status: "Done",
    target: "24",
    limit: "27",
    reviewer: "Assign reviewer",
  },
  {
    id: 45,
    header: "Intellectual Property Rights",
    type: "Legal",
    status: "In Process",
    target: "17",
    limit: "20",
    reviewer: "Sarah Johnson",
  },
  {
    id: 46,
    header: "Customer Support Framework",
    type: "Narrative",
    status: "Done",
    target: "22",
    limit: "25",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 47,
    header: "Version Control Strategy",
    type: "Technical content",
    status: "In Process",
    target: "15",
    limit: "18",
    reviewer: "Assign reviewer",
  },
  {
    id: 48,
    header: "Continuous Integration Pipeline",
    type: "Technical content",
    status: "Done",
    target: "26",
    limit: "29",
    reviewer: "Michael Chen",
  },
  {
    id: 49,
    header: "Regulatory Compliance",
    type: "Legal",
    status: "In Process",
    target: "13",
    limit: "16",
    reviewer: "Assign reviewer",
  },
  {
    id: 50,
    header: "User Authentication System",
    type: "Technical content",
    status: "Done",
    target: "28",
    limit: "31",
    reviewer: "Eddie Lake",
  },
  {
    id: 51,
    header: "Data Analytics Framework",
    type: "Technical content",
    status: "In Process",
    target: "21",
    limit: "24",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 52,
    header: "Cloud Infrastructure",
    type: "Technical content",
    status: "Done",
    target: "16",
    limit: "19",
    reviewer: "Assign reviewer",
  },
  {
    id: 53,
    header: "Network Security Measures",
    type: "Technical content",
    status: "In Process",
    target: "29",
    limit: "32",
    reviewer: "Lisa Wong",
  },
  {
    id: 54,
    header: "Project Timeline",
    type: "Planning",
    status: "Done",
    target: "14",
    limit: "17",
    reviewer: "Eddie Lake",
  },
  {
    id: 55,
    header: "Resource Allocation",
    type: "Planning",
    status: "In Process",
    target: "27",
    limit: "30",
    reviewer: "Assign reviewer",
  },
  {
    id: 56,
    header: "Team Structure and Roles",
    type: "Planning",
    status: "Done",
    target: "20",
    limit: "23",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 57,
    header: "Communication Protocols",
    type: "Planning",
    status: "In Process",
    target: "15",
    limit: "18",
    reviewer: "Assign reviewer",
  },
  {
    id: 58,
    header: "Success Metrics",
    type: "Planning",
    status: "Done",
    target: "30",
    limit: "33",
    reviewer: "Eddie Lake",
  },
  {
    id: 59,
    header: "Internationalization Support",
    type: "Technical content",
    status: "In Process",
    target: "23",
    limit: "26",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 60,
    header: "Backup and Recovery Procedures",
    type: "Technical content",
    status: "Done",
    target: "18",
    limit: "21",
    reviewer: "Assign reviewer",
  },
  {
    id: 61,
    header: "Monitoring and Alerting System",
    type: "Technical content",
    status: "In Process",
    target: "25",
    limit: "28",
    reviewer: "Daniel Park",
  },
  {
    id: 62,
    header: "Code Review Guidelines",
    type: "Technical content",
    status: "Done",
    target: "12",
    limit: "15",
    reviewer: "Eddie Lake",
  },
  {
    id: 63,
    header: "Documentation Standards",
    type: "Technical content",
    status: "In Process",
    target: "27",
    limit: "30",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 64,
    header: "Release Management Process",
    type: "Planning",
    status: "Done",
    target: "22",
    limit: "25",
    reviewer: "Assign reviewer",
  },
  {
    id: 65,
    header: "Feature Prioritization Matrix",
    type: "Planning",
    status: "In Process",
    target: "19",
    limit: "22",
    reviewer: "Emma Davis",
  },
  {
    id: 66,
    header: "Technical Debt Assessment",
    type: "Technical content",
    status: "Done",
    target: "24",
    limit: "27",
    reviewer: "Eddie Lake",
  },
  {
    id: 67,
    header: "Capacity Planning",
    type: "Planning",
    status: "In Process",
    target: "21",
    limit: "24",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 68,
    header: "Service Level Agreements",
    type: "Legal",
    status: "Done",
    target: "26",
    limit: "29",
    reviewer: "Assign reviewer",
  },
];
