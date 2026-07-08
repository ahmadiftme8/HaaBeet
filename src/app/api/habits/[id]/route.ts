// src/app/api/habits/[id]/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { auth } from '@/lib/auth';

const UpdateHabitSchema = z
  .object({
    title: z
      .string()
      .min(1, 'Title is required')
      .max(100, 'Title must be less than 100 characters'),
    description: z.string().optional().nullable(),
    frequencyType: z.enum(['DAILY', 'WEEKLY', 'CUSTOM']),
  })
  .partial();

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const body = await request.json();
    const parsed = UpdateHabitSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const [habit] = await db
      .select()
      .from(schema.habits)
      .where(eq(schema.habits.id, id))
      .limit(1);

    if (!habit || habit.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const updates: Partial<{
      title: string;
      description: string | null;
      frequencyType: 'DAILY' | 'WEEKLY' | 'CUSTOM';
    }> = {};

    if (parsed.data.title !== undefined) {
      updates.title = parsed.data.title;
    }
    if (parsed.data.description !== undefined) {
      updates.description = parsed.data.description ?? null;
    }
    if (parsed.data.frequencyType !== undefined) {
      updates.frequencyType = parsed.data.frequencyType;
    }

    if (Object.keys(updates).length > 0) {
      await db
        .update(schema.habits)
        .set(updates)
        .where(eq(schema.habits.id, id));
    }

    const [updatedHabit] = await db
      .select()
      .from(schema.habits)
      .where(eq(schema.habits.id, id))
      .limit(1);

    return NextResponse.json(updatedHabit);
  } catch (error) {
    console.error('PATCH /api/habits/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update habit' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const [habit] = await db
      .select({ userId: schema.habits.userId })
      .from(schema.habits)
      .where(eq(schema.habits.id, id))
      .limit(1);

    if (!habit || habit.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await db
      .delete(schema.habitEntries)
      .where(eq(schema.habitEntries.habitId, id));

    await db.delete(schema.habits).where(eq(schema.habits.id, id));

    return NextResponse.json({ deleted: true, id });
  } catch (error) {
    console.error('DELETE /api/habits/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete habit' }, { status: 500 });
  }
}
