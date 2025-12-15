CREATE TYPE "public"."boolean_type" AS ENUM('true', 'false');--> statement-breakpoint
CREATE TYPE "public"."collection_type" AS ENUM('personal', 'curated', 'system');--> statement-breakpoint
CREATE TYPE "public"." course_batch_status" AS ENUM('upcoming', 'ongoing', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."course_category" AS ENUM('IELTS', 'TOEFL', 'TOEIC', 'Pronounciation');--> statement-breakpoint
CREATE TYPE "public"."course_level" AS ENUM('Intro', 'Next Step', 'Advanced', 'Drill Class', 'Mock Test');--> statement-breakpoint
CREATE TYPE "public"."course_mode" AS ENUM('offline', 'online', 'hybrid');--> statement-breakpoint
CREATE TYPE "public"."day_of_week" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');--> statement-breakpoint
CREATE TYPE "public"." delivery_mode" AS ENUM('offline', 'online', 'hybrid');--> statement-breakpoint
CREATE TYPE "public"."entity_type" AS ENUM('building', 'roomType', 'course', 'test');--> statement-breakpoint
CREATE TYPE "public"."facility_category" AS ENUM('general', 'amenities', 'accommodation', 'dining', 'comfort', 'study', 'sports', 'health', 'community', 'entertainment', 'services', 'safety');--> statement-breakpoint
CREATE TYPE "public"."facility_status" AS ENUM('active', 'inactive', 'archived');--> statement-breakpoint
CREATE TYPE "public"."facility_type" AS ENUM('building', 'roomType');--> statement-breakpoint
CREATE TYPE "public"."lead_status" AS ENUM('new', 'in_progress', 'closed');--> statement-breakpoint
CREATE TYPE "public"."meet_status" AS ENUM('scheduled', 'completed', 'rescheduled');--> statement-breakpoint
CREATE TYPE "public"."banner_type" AS ENUM('Home', 'Camp', 'Programs', 'Tests', 'About', 'Blog', 'Contact');--> statement-breakpoint
CREATE TYPE "public"."post_status" AS ENUM('draft', 'scheduled', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('super_admin', 'admin', 'room_master', 'teacher', 'accommodation_staff', 'author', 'student');--> statement-breakpoint
CREATE TYPE "public"."room_status" AS ENUM('available', 'occupied', 'maintenance');--> statement-breakpoint
CREATE TYPE "public"."service_type" AS ENUM('building_room', 'test', 'course');--> statement-breakpoint
CREATE TYPE "public"."social_platform" AS ENUM('youtube', 'linkedin', 'tiktok', 'instagram', 'facebook', 'x', 'threads', 'snapchat', 'pinterest', 'reddit', 'whatsapp', 'telegram', 'discord');--> statement-breakpoint
CREATE TYPE "public"."test_mode" AS ENUM('offline', 'online');--> statement-breakpoint
CREATE TYPE "public"."test_type" AS ENUM('IELTS', 'TOEFL', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."testimonial_source" AS ENUM('student', 'alumni', 'parent', 'partner', 'other');--> statement-breakpoint
CREATE TABLE "pillars" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"subtitle" text,
	"icon_url" text,
	"image_url" text,
	"image_key" text,
	"cta_text" varchar(100) NOT NULL,
	"cta_link" varchar(255),
	"order" integer DEFAULT 0 NOT NULL,
	"features" jsonb,
	"badge_text" varchar(100),
	"is_active" boolean_type DEFAULT 'false',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "pillars_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "collection_posts" (
	"collection_id" uuid NOT NULL,
	"post_id" uuid NOT NULL,
	"added_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_categories" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"slug" varchar(100) NOT NULL,
	"icon_url" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "post_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "post_category_relations" (
	"post_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_seo" (
	"id" uuid PRIMARY KEY NOT NULL,
	"post_id" uuid NOT NULL,
	"meta_title" varchar(200),
	"meta_description" varchar(300),
	"meta_keywords" varchar(300),
	"og_image" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_tag_relations" (
	"post_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_tags" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"slug" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "post_tags_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "post_tocs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"post_id" uuid NOT NULL,
	"label" varchar(200) NOT NULL,
	"anchor" varchar(200) NOT NULL,
	"level" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(200) NOT NULL,
	"slug" varchar(200) NOT NULL,
	"excerpt" text,
	"content" jsonb NOT NULL,
	"cover_image" varchar(255),
	"author_id" uuid,
	"status" "post_status" DEFAULT 'draft' NOT NULL,
	"is_published" boolean_type DEFAULT 'false' NOT NULL,
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "user_collections" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"type" "collection_type" DEFAULT 'personal' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_collections_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(150),
	"phone" varchar(20),
	"message" text,
	"status" "lead_status" DEFAULT 'new',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "accreditations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(150) NOT NULL,
	"slug" varchar(150) NOT NULL,
	"description" text,
	"is_active" boolean_type DEFAULT 'false',
	"order" integer DEFAULT 0 NOT NULL,
	"image_url" varchar(300),
	"image_key" varchar(300),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "accreditations_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "banners" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "banner_type" NOT NULL,
	"headline" text NOT NULL,
	"subheadline" text,
	"ctas" jsonb,
	"badge_text" varchar(100),
	"media_url" varchar(255),
	"media_key" varchar(255),
	"is_active" boolean_type DEFAULT 'false',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "highlights" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"subtitle" text,
	"icon_url" text,
	"order" integer DEFAULT 0 NOT NULL,
	"features" jsonb,
	"is_active" boolean_type DEFAULT 'true',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "highlights_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "milestones" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"year" integer NOT NULL,
	"title" varchar(200) NOT NULL,
	"slug" varchar(200) NOT NULL,
	"description" text,
	"image_url" text,
	"image_key" text,
	"order" integer DEFAULT 0 NOT NULL,
	"is_shown" boolean_type DEFAULT 'false',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "milestones_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "testimonial_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(120) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "testimonial_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "testimonial_category_relations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"testimonial_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"name" varchar(100) NOT NULL,
	"role" varchar(255),
	"source" "testimonial_source" DEFAULT 'student' NOT NULL,
	"image_url" text,
	"image_key" text,
	"content" text NOT NULL,
	"rating" numeric NOT NULL,
	"score" integer,
	"is_featured" boolean_type DEFAULT 'false' NOT NULL,
	"is_shown" boolean_type DEFAULT 'false' NOT NULL,
	"order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "principles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"subtitle" text,
	"icon_url" text,
	"order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean_type DEFAULT 'true',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "principles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "statistics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"value" varchar(50) NOT NULL,
	"label" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"description" text,
	"icon_url" text,
	"order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean_type DEFAULT 'false',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "statistics_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "departments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"description" text,
	"order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean_type DEFAULT 'false',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "departments_name_unique" UNIQUE("name"),
	CONSTRAINT "departments_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"title" varchar(150) NOT NULL,
	"department_id" uuid NOT NULL,
	"avatar_url" text,
	"avatar_key" text,
	"bio" text,
	"order" integer DEFAULT 0 NOT NULL,
	"social_links" jsonb,
	"is_active" boolean_type DEFAULT 'false',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "team_members_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "photo_relations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"photo_id" uuid NOT NULL,
	"target_id" uuid NOT NULL,
	"entity_type" "entity_type" NOT NULL,
	"order" integer DEFAULT 0,
	"is_featured" boolean_type DEFAULT 'false',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "photos" (
	"id" uuid PRIMARY KEY NOT NULL,
	"image_url" text NOT NULL,
	"image_key" text NOT NULL,
	"title" varchar(150),
	"order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "building_courses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"building_id" uuid NOT NULL,
	"course_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bundle_items" (
	"id" uuid PRIMARY KEY NOT NULL,
	"bundle_id" uuid NOT NULL,
	"service_ref_id" uuid NOT NULL,
	"service_type" "service_type" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "bundles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(150) NOT NULL,
	"description" text,
	"image_url" varchar(255),
	"link" varchar(255),
	"order" integer DEFAULT 0,
	"is_active" boolean_type DEFAULT 'true',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "faq_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(120) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "faq_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "faq_category_relations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"faq_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "faqs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"answer" text NOT NULL,
	"icon_url" text,
	"is_shown" boolean_type DEFAULT 'false' NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "faqs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "social_medias" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"platform" "social_platform" NOT NULL,
	"url" text,
	"order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean_type DEFAULT 'false' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(150) NOT NULL,
	"slug" varchar(150) NOT NULL,
	"address" text NOT NULL,
	"lat" numeric(11, 8) NOT NULL,
	"lng" numeric(11, 8) NOT NULL,
	"maps_link" text NOT NULL,
	"phone" varchar(30) NOT NULL,
	"email" varchar(100) NOT NULL,
	"hours" jsonb NOT NULL,
	"is_active" boolean_type DEFAULT 'false' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "locations_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" "role" NOT NULL,
	"description" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"user_id" uuid NOT NULL,
	"role_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" varchar(255) NOT NULL,
	"first_name" varchar(100),
	"last_name" varchar(100),
	"avatar_url" text,
	"email" varchar(150),
	"phone" varchar(20),
	"last_active_role" "role",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "tests" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(150) NOT NULL,
	"description" text,
	"mode" "test_mode" DEFAULT 'offline' NOT NULL,
	"is_active" boolean_type DEFAULT 'true',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "test_schedules" (
	"id" uuid PRIMARY KEY NOT NULL,
	"test_id" uuid NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp,
	"capacity" integer,
	"price" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "building_room_type_pricings" (
	"id" uuid PRIMARY KEY NOT NULL,
	"building_room_type_id" uuid NOT NULL,
	"occupancy" integer NOT NULL,
	"price_per_person" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "building_room_types" (
	"id" uuid PRIMARY KEY NOT NULL,
	"building_id" uuid NOT NULL,
	"room_type_id" uuid NOT NULL,
	"is_active" boolean_type DEFAULT 'true' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "building_gallery" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"building_id" uuid NOT NULL,
	"image_url" text NOT NULL,
	"image_key" text NOT NULL,
	"image_alt" varchar(255),
	"title" varchar(200),
	"description" text,
	"order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "buildings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"location_id" uuid NOT NULL,
	"name" varchar(150) NOT NULL,
	"slug" varchar(150) NOT NULL,
	"description" text,
	"long_description" text,
	"image_url" text,
	"image_key" text,
	"image_alt" varchar(255),
	"badge" varchar(100),
	"badge_color" varchar(20),
	"rules" jsonb,
	"availability" jsonb,
	"order" integer,
	"is_active" boolean_type DEFAULT 'true',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "buildings_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "facilities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(120),
	"type" "facility_type" DEFAULT 'building' NOT NULL,
	"status" "facility_status" DEFAULT 'active',
	"is_featured" boolean_type DEFAULT 'false',
	"description" text,
	"icon_url" text,
	"image_url" text,
	"image_key" text,
	"order" integer DEFAULT 0,
	"category" "facility_category" DEFAULT 'general',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "facility_relations" (
	"id" uuid PRIMARY KEY NOT NULL,
	"facility_id" uuid NOT NULL,
	"target_id" uuid NOT NULL,
	"entity_type" "entity_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "room_types" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"description" text,
	"capacity" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "room_types_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "rooms" (
	"id" uuid PRIMARY KEY NOT NULL,
	"building_room_type_id" uuid NOT NULL,
	"room_number" varchar(50) NOT NULL,
	"status" "room_status" DEFAULT 'available' NOT NULL,
	"notes" text,
	"floor" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "batch_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"course_batch_id" uuid NOT NULL,
	"start_datetime" timestamp with time zone,
	"end_datetime" timestamp with time zone,
	"delivery_mode" " delivery_mode" DEFAULT 'offline',
	"status" "meet_status" DEFAULT 'scheduled' NOT NULL,
	"order" integer,
	"notes" text,
	"location" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "batch_weekly_schedule" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"course_batch_id" uuid NOT NULL,
	"day_of_week" "day_of_week" NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	"is_closed" boolean_type DEFAULT 'false' NOT NULL,
	"notes" text,
	"location" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course_batches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"course_id" uuid NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date,
	"capacity" integer,
	"delivery_mode" " delivery_mode" DEFAULT 'offline' NOT NULL,
	"price" integer NOT NULL,
	"status" " course_batch_status" DEFAULT 'upcoming' NOT NULL,
	"number" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(120) NOT NULL,
	"title" varchar(150) NOT NULL,
	"category" "course_category" NOT NULL,
	"imageUrl" text,
	"imageKey" text,
	"level" "course_level" NOT NULL,
	"duration" varchar(50) NOT NULL,
	"total_sessions" integer NOT NULL,
	"description" text,
	"learning_goals" jsonb,
	"syllabus" jsonb,
	"teaching_method" jsonb,
	"resources" jsonb,
	"target_audience" jsonb,
	"price" integer NOT NULL,
	"min_price" integer,
	"max_price" integer,
	"is_active" boolean_type DEFAULT 'false',
	"is_featured" boolean_type DEFAULT 'false',
	"order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "courses_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "collection_posts" ADD CONSTRAINT "collection_posts_collection_id_user_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."user_collections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collection_posts" ADD CONSTRAINT "collection_posts_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_category_relations" ADD CONSTRAINT "post_category_relations_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_category_relations" ADD CONSTRAINT "post_category_relations_category_id_post_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_seo" ADD CONSTRAINT "post_seo_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_tag_relations" ADD CONSTRAINT "post_tag_relations_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_tag_relations" ADD CONSTRAINT "post_tag_relations_tag_id_post_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."post_tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_tocs" ADD CONSTRAINT "post_tocs_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_collections" ADD CONSTRAINT "user_collections_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "testimonial_category_relations" ADD CONSTRAINT "testimonial_category_relations_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "testimonial_category_relations" ADD CONSTRAINT "testimonial_category_relations_category_id_testimonial_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."testimonial_categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "photo_relations" ADD CONSTRAINT "photo_relations_photo_id_photos_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."photos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "building_courses" ADD CONSTRAINT "building_courses_building_id_buildings_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "building_courses" ADD CONSTRAINT "building_courses_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bundle_items" ADD CONSTRAINT "bundle_items_bundle_id_bundles_id_fk" FOREIGN KEY ("bundle_id") REFERENCES "public"."bundles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "faq_category_relations" ADD CONSTRAINT "faq_category_relations_faq_id_faqs_id_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "faq_category_relations" ADD CONSTRAINT "faq_category_relations_category_id_faq_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."faq_categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_schedules" ADD CONSTRAINT "test_schedules_test_id_tests_id_fk" FOREIGN KEY ("test_id") REFERENCES "public"."tests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "building_room_type_pricings" ADD CONSTRAINT "building_room_type_pricings_building_room_type_id_building_room_types_id_fk" FOREIGN KEY ("building_room_type_id") REFERENCES "public"."building_room_types"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "building_room_types" ADD CONSTRAINT "building_room_types_building_id_buildings_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "building_room_types" ADD CONSTRAINT "building_room_types_room_type_id_room_types_id_fk" FOREIGN KEY ("room_type_id") REFERENCES "public"."room_types"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "building_gallery" ADD CONSTRAINT "building_gallery_building_id_buildings_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "buildings" ADD CONSTRAINT "buildings_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "facility_relations" ADD CONSTRAINT "facility_relations_facility_id_facilities_id_fk" FOREIGN KEY ("facility_id") REFERENCES "public"."facilities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_building_room_type_id_building_room_types_id_fk" FOREIGN KEY ("building_room_type_id") REFERENCES "public"."building_room_types"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "batch_sessions" ADD CONSTRAINT "batch_sessions_course_batch_id_course_batches_id_fk" FOREIGN KEY ("course_batch_id") REFERENCES "public"."course_batches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "batch_weekly_schedule" ADD CONSTRAINT "batch_weekly_schedule_course_batch_id_course_batches_id_fk" FOREIGN KEY ("course_batch_id") REFERENCES "public"."course_batches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_batches" ADD CONSTRAINT "course_batches_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "name_idx" ON "post_categories" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "building_room_types_building_roomtype_uq" ON "building_room_types" USING btree ("building_id","room_type_id");--> statement-breakpoint
CREATE INDEX "building_room_types_building_idx" ON "building_room_types" USING btree ("building_id");--> statement-breakpoint
CREATE INDEX "building_room_types_roomtype_idx" ON "building_room_types" USING btree ("room_type_id");--> statement-breakpoint
CREATE INDEX "rooms_crt_idx" ON "rooms" USING btree ("building_room_type_id");--> statement-breakpoint
CREATE UNIQUE INDEX "rooms_crt_roomnumber_uq" ON "rooms" USING btree ("building_room_type_id","room_number");