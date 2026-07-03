'use client';

import { useMemo } from 'react';
import useHabitEntries from "../hooks/useHabitEntries";
import { useCheckHabit } from '../hooks/useCheckHabit';
import { getDailyStatus, calculateStreak, toDateKey } from '@/lib/habit-utils';
import type { Habit } from '../hooks/useHabits';

interface HabitCardProps {
  habit: Habit;
}

export function HabitCard({ habit }: HabitCardProps) {
  const { data: entries } = useHabitEntries();
  const checkMutation = useCheckHabit();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayKey = toDateKey(today);


  // Compute completed date strings from entries belonging to this habit
  const completedDates = useMemo(() => {
    if (!entries) return [];
    return entries
      .filter((e) => e.habitId === habit.id && e.completed)
      .map((e) => e.date);
  }, [entries, habit.id]);

  const completedSet = useMemo(() => new Set(completedDates), [completedDates]);

  // Parse frequencyConfig if it exists
  const frequencyConfig = useMemo(() => {
    if (!habit.frequencyConfig) return null;
    try {
      return JSON.parse(habit.frequencyConfig);
    } catch {
      return null;
    }
  }, [habit.frequencyConfig]);

  const status = getDailyStatus(today, habit.frequencyType as any, frequencyConfig, completedSet);
  const streak = calculateStreak(completedDates, todayKey);

  const handleCheck = () => {
    if (!status.isToday) return;
    if (status.isCompleted) return; // or allow toggle off in the future

    checkMutation.mutate({ habitId: habit.id, date: todayKey });
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
      <div>
        <h3 className="font-medium">{habit.title}</h3>
        <p className="text-sm text-slate-500">
          {status.isToday ? 'Today' : 'Not today'} · Streak: {streak}🔥
        </p>
      </div>
      <button
        onClick={handleCheck}
        disabled={!status.isToday || status.isCompleted || checkMutation.isPending}
        className="text-2xl disabled:opacity-50"
      >
        {status.isCompleted ? '✅' : status.isToday ? '⭕' : '🔒'}
      </button>
    </div>
  );
}