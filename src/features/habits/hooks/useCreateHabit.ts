'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Habit } from './useHabits';

interface CreateHabitPayload {
  title: string;
  description?: string;
  frequencyType: 'DAILY' | 'WEEKLY';
}

async function createHabit(payload: CreateHabitPayload): Promise<Habit> {
  const res = await fetch('/api/habits', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to create habit');
  }
  return res.json();
}

export function useCreateHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createHabit,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });
}
