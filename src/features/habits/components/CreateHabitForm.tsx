'use client';

import { useState, type FormEvent } from 'react';

import {
  Button,
  Card,
  Input,
  RadioOption,
  Textarea,
} from '@/components/ui';

import { useCreateHabit } from '../hooks/useCreateHabit';

export function CreateHabitForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [frequencyType, setFrequencyType] = useState<'DAILY' | 'WEEKLY'>('DAILY');
  const [titleError, setTitleError] = useState<string | null>(null);

  const createMutation = useCreateHabit();

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
        },
      },
    );
  };

  return (
    <div className="mx-auto w-full max-w-form">
      <Card bordered className="w-full">
        <form onSubmit={handleSubmit} className="space-y-md">
          <h2 className="text-heading-md text-primary">Create habit</h2>

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

          <Button type="submit" disabled={createMutation.isPending}>
            {createMutation.isPending ? 'Creating…' : 'Create habit'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
