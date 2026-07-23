'use client';

import { Check, Circle, Lock, Pencil, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';

import {
  Badge,
  Button,
  Card,
  formatFrequencyLabel,
  frequencyColor,
} from '@/components/ui';

import { getDailyStatus, toDateKey } from '@/lib/habit-utils';

import { HabitFormModal } from './HabitFormModal';
import { StreakCalendar } from './StreakCalendar';

import useHabitEntries from '../hooks/useHabitEntries';
import { useCheckHabit } from '../hooks/useCheckHabit';
import { useDeleteHabit } from '../hooks/useDeleteHabit';

import type { Habit } from '../hooks/useHabits';

interface HabitCardProps {
  habit: Habit;
}

export function HabitCard({ habit }: HabitCardProps) {
  const { data: entries } = useHabitEntries();
  const checkMutation = useCheckHabit();
  const deleteMutation = useDeleteHabit();

  const [isEditing, setIsEditing] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayKey = toDateKey(today);

  const habitEntries = useMemo(() => {
    if (!entries) return [];

    return entries.filter((entry) => entry.habitId === habit.id);
  }, [entries, habit.id]);

  const completedSet = useMemo(
    () => new Set(habitEntries.filter((entry) => entry.completed).map((entry) => entry.date)),
    [habitEntries],
  );

  const frequencyConfig = useMemo(() => {
    if (!habit.frequencyConfig) return null;

    try {
      return JSON.parse(habit.frequencyConfig);
    } catch {
      return null;
    }
  }, [habit.frequencyConfig]);

  const status = getDailyStatus(today, habit.frequencyType as any, frequencyConfig, completedSet);

  const handleCheck = () => {
    if (!status.isToday) return;
    if (status.isCompleted) return;

    checkMutation.mutate({ habitId: habit.id, date: todayKey });
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${habit.title}"? This cannot be undone.`)) {
      deleteMutation.mutate(habit.id);
    }
  };

  const checkLabel = status.isCompleted
    ? 'Completed'
    : status.isToday
      ? 'Check in'
      : 'Not today';

  const checkIcon = status.isCompleted ? (
    <Check aria-hidden="true" className="size-4 shrink-0" />
  ) : status.isToday ? (
    <Circle aria-hidden="true" className="size-4 shrink-0" />
  ) : (
    <Lock aria-hidden="true" className="size-4 shrink-0" />
  );

  const checkClassName = status.isCompleted
    ? 'bg-accent-amber text-text-primary shadow-card hover:brightness-105'
    : status.isToday
      ? ''
      : 'border border-border-hairline bg-bg-app text-text-secondary hover:bg-bg-app hover:brightness-100';

  return (
    <>
      <Card interactive className="flex flex-col gap-md">
        <div className="flex items-start justify-between gap-sm">
          <h3 className="min-w-0 flex-1 text-heading-md text-text-primary">{habit.title}</h3>
          <Badge color={frequencyColor(habit.frequencyType)} className="shrink-0">
            {formatFrequencyLabel(habit.frequencyType)}
          </Badge>
        </div>

        {habit.description && (
          <p className="truncate text-body-sm text-text-secondary">{habit.description}</p>
        )}

        <StreakCalendar
          entries={habitEntries}
          colorScheme={frequencyColor(habit.frequencyType)}
        />

        <div className="flex flex-col gap-sm md:flex-row md:items-center md:justify-between">
          <Button
            type="button"
            variant="primary"
            className={`w-full md:w-auto ${checkClassName}`}
            onClick={handleCheck}
            disabled={!status.isToday || status.isCompleted || checkMutation.isPending}
            aria-label={checkLabel}
          >
            {checkIcon}
            {checkLabel}
          </Button>

          <div className="flex items-center justify-end gap-xs">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsEditing(true)}
              aria-label="Edit habit"
              className="min-h-11 min-w-11 px-0 md:min-h-0 md:min-w-0 md:px-sm"
            >
              <Pencil aria-hidden="true" className="size-4 shrink-0" />
              <span className="hidden md:inline">Edit</span>
            </Button>

            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              aria-label={deleteMutation.isPending ? 'Deleting habit' : 'Delete habit'}
              className="min-h-11 min-w-11 px-0 md:min-h-0 md:min-w-0 md:px-sm"
            >
              <Trash2 aria-hidden="true" className="size-4 shrink-0" />
              <span className="hidden md:inline">
                {deleteMutation.isPending ? 'Deleting…' : 'Delete'}
              </span>
            </Button>
          </div>
        </div>
      </Card>

      <HabitFormModal
        mode="edit"
        habit={habit}
        open={isEditing}
        onClose={() => setIsEditing(false)}
      />
    </>
  );
}
