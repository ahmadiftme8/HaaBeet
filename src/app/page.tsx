'use client';

import { useRouter } from 'next/navigation';
import { Button, Card } from '@/components/ui';

const features = [
  {
    title: 'Daily & weekly habits',
    description: 'Set habits on a daily or weekly rhythm that fits your life.',
  },
  {
    title: 'Streak tracking',
    description: 'See your consistency build over time with visual streak calendars.',
  },
  {
    title: 'Simple, focused design',
    description: 'Stay on track without clutter — just the habits that matter.',
  },
] as const;

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-bg-app">
      <div className="mx-auto max-w-7xl px-4 py-xl md:px-6 lg:px-8">
        <section className="flex flex-col items-center py-lg text-center md:py-xl">
          <h1 className="text-heading-xl text-primary">HaaBeet</h1>
          <p className="mt-md text-body-md text-secondary">
            A simple habit tracker that helps you build routines and keep your streaks alive.
          </p>
          <div className="mt-lg flex w-full flex-col gap-sm sm:w-auto sm:flex-row sm:justify-center">
            <Button type="button" onClick={() => router.push('/login')}>
              Log in
            </Button>
            <Button type="button" onClick={() => router.push('/signup')}>
              Sign up
            </Button>
          </div>
        </section>

        <section className="pb-xl">
          <h2 className="text-center text-heading-lg text-primary">Why HaaBeet?</h2>
          <p className="mx-auto mt-sm max-w-2xl text-center text-body-md text-secondary">
            Everything you need to stay consistent, without the noise.
          </p>
          <div className="mt-lg grid grid-cols-1 gap-md md:grid-cols-3 md:gap-lg">
            {features.map((feature) => (
              <Card key={feature.title} bordered>
                <h3 className="text-heading-md text-primary">{feature.title}</h3>
                <p className="mt-sm text-body-md text-secondary">{feature.description}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
