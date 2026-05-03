import { mysqlTable, varchar, text, int, timestamp, boolean, json, mysqlEnum, datetime, primaryKey } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),  // UUID string
  username: varchar("username", { length: 50 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const habits = mysqlTable("habits", {
  id: varchar("id", { length: 36 }).primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description"),
  frequencyType: mysqlEnum("frequency_type", ["DAILY", "WEEKLY", "CUSTOM"]).default("DAILY").notNull(),
  frequencyConfig: json("frequency_config"), // JSON column
  isTemplate: boolean("is_template").default(false),
  isPublic: boolean("is_public").default(false),
  userId: varchar("user_id", { length: 36 }).references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const habitEntries = mysqlTable("habit_entries", {
  id: varchar("id", { length: 36 }).primaryKey(),
  habitId: varchar("habit_id", { length: 36 }).references(() => habits.id).notNull(),
  date: datetime("date").notNull(),                       // ← datetime, no auto-default
  completed: boolean("completed").default(false),
  completedAt: datetime("completed_at"),                 // ← datetime, nullable (no default needed)
});

export const circles = mysqlTable("circles", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  inviteCode: varchar("invite_code", { length: 20 }).notNull().unique(),
  ownerId: varchar("owner_id", { length: 36 }).references(() => users.id).notNull(),
});

export const circleMembers = mysqlTable("circle_members", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 }).references(() => users.id).notNull(),
  circleId: varchar("circle_id", { length: 36 }).references(() => circles.id).notNull(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
}, (table) => ({
  uniqueUserCircle: primaryKey({ columns: [table.userId, table.circleId] }),
}));