'use client';

import { useMemo } from 'react';

import { GridSquare, type GridSquareColorScheme } from '@/components/ui/GridSquare';
import { calculateStreak, toDateKey } from '@/lib/habit-utils';

import type { HabitEntry } from '../hooks/useHabitEntries';

interface StreakCalendarProps {
  entries: HabitEntry[];
  days?: number;
  colorScheme: GridSquareColorScheme;
}

function getLastNDayKeys(days: number, today: Date): string[] {
  const keys: string[] = [];

  for (let offset = days - 1; offset >= 0; offset--) {
    const date = new Date(today);
    date.setDate(date.getDate() - offset);
    keys.push(toDateKey(date));
  }

  return keys;
}

export function StreakCalendar({ entries, days = 7, colorScheme }: StreakCalendarProps) {
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const todayKey = toDateKey(today);

  const completedDates = useMemo(
    () => entries.filter((entry) => entry.completed).map((entry) => entry.date),
    [entries],
  );

  const completedSet = useMemo(() => new Set(completedDates), [completedDates]);

  const dayKeys = useMemo(() => getLastNDayKeys(days, today), [days, today]);

  const streak = calculateStreak(completedDates, todayKey);

  return (
    <div className="flex min-w-0 items-center gap-xs sm:gap-sm">
      <div className="flex shrink gap-xs">
        {dayKeys.map((dateKey) => (
          <GridSquare
            key={dateKey}
            filled={completedSet.has(dateKey)}
            colorScheme={colorScheme}
            size="sm"
          />
        ))}
      </div>
      <span className="shrink-0 text-body-md text-text-primary sm:text-heading-md">{streak}</span>
    </div>
  );
}
