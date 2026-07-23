'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui';
import { HabitFormModal } from '@/features/habits/components/HabitFormModal';
import { HabitsList } from '@/features/habits/components/HabitList';

function formatTodayLabel() {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date());
}

export default function DashboardPage() {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <main className="mx-auto max-w-7xl px-4 pb-28 pt-6 md:px-6 md:pb-10 lg:px-8">
      {/* Page heading area */}
      <div className="flex items-start justify-between gap-md">
        <div>
          <h1 className="text-heading-lg text-text-primary">Your Habits</h1>
          <p className="mt-1 text-body-sm text-text-secondary">{formatTodayLabel()}</p>
        </div>

        {/* Desktop-only inline button */}
        <Button
          type="button"
          size="sm"
          onClick={() => setCreateOpen(true)}
          aria-label="Create a new habit"
          className="hidden shrink-0 sm:inline-flex"
        >
          <Plus aria-hidden="true" className="size-4" />
          New Habit
        </Button>
      </div>

      {/* Habit grid — HabitCard and grid layout handled in HabitsList */}
      <div className="mt-6">
        <HabitsList onCreateClick={() => setCreateOpen(true)} />
      </div>

      {/* Mobile FAB — fixed bottom-right, hidden on sm+ */}
      <button
        type="button"
        onClick={() => setCreateOpen(true)}
        aria-label="Create a new habit"
        className="fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full bg-brand-primary text-text-inverse shadow-raised transition-base hover:scale-105 hover:brightness-110 active:scale-95 focus-ring sm:hidden"
      >
        <Plus aria-hidden="true" className="size-6" />
      </button>

      <HabitFormModal
        mode="create"
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </main>
  );
}
