'use client';

import { Button } from '@/components/ui';

import { useHabits } from '../hooks/useHabits';
import { HabitCard } from './HabitCard';

function HabitsLoadingSkeleton() {
  return (
    <div className="space-y-md" aria-busy="true" aria-live="polite">
      <p className="text-center text-body-sm text-text-secondary">Loading habits…</p>
      <div className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-3">
        {[0, 1].map((index) => (
          <div
            key={index}
            className="animate-pulse rounded-lg border border-border-hairline bg-bg-surface p-md shadow-card md:p-lg"
            aria-hidden="true"
          >
            <div className="mb-sm h-[var(--heading-md)] w-2/5 rounded-sm bg-border-hairline" />
            <div className="mb-md h-[var(--body-sm)] w-4/5 rounded-sm bg-border-hairline" />
            <div className="h-[var(--body-sm)] w-1/3 rounded-sm bg-border-hairline" />
          </div>
        ))}
      </div>
    </div>
  );
}

function HabitsEmptyState({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="flex flex-col items-center gap-md py-lg text-center md:py-xl">
      <p className="text-heading-md text-text-secondary">No habits yet — create your first one</p>
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
    <div className="flex flex-col items-center gap-md py-lg text-center md:py-xl" role="alert">
      <p className="text-body-sm text-red-600">Couldn&apos;t load habits. {message}</p>
      <Button onClick={onRetry} disabled={isRetrying}>
        {isRetrying ? 'Retrying…' : 'Try again'}
      </Button>
    </div>
  );
}

interface HabitsListProps {
  onCreateClick: () => void;
}

export function HabitsList({ onCreateClick }: HabitsListProps) {
  const { data: habits, isLoading, isPending, error, refetch, isFetching } = useHabits();
  const isLoadingHabits = isPending || isLoading;

  return (
    <div className="space-y-md rounded-lg bg-bg-app p-md md:space-y-lg md:p-lg">
      {isLoadingHabits && <HabitsLoadingSkeleton />}

      {!isLoadingHabits && error && (
        <HabitsErrorState
          message={error.message}
          onRetry={() => refetch()}
          isRetrying={isFetching}
        />
      )}

      {!isLoadingHabits && !error && (!habits || habits.length === 0) && (
        <HabitsEmptyState onCreateClick={onCreateClick} />
      )}

      {!isLoadingHabits && !error && habits && habits.length > 0 && (
        <div className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-3">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
        </div>
      )}
    </div>
  );
}
