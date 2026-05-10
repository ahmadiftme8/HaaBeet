'use client';

import { useHabits } from '../hooks/useHabits';
import { HabitCard } from './HabitCard';

export function HabitsList() {
  const { data: habits, isLoading, error } = useHabits();

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!habits || habits.length === 0) return <p>No habits found.</p>;

  return (
    <div className="space-y-3">
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  );
}