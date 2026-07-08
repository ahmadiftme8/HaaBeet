'use client';

import { useMemo, useState, type FormEvent } from 'react';

import {
  Badge,
  Button,
  Card,
  CheckButton,
  Input,
  RadioOption,
  Textarea,
  formatFrequencyLabel,
  frequencyColor,
} from '@/components/ui';

import { getDailyStatus, toDateKey } from '@/lib/habit-utils';

import { StreakCalendar } from './StreakCalendar';

import useHabitEntries from '../hooks/useHabitEntries';
import { useCheckHabit } from '../hooks/useCheckHabit';
import { useDeleteHabit } from '../hooks/useDeleteHabit';
import { useUpdateHabit } from '../hooks/useUpdateHabit';

import type { Habit } from '../hooks/useHabits';

interface HabitCardProps {
  habit: Habit;
}

export function HabitCard({ habit }: HabitCardProps) {
  const { data: entries } = useHabitEntries();
  const checkMutation = useCheckHabit();
  const updateMutation = useUpdateHabit();
  const deleteMutation = useDeleteHabit();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(habit.title);
  const [description, setDescription] = useState(habit.description ?? '');
  const [frequencyType, setFrequencyType] = useState(habit.frequencyType);
  const [titleError, setTitleError] = useState<string | null>(null);

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

  const handleEditOpen = () => {
    setTitle(habit.title);
    setDescription(habit.description ?? '');
    setFrequencyType(habit.frequencyType);
    setTitleError(null);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setTitleError(null);
  };

  const handleEditSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setTitleError('Title is required');
      return;
    }

    setTitleError(null);

    updateMutation.mutate(
      {
        id: habit.id,
        title: trimmedTitle,
        description: description.trim() || null,
        frequencyType: frequencyType as 'DAILY' | 'WEEKLY' | 'CUSTOM',
      },
      {
        onSuccess: () => setIsEditing(false),
      },
    );
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${habit.title}"? This cannot be undone.`)) {
      deleteMutation.mutate(habit.id);
    }
  };

  if (isEditing) {
    return (
      <Card bordered>
        <form onSubmit={handleEditSubmit} className="flex w-full flex-col gap-md">
          <Input
            id={`edit-title-${habit.id}`}
            label="Title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (titleError) setTitleError(null);
            }}
            error={titleError ?? undefined}
          />

          <Textarea
            id={`edit-description-${habit.id}`}
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
          />

          <fieldset>
            <legend className="block text-body-sm text-secondary">Frequency</legend>
            <div className="mt-xs flex flex-wrap gap-sm">
              {(['DAILY', 'WEEKLY', 'CUSTOM'] as const).map((value) => (
                <RadioOption
                  key={value}
                  name={`frequencyType-${habit.id}`}
                  value={value}
                  color={frequencyColor(value)}
                  checked={frequencyType === value}
                  onChange={() => setFrequencyType(value)}
                >
                  {formatFrequencyLabel(value)}
                </RadioOption>
              ))}
            </div>
          </fieldset>

          {updateMutation.error && (
            <p className="text-body-sm text-brand-pink">{updateMutation.error.message}</p>
          )}

          <div className="flex flex-wrap gap-sm">
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? 'Saving…' : 'Save'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleEditCancel}
              disabled={updateMutation.isPending}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col gap-md transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-1 flex-col gap-xs">
        <h3 className="break-words text-heading-md text-primary">{habit.title}</h3>

        <Badge color={frequencyColor(habit.frequencyType)}>
          {formatFrequencyLabel(habit.frequencyType)}
        </Badge>

        {habit.description && (
          <p className="break-words text-body-sm text-secondary">{habit.description}</p>
        )}

        <p className="text-body-sm text-secondary">
          {status.isToday ? 'Today' : 'Not today'}
        </p>

        <StreakCalendar
          entries={habitEntries}
          colorScheme={frequencyColor(habit.frequencyType)}
        />
      </div>

      <div className="flex shrink-0 flex-wrap items-center justify-end gap-xs sm:justify-start sm:gap-sm">
        <Button type="button" variant="secondary" size="sm" onClick={handleEditOpen}>
          Edit
        </Button>

        <Button
          type="button"
          variant="danger"
          size="sm"
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? 'Deleting…' : 'Delete'}
        </Button>

        <CheckButton
          isCompleted={status.isCompleted}
          isToday={status.isToday}
          onClick={handleCheck}
          disabled={!status.isToday || status.isCompleted || checkMutation.isPending}
        >
          {status.isCompleted ? '✅' : status.isToday ? '⭕' : '🔒'}
        </CheckButton>
      </div>
    </Card>
  );
}
