'use client';

import { useEffect, useState, type FormEvent } from 'react';

import {
  Button,
  Input,
  Modal,
  RadioOption,
  Textarea,
  formatFrequencyLabel,
  frequencyColor,
} from '@/components/ui';

import { useCreateHabit } from '../hooks/useCreateHabit';
import { useUpdateHabit } from '../hooks/useUpdateHabit';

import type { Habit } from '../hooks/useHabits';

type CreateFrequency = 'DAILY' | 'WEEKLY';
type EditFrequency = 'DAILY' | 'WEEKLY' | 'CUSTOM';

type HabitFormModalProps =
  | {
      mode: 'create';
      open: boolean;
      onClose: () => void;
      habit?: never;
    }
  | {
      mode: 'edit';
      open: boolean;
      onClose: () => void;
      habit: Habit;
    };

function CreateHabitForm({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [frequencyType, setFrequencyType] = useState<CreateFrequency>('DAILY');
  const [titleError, setTitleError] = useState<string | null>(null);

  const createMutation = useCreateHabit();

  useEffect(() => {
    if (!open) return;
    setTitle('');
    setDescription('');
    setFrequencyType('DAILY');
    setTitleError(null);
  }, [open]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setTitleError('Title is required');
      return;
    }

    setTitleError(null);
    createMutation.mutate(
      {
        title: trimmedTitle,
        description: description.trim() || undefined,
        frequencyType,
      },
      {
        onSuccess: () => {
          setTitle('');
          setDescription('');
          setFrequencyType('DAILY');
          onClose();
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-md">
      <Input
        id="habit-title"
        label={
          <>
            Title <span aria-hidden="true">*</span>
          </>
        }
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (titleError) setTitleError(null);
        }}
        error={titleError ?? undefined}
      />

      <Textarea
        id="habit-description"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
      />

      <fieldset>
        <legend className="mb-xs block text-body-sm text-secondary">Frequency</legend>
        <div className="flex flex-wrap gap-sm">
          <RadioOption
            name="frequencyType"
            value="DAILY"
            color="blue"
            checked={frequencyType === 'DAILY'}
            onChange={() => setFrequencyType('DAILY')}
          >
            Daily
          </RadioOption>
          <RadioOption
            name="frequencyType"
            value="WEEKLY"
            color="purple"
            checked={frequencyType === 'WEEKLY'}
            onChange={() => setFrequencyType('WEEKLY')}
          >
            Weekly
          </RadioOption>
        </div>
      </fieldset>

      {createMutation.error && (
        <p className="text-body-sm text-brand-pink">{createMutation.error.message}</p>
      )}

      <Button type="submit" disabled={createMutation.isPending} className="w-full">
        {createMutation.isPending ? 'Creating…' : 'Create habit'}
      </Button>
    </form>
  );
}

function EditHabitForm({
  habit,
  open,
  onClose,
}: {
  habit: Habit;
  open: boolean;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(habit.title);
  const [description, setDescription] = useState(habit.description ?? '');
  const [frequencyType, setFrequencyType] = useState<EditFrequency>(
    habit.frequencyType as EditFrequency,
  );
  const [titleError, setTitleError] = useState<string | null>(null);

  const updateMutation = useUpdateHabit();

  useEffect(() => {
    if (!open) return;
    setTitle(habit.title);
    setDescription(habit.description ?? '');
    setFrequencyType(habit.frequencyType as EditFrequency);
    setTitleError(null);
  }, [open, habit.title, habit.description, habit.frequencyType]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
        frequencyType,
      },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-md">
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
        <legend className="mb-xs block text-body-sm text-secondary">Frequency</legend>
        <div className="flex flex-wrap gap-sm">
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

      <Button type="submit" disabled={updateMutation.isPending} className="w-full">
        {updateMutation.isPending ? 'Saving…' : 'Save'}
      </Button>
    </form>
  );
}

export function HabitFormModal(props: HabitFormModalProps) {
  const { mode, open, onClose } = props;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === 'create' ? 'Create habit' : 'Edit habit'}
    >
      {mode === 'create' ? (
        <CreateHabitForm open={open} onClose={onClose} />
      ) : (
        <EditHabitForm habit={props.habit} open={open} onClose={onClose} />
      )}
    </Modal>
  );
}
