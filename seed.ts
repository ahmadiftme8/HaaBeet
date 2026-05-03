// @ts-nocheck
import initSqlJs from 'sql.js';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import { drizzle } from 'drizzle-orm/sql-js';
import * as schema from './src/db/schema';
import { eq } from 'drizzle-orm';

async function seed() {
  const SQL = await initSqlJs();
  const dbPath = './dev.sqlite';
  const fileBuffer = fs.existsSync(dbPath) ? fs.readFileSync(dbPath) : null;
  const sqlDb = new SQL.Database(fileBuffer);
  const db = drizzle(sqlDb, { schema });

  console.log('🌱 Seeding (cleaning up old demo data first)...');

  const userId = 'user-1';

  // Remove old entries and habits for demo user
  // First, get habit IDs belonging to the demo user
  const existingHabits = db.select({ id: schema.habits.id })
    .from(schema.habits)
    .where(eq(schema.habits.userId, userId))
    .all();

  const habitIds = existingHabits.map(h => h.id);
  if (habitIds.length > 0) {
    // Delete all entries for those habits
    for (const hid of habitIds) {
      db.delete(schema.habitEntries).where(eq(schema.habitEntries.habitId, hid)).run();
    }
    // Delete the habits themselves
    db.delete(schema.habits).where(eq(schema.habits.userId, userId)).run();
  }
  // Delete the demo user (will be re-created)
  db.delete(schema.users).where(eq(schema.users.id, userId)).run();

  // Now insert fresh data
  const passwordHash = await bcrypt.hash('test1234', 10);
  db.insert(schema.users).values({ id: userId, username: 'demo', passwordHash }).run();

  const habits = [
    { id: 'habit-1', title: 'Read 20 pages', description: 'Daily reading habit', frequencyType: 'DAILY', userId },
    { id: 'habit-2', title: 'Exercise', description: 'Mon, Wed, Fri', frequencyType: 'WEEKLY', frequencyConfig: JSON.stringify({ days: ['MON', 'WED', 'FRI'] }), userId },
    { id: 'habit-3', title: 'Meditate', description: '10 minutes', frequencyType: 'DAILY', userId },
  ];
  for (const h of habits) db.insert(schema.habits).values(h).run();

  const now = new Date();
  const yesterday = new Date(now); yesterday.setDate(yesterday.getDate() - 1);
  db.insert(schema.habitEntries).values([
    { id: 'entry-1', habitId: 'habit-1', date: now, completed: true, completedAt: now },
    { id: 'entry-2', habitId: 'habit-1', date: yesterday, completed: true, completedAt: yesterday },
    { id: 'entry-3', habitId: 'habit-3', date: now, completed: false },
  ]).run();

  fs.writeFileSync(dbPath, Buffer.from(sqlDb.export()));
  console.log('✅ Seed complete (idempotent – can be run safely multiple times).');
}

seed().catch(console.error);