import { HabitsList } from '@/features/habits/components/HabitList';

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-brand md:text-3xl">HaaBeet 🐝</h1>
      <p className="mt-1 text-body-sm text-secondary md:mt-2 md:text-body-md">
        Gamified habit tracker is coming to life.
      </p>
      <div className="mt-4 md:mt-6">
        <HabitsList />
      </div>
    </main>
  );
}
