// src/app/api/habits/entries/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';

const DEMO_USER_ID = 'user-1'; // same as in habits route

export async function GET() {
  try {
    // Fetch all entries for habits belonging to the demo user
    const entries = await db
      .select({
        id: schema.habitEntries.id,
        habitId: schema.habitEntries.habitId,
        date: schema.habitEntries.date,
        completed: schema.habitEntries.completed,
        completedAt: schema.habitEntries.completedAt,
      })
      .from(schema.habitEntries)
      .innerJoin(schema.habits, eq(schema.habitEntries.habitId, schema.habits.id))
      .where(eq(schema.habits.userId, DEMO_USER_ID));

    // Convert dates to YYYY-MM-DD strings for easy consumption
    const formatted = entries.map((e) => ({
      ...e,
      date: e.date instanceof Date ? e.date.toISOString().split('T')[0] : e.date,
      completedAt: e.completedAt ? (e.completedAt instanceof Date ? e.completedAt.toISOString() : e.completedAt) : null,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('GET /api/habits/entries error:', error);
    return NextResponse.json({ error: 'Failed to fetch entries' }, { status: 500 });
  }
}