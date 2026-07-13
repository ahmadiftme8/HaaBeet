import { describe, expect, it } from 'vitest';

import {
  calculateStreak,
  getDailyStatus,
  getDayName,
  toDateKey,
} from './habit-utils';

/** Local calendar date at midnight (matches HabitCard / StreakCalendar usage). */
function localMidnight(year: number, monthIndex: number, day: number): Date {
  const date = new Date(year, monthIndex, day);
  date.setHours(0, 0, 0, 0);
  return date;
}

describe('calculateStreak', () => {
  it('returns the correct count for consecutive completed days ending today', () => {
    // 7-day morning run streak: Mon Jul 6 → Sun Jul 12, ending today Mon Jul 13
    const completedDates = [
      '2026-07-06',
      '2026-07-07',
      '2026-07-08',
      '2026-07-09',
      '2026-07-10',
      '2026-07-11',
      '2026-07-12',
      '2026-07-13',
    ];

    expect(calculateStreak(completedDates, '2026-07-13')).toBe(8);
  });

  it('returns the correct count when today is not yet completed but yesterday is', () => {
    // User completed Sat–Sun; today (Mon) not checked yet — streak should still count
    const completedDates = ['2026-07-11', '2026-07-12'];

    expect(calculateStreak(completedDates, '2026-07-13')).toBe(2);
  });

  it('resets the streak when there is a gap / missed day before the latest completion', () => {
    // Missed Jul 10; completed Jul 11–13 → streak is only the last 3 consecutive days
    const completedDates = [
      '2026-07-06',
      '2026-07-07',
      '2026-07-08',
      '2026-07-09',
      // gap on 2026-07-10
      '2026-07-11',
      '2026-07-12',
      '2026-07-13',
    ];

    expect(calculateStreak(completedDates, '2026-07-13')).toBe(3);
  });

  it('returns 0 when the most recent completion is more than one day before today', () => {
    // Last check-in was Jul 10; today is Jul 13 — streak broken by the gap
    const completedDates = ['2026-07-08', '2026-07-09', '2026-07-10'];

    expect(calculateStreak(completedDates, '2026-07-13')).toBe(0);
  });

  it('returns 0 when there are zero completions', () => {
    expect(calculateStreak([], '2026-07-13')).toBe(0);
  });

  it('ignores duplicate date keys when counting the streak', () => {
    const completedDates = [
      '2026-07-11',
      '2026-07-11',
      '2026-07-12',
      '2026-07-12',
      '2026-07-13',
      '2026-07-13',
    ];

    expect(calculateStreak(completedDates, '2026-07-13')).toBe(3);
  });

  it('handles unsorted completion dates', () => {
    const completedDates = ['2026-07-13', '2026-07-11', '2026-07-12'];

    expect(calculateStreak(completedDates, '2026-07-13')).toBe(3);
  });
});

describe('getDailyStatus — is due today', () => {
  // Jul 13, 2026 is a Monday
  const monday = localMidnight(2026, 6, 13);
  // Jul 15, 2026 is a Wednesday
  const wednesday = localMidnight(2026, 6, 15);

  it('marks daily habits as always due today', () => {
    const emptyCompletions = new Set<string>();

    expect(getDailyStatus(monday, 'DAILY', null, emptyCompletions).isToday).toBe(true);
    expect(getDailyStatus(wednesday, 'DAILY', { days: ['FRI'] }, emptyCompletions).isToday).toBe(
      true,
    );
  });

  it('marks weekly habits as due only on their configured days', () => {
    const emptyCompletions = new Set<string>();
    const monWedFri = { days: ['MON', 'WED', 'FRI'] };

    expect(getDailyStatus(monday, 'WEEKLY', monWedFri, emptyCompletions).isToday).toBe(true);
    expect(getDailyStatus(wednesday, 'WEEKLY', monWedFri, emptyCompletions).isToday).toBe(true);

    // Tuesday Jul 14 is not in MON/WED/FRI
    const tuesday = localMidnight(2026, 6, 14);
    expect(getDailyStatus(tuesday, 'WEEKLY', monWedFri, emptyCompletions).isToday).toBe(false);
  });

  it('does not mark a weekly habit as due when config has no matching days', () => {
    const emptyCompletions = new Set<string>();
    const weekendsOnly = { days: ['SAT', 'SUN'] };

    expect(getDailyStatus(monday, 'WEEKLY', weekendsOnly, emptyCompletions).isToday).toBe(false);
  });

  it('does not mark a weekly habit as due when config is missing', () => {
    const emptyCompletions = new Set<string>();

    expect(getDailyStatus(monday, 'WEEKLY', null, emptyCompletions).isToday).toBe(false);
    expect(getDailyStatus(monday, 'WEEKLY', {}, emptyCompletions).isToday).toBe(false);
  });

  it('reports isCompleted from the completed date-key set for today', () => {
    const mondayKey = toDateKey(monday);
    const completed = new Set([mondayKey, '2026-07-12']);

    expect(getDailyStatus(monday, 'DAILY', null, completed).isCompleted).toBe(true);
    expect(getDailyStatus(wednesday, 'DAILY', null, completed).isCompleted).toBe(false);
  });
});

describe('toDateKey', () => {
  it('returns a consistent YYYY-MM-DD key for the same date', () => {
    const noonUtc = new Date('2026-07-13T12:00:00.000Z');

    expect(toDateKey(noonUtc)).toBe('2026-07-13');
    expect(toDateKey(noonUtc)).toBe(toDateKey(new Date(noonUtc.getTime())));
  });

  it('formats mid-day timestamps as the local calendar day', () => {
    // Midday UTC maps to the same local date in UTC+3:30 (and most common offsets)
    expect(toDateKey(new Date('2026-01-01T12:00:00.000Z'))).toBe('2026-01-01');
    expect(toDateKey(new Date('2026-12-31T12:00:00.000Z'))).toBe('2026-12-31');
  });

  it('matches the local calendar day for local midnight (how callers build "today")', () => {
    // HabitCard / StreakCalendar: new Date(); setHours(0,0,0,0); toDateKey(today)
    const localToday = localMidnight(2026, 6, 13);
    const year = localToday.getFullYear();
    const month = String(localToday.getMonth() + 1).padStart(2, '0');
    const day = String(localToday.getDate()).padStart(2, '0');
    const expectedLocalKey = `${year}-${month}-${day}`;

    expect(toDateKey(localToday)).toBe(expectedLocalKey);
  });
});

describe('getDayName', () => {
  it('returns uppercase short weekday names used by weekly frequency config', () => {
    expect(getDayName(localMidnight(2026, 6, 13))).toBe('MON'); // Jul 13, 2026
    expect(getDayName(localMidnight(2026, 6, 14))).toBe('TUE');
    expect(getDayName(localMidnight(2026, 6, 15))).toBe('WED');
  });
});
