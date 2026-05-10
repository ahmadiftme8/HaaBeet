'use client';
import {useQuery} from '@tanstack/react-query'
import {fetchHabits} from '../api/fetchHabits'

export interface Habit {
  id: string;
  title: string;
  description: string | null;
  frequencyType: string;
  frequencyConfig: any;
  isTemplate: boolean;
  isPublic: boolean;
  userId: string;
  createdAt: string;
}



export function useHabits() {
  return useQuery<Habit[]>({
    queryKey: ['habits'],   // unique key for this data
    queryFn: fetchHabits,   // function that returns the data
  });
}