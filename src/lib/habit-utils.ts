

/**
 * Converts a Date to a YYYY-MM-DD string.
 */
export function toDateKey(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Returns the day abbreviation (MON, TUE, ...) in uppercase.
 */
export function getDayName(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
}

/**
 * Checks if a habit is due today and whether it's already completed.
 *
 * @param today - The current date (should be set to midnight)
 * @param frequencyType - 'DAILY', 'WEEKLY', or 'CUSTOM'
 * @param config - For WEEKLY: { days: ['MON','WED'] } – parsed object
 * @param completedDateKeys - Set of YYYY-MM-DD strings that are completed
 */
export function getDailyStatus(
  today: Date,
  frequencyType: 'DAILY' | 'WEEKLY' | 'CUSTOM',
  config: { days?: string[] } | null,
  completedDateKeys: Set<string>
): { isToday: boolean; isCompleted: boolean } {
  const todayKey = toDateKey(today);
  const dayName = getDayName(today);

  let isToday = false;

  switch (frequencyType) {
    case 'DAILY':
      isToday = true;
      break;
    case 'WEEKLY':
      if (config?.days && config.days.includes(dayName)) {
        isToday = true;
      }
      break;
    // CUSTOM left for later
  }

  return {
    isToday,
    isCompleted: completedDateKeys.has(todayKey),
  };
}

/**
 * Calculates the current streak of consecutive days (including today).
 *
 * @param completedDates - array of YYYY-MM-DD strings, any order, duplicates ok.
 * @param todayKey - YYY-MM-DD of today (optional, to consider today)
 */
export function calculateStreak(completedDates: string[], todayKey: string): number {
  // If today is not completed, streak might be broken already
  const uniqueDates = [...new Set(completedDates)].sort();
  if (uniqueDates.length === 0) return 0;

  // Start from the most recent date
  let streak = 1;
  let currentDate = new Date(uniqueDates[uniqueDates.length - 1]);

  // If the most recent date is not today or yesterday, streak is 0
  const diffFromToday = Math.round(
    (new Date(todayKey).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diffFromToday > 1) return 0;

  // Count backwards
  for (let i = uniqueDates.length - 2; i >= 0; i--) {
    const prevDate = new Date(uniqueDates[i]);
    const diff = Math.round(
      (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diff === 1) {
      streak++;
      currentDate = prevDate;
    } else {
      break;
    }
  }
  return streak;
}