import { NextResponse } from 'next/server';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { z } from 'zod';

const checkSchema = z.object({
  habitId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = checkSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { habitId, date } = parsed.data;

    // Check if an entry already exists for this habit and date
    const existing = await db
      .select()
      .from(schema.habitEntries)
      .where(
        and(
          eq(schema.habitEntries.habitId, habitId),
          eq(schema.habitEntries.date, new Date(date))
        )
      )
      .limit(1);

    if (existing.length > 0) {
      // Already completed – maybe we want to toggle it off? For now, just return conflict.
      return NextResponse.json({ error: 'Already completed today' }, { status: 409 });
    }

    const newEntry = {
      id: crypto.randomUUID(),
      habitId,
      date: new Date(date),
      completed: true,
      completedAt: new Date(),
    };

    await db.insert(schema.habitEntries).values(newEntry);

    return NextResponse.json({ ...newEntry, date }, { status: 201 });
  } catch (error) {
    console.error('POST /api/habits/check error:', error);
    return NextResponse.json({ error: 'Failed to check habit' }, { status: 500 });
  }
}