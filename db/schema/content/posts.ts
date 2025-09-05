import { integer, jsonb, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { booleanTypeEnum, collectionTypeEnum, postStatusEnum } from "../enums";
import { users } from "../users";

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey(),	
  title: varchar("title", { length: 200 }).notNull(),	
  slug: varchar("slug", { length: 200 }).unique().notNull(),
  excerpt: text("excerpt"), // ringkasan singkat
   content: jsonb("content").notNull(), // Store editor JSON for flexibility
  coverImage: varchar("cover_image", { length: 255 }), // optional
  authorId: uuid("author_id")
    .references(() => users.id, { onDelete: "set null" }), // relasi ke user
     status: postStatusEnum("status").default("draft").notNull(),
  isPublished: booleanTypeEnum("is_published").default("false").notNull(),
  publishedAt: timestamp("published_at"), // kapan dipublish
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Table of Contents
export const postTocs = pgTable("post_tocs", {
  id: uuid("id").primaryKey(),
  postId: uuid("post_id")
    .references(() => posts.id, { onDelete: "cascade" })
    .notNull(),
  label: varchar("label", { length: 200 }).notNull(), // e.g. section title
  anchor: varchar("anchor", { length: 200 }).notNull(), // link target in the post
  level: integer("level").notNull(), // h2 = 2, h3 = 3
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const postCategories = pgTable("post_categories", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).unique().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const postSeo = pgTable("post_seo", {
  id: uuid("id").primaryKey(),
  postId: uuid("post_id")
    .references(() => posts.id, { onDelete: "cascade" })
    .notNull(),
  metaTitle: varchar("meta_title", { length: 200 }),      // SEO page title
  metaDescription: varchar("meta_description", { length: 300 }), // SEO meta description
  metaKeywords: varchar("meta_keywords", { length: 300 }), // Optional
  ogImage: varchar("og_image", { length: 255 }),          // Open Graph image
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userCollections = pgTable("user_collections", {
  id: uuid("id").primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  type: collectionTypeEnum("type").default("personal").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const collectionPosts = pgTable("collection_posts", {
  collectionId: uuid("collection_id")
    .references(() => userCollections.id, { onDelete: "cascade" })
    .notNull(),
  postId: uuid("post_id")
    .references(() => posts.id, { onDelete: "cascade" })
    .notNull(),
  addedAt: timestamp("added_at").defaultNow().notNull(),
});


export const postCategoryRelations = pgTable("post_category_relations", {
  postId: uuid("post_id")
    .references(() => posts.id, { onDelete: "cascade" })
    .notNull(),
  categoryId: uuid("category_id")
    .references(() => postCategories.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const postTags = pgTable("post_tags", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  slug: varchar("slug", { length: 50 }).unique().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const postTagRelations = pgTable("post_tag_relations", {
  postId: uuid("post_id")
    .references(() => posts.id, { onDelete: "cascade" })
    .notNull(),
  tagId: uuid("tag_id")
    .references(() => postTags.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});