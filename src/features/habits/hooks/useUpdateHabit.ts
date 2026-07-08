'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Habit } from './useHabits';

interface UpdateHabitPayload {
  id: string;
  title?: string;
  description?: string | null;
  frequencyType?: 'DAILY' | 'WEEKLY' | 'CUSTOM';
}

async function updateHabit({
  id,
  ...payload
}: UpdateHabitPayload): Promise<Habit> {
  const res = await fetch(`/api/habits/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to update habit');
  }
  return res.json();
}

export function useUpdateHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateHabit,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });
}
