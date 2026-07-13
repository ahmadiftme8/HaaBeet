'use client';

import { Check, Circle, Lock, Pencil, Trash2 } from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';

import {
  Badge,
  Button,
  Card,
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
    ? 'bg-brand-orange text-brand-dark shadow-sm hover:brightness-105'
    : status.isToday
      ? ''
      : 'border border-border-light bg-bg-app text-secondary hover:bg-bg-app hover:brightness-100';

  return (
    <Card interactive className="flex flex-col gap-md">
      <div className="flex items-start justify-between gap-sm">
        <h3 className="min-w-0 flex-1 text-heading-md text-primary">{habit.title}</h3>
        <Badge color={frequencyColor(habit.frequencyType)} className="shrink-0">
          {formatFrequencyLabel(habit.frequencyType)}
        </Badge>
      </div>

      {habit.description && (
        <p className="truncate text-body-sm text-secondary">{habit.description}</p>
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
            onClick={handleEditOpen}
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
  );
}
