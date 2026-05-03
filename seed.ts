// seed.ts
import { db } from "./src/db";
import * as schema from "./src/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("🌱 Seeding MySQL (idempotent)...");

  const userId = "user-1";

  // Temporarily disable FK checks to safely delete and re-insert
  await db.execute("SET FOREIGN_KEY_CHECKS = 0");

  // Remove old demo data
  await db.delete(schema.users).where(eq(schema.users.id, userId));
  await db.delete(schema.habits).where(eq(schema.habits.userId, userId));
  // Delete any entries that might reference demo habits (just in case)
  await db.delete(schema.habitEntries).where(
    eq(schema.habitEntries.habitId, "habit-1")
  );
  await db.delete(schema.habitEntries).where(
    eq(schema.habitEntries.habitId, "habit-2")
  );
  await db.delete(schema.habitEntries).where(
    eq(schema.habitEntries.habitId, "habit-3")
  );

  await db.execute("SET FOREIGN_KEY_CHECKS = 1");

  // Create demo user
  const passwordHash = await bcrypt.hash("test1234", 10);
  await db.insert(schema.users).values({
    id: userId,
    username: "demo",
    passwordHash,
  });

  // Create habits
  const habits = [
    {
      id: "habit-1",
      title: "Read 20 pages",
      description: "Daily reading habit",
      frequencyType: "DAILY" as const,
      userId,
    },
    {
      id: "habit-2",
      title: "Exercise",
      description: "Mon, Wed, Fri",
      frequencyType: "WEEKLY" as const,
      frequencyConfig: { days: ["MON", "WED", "FRI"] }, // directly as JSON
      userId,
    },
    {
      id: "habit-3",
      title: "Meditate",
      description: "10 minutes of mindfulness",
      frequencyType: "DAILY" as const,
      userId,
    },
  ];

  for (const habit of habits) {
    await db.insert(schema.habits).values(habit);
  }

  // Create some entries
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  await db.insert(schema.habitEntries).values([
    {
      id: "entry-1",
      habitId: "habit-1",
      date: now,
      completed: true,
      completedAt: now,
    },
    {
      id: "entry-2",
      habitId: "habit-1",
      date: yesterday,
      completed: true,
      completedAt: yesterday,
    },
    {
      id: "entry-3",
      habitId: "habit-3",
      date: now,
      completed: false,
    },
  ]);

  console.log("✅ Seed complete. Demo user (demo / test1234) with 3 habits.");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});