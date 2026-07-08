'use client';

import { Button } from '@/components/ui';

import { useHabits } from '../hooks/useHabits';
import { HabitCard } from './HabitCard';
import { CreateHabitForm } from './CreateHabitForm';

function HabitsLoadingSkeleton() {
  return (
    <div className="space-y-md" aria-busy="true" aria-live="polite">
      <p className="text-center text-body-sm text-secondary">Loading habits…</p>
      <div className="grid grid-cols-1 gap-md md:grid-cols-2">
        {[0, 1].map((index) => (
          <div
            key={index}
            className="animate-pulse rounded-m border border-border-light bg-bg-surface p-lg shadow-sm"
            aria-hidden="true"
          >
            <div className="mb-sm h-[var(--heading-md)] w-2/5 rounded-sm bg-border-light" />
            <div className="mb-md h-[var(--body-sm)] w-4/5 rounded-sm bg-border-light" />
            <div className="h-[var(--body-sm)] w-1/3 rounded-sm bg-border-light" />
          </div>
        ))}
      </div>
    </div>
  );
}

function HabitsEmptyState({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="flex flex-col items-center gap-md py-xl text-center">
      <p className="text-heading-md text-secondary">No habits yet — create your first one</p>
      <Button onClick={onCreateClick}>Create habit</Button>
    </div>
  );
}

function HabitsErrorState({
  message,
  onRetry,
  isRetrying,
}: {
  message: string;
  onRetry: () => void;
  isRetrying: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-md py-xl text-center" role="alert">
      <p className="text-body-sm text-red-600">Couldn&apos;t load habits. {message}</p>
      <Button onClick={onRetry} disabled={isRetrying}>
        {isRetrying ? 'Retrying…' : 'Try again'}
      </Button>
    </div>
  );
}

export function HabitsList() {
  const { data: habits, isLoading, isPending, error, refetch, isFetching } = useHabits();
  const isLoadingHabits = isPending || isLoading;

  const scrollToCreateForm = () => {
    document.getElementById('create-habit-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    document.getElementById('habit-title')?.focus();
  };

  return (
    <div className="space-y-lg rounded-m bg-bg-app p-lg">
      <div id="create-habit-form">
        <CreateHabitForm />
      </div>

      {isLoadingHabits && <HabitsLoadingSkeleton />}

      {!isLoadingHabits && error && (
        <HabitsErrorState
          message={error.message}
          onRetry={() => refetch()}
          isRetrying={isFetching}
        />
      )}

      {!isLoadingHabits && !error && (!habits || habits.length === 0) && (
        <HabitsEmptyState onCreateClick={scrollToCreateForm} />
      )}

      {!isLoadingHabits && !error && habits && habits.length > 0 && (
        <div className="grid grid-cols-1 gap-md md:grid-cols-2">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
        </div>
      )}
    </div>
  );
}
