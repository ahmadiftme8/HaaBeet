'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HabitEntry } from './useHabitEntries';

interface CheckPayload {
  habitId: string;
  date: string; // YYYY-MM-DD
}

async function checkHabit(payload: CheckPayload): Promise<HabitEntry> {
  const res = await fetch('/api/habits/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to check habit');
  }
  return res.json();
}

export function useCheckHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkHabit,
    // When mutate is called:
    onMutate: async (newEntry) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['habitEntries'] });

      // Snapshot the previous value
      const previousEntries = queryClient.getQueryData<HabitEntry[]>(['habitEntries']);

      // Optimistically add the new entry to the cache
      if (previousEntries) {
        queryClient.setQueryData<HabitEntry[]>(['habitEntries'], [
          ...previousEntries,
          {
            id: 'temp-' + Date.now(),
            habitId: newEntry.habitId,
            date: newEntry.date,
            completed: true,
            completedAt: new Date().toISOString(),
          },
        ]);
      }

      // Return context object with the snapshot
      return { previousEntries };
    },
    // If the mutation fails, roll back
    onError: (err, newEntry, context) => {
      if (context?.previousEntries) {
        queryClient.setQueryData(['habitEntries'], context.previousEntries);
      }
    },
    // After success or error, invalidate the relevant queries to refetch fresh data
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['habitEntries'] });
      // Also invalidate habits if needed (streak might change, but we can recalc client-side)
    },
  });
}