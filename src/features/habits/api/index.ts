import { NextResponse } from 'next/server';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

// For now, still use the demo user
const DEMO_USER_ID = 'user-1';

// Validation schema for creating a habit
const createHabitSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  frequencyType: z.enum(['DAILY', 'WEEKLY', 'CUSTOM']).default('DAILY'),
  frequencyConfig: z.any().optional(),
});

export async function GET() {
  try {
    const habits = await db
      .select()
      .from(schema.habits)
      .where(eq(schema.habits.userId, DEMO_USER_ID));
    return NextResponse.json(habits);
  } catch (error) {
    console.error('GET /api/habits error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createHabitSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { title, description, frequencyType, frequencyConfig } = parsed.data;

    const newHabit = await db.insert(schema.habits).values({
      id: crypto.randomUUID(),
      title,
      description: description || null,
      frequencyType,
      frequencyConfig: frequencyConfig || null,
      userId: DEMO_USER_ID,
    }).returning();

    return NextResponse.json(newHabit, { status: 201 });
  } catch (error) {
    console.error('POST /api/habits error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}