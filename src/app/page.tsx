import {HabitsList} from '@/features/habits/components/HabitList'

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-brand">HaaBeet 🐝</h1>
      <p>Your gamified habit tracker is coming to life.</p>
      <HabitsList/>
    </main>
  );
}