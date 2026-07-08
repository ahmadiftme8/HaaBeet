import { pgTable, varchar, text, timestamp, boolean, json, pgEnum, primaryKey } from "drizzle-orm/pg-core";

export const frequencyTypeEnum = pgEnum("frequency_type", ["DAILY", "WEEKLY", "CUSTOM"]);

export const users = pgTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),  // UUID string
  username: varchar("username", { length: 50 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const habits = pgTable("habits", {
  id: varchar("id", { length: 36 }).primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description"),
  frequencyType: frequencyTypeEnum("frequency_type").default("DAILY").notNull(),
  frequencyConfig: json("frequency_config"),
  isTemplate: boolean("is_template").default(false),
  isPublic: boolean("is_public").default(false),
  userId: varchar("user_id", { length: 36 }).references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const habitEntries = pgTable("habit_entries", {
  id: varchar("id", { length: 36 }).primaryKey(),
  habitId: varchar("habit_id", { length: 36 }).references(() => habits.id).notNull(),
  date: timestamp("date").notNull(),
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
});

export const circles = pgTable("circles", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  inviteCode: varchar("invite_code", { length: 20 }).notNull().unique(),
  ownerId: varchar("owner_id", { length: 36 }).references(() => users.id).notNull(),
});

export const circleMembers = pgTable("circle_members", {
  id: varchar("id", { length: 36 }).notNull(),
  userId: varchar("user_id", { length: 36 }).references(() => users.id).notNull(),
  circleId: varchar("circle_id", { length: 36 }).references(() => circles.id).notNull(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
}, (table) => ({
  uniqueUserCircle: primaryKey({ columns: [table.userId, table.circleId] }),
}));
