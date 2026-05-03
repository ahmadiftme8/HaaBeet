import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().defaultNow(),
});

export const habits = sqliteTable("habits", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  frequencyType: text("frequency_type", {
    enum: ["DAILY", "WEEKLY", "CUSTOM"],
  }).default("DAILY"),
  frequencyConfig: text("frequency_config"),
  isTemplate: integer("is_template", { mode: "boolean" }).default(false),
  isPublic: integer("is_public", { mode: "boolean" }).default(false),
  userId: text("user_id").references(() => users.id),
  createdAt: integer("created_at", { mode: "timestamp" }).defaultNow(),
});

export const habitEntries = sqliteTable("habit_entries", {
  id: text("id").primaryKey(),
  habitId: text("habit_id").references(() => habits.id),
  date: integer("date", { mode: "timestamp" }).notNull(),
  completed: integer("completed", { mode: "boolean" }).default(false),
  completedAt: integer("completed_at", { mode: "timestamp" }),
});

export const circles = sqliteTable("circles", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  inviteCode: text("invite_code").notNull().unique(),
  ownerId: text("owner_id").references(() => users.id),
});

export const circleMembers = sqliteTable("circle_members", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  circleId: text("circle_id").references(() => circles.id),
  joinedAt: integer("joined_at", { mode: "timestamp" }).defaultNow(),
});