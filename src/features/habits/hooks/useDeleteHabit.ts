'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteHabitResponse {
  deleted: boolean;
  id: string;
}

async function deleteHabit(id: string): Promise<DeleteHabitResponse> {
  const res = await fetch(`/api/habits/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to delete habit');
  }
  return res.json();
}

export function useDeleteHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteHabit,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      queryClient.invalidateQueries({ queryKey: ['habitEntries'] });
    },
  });
}
