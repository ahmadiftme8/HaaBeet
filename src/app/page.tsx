'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CalendarDays, Flame, Sparkles } from 'lucide-react';
import { Button, Card } from '@/components/ui';

const features = [
  {
    icon: CalendarDays,
    title: 'Daily & weekly habits',
    description: 'Set habits on a daily or weekly rhythm that fits your life.',
  },
  {
    icon: Flame,
    title: 'Streak tracking',
    description: 'See your consistency build over time with visual streak calendars.',
  },
  {
    icon: Sparkles,
    title: 'Simple, focused design',
    description: 'Stay on track without clutter — just the habits that matter.',
  },
] as const;

const navLinkClass =
  'inline-flex min-h-11 items-center rounded-sm px-sm text-body-sm text-secondary transition-base hover:text-primary focus-ring';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-bg-app">
      {/* Sticky header */}
      <header className="sticky top-0 z-50 border-b border-border-light bg-bg-surface/95 shadow-sm backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:h-16 md:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-sm transition-base focus-ring"
            aria-label="HaaBeet home"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-brand-dark text-body-sm text-white shadow-sm">
              H
            </span>
            <span className="hidden text-heading-md text-primary sm:inline">
              HaaBeet
            </span>
          </Link>

          <nav className="flex items-center gap-xs sm:gap-sm" aria-label="Account">
            <Link href="/login" className={navLinkClass}>
              Log in
            </Link>
            <Button
              type="button"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => router.push('/signup')}
            >
              Sign up
            </Button>
            <Button
              type="button"
              size="sm"
              className="sm:hidden"
              onClick={() => router.push('/signup')}
            >
              Join
            </Button>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="flex min-h-[calc(100dvh-3.5rem)] flex-col justify-center px-4 py-xl md:min-h-[calc(100dvh-4rem)] md:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-3xl text-center">
            <h1 className="text-heading-xl text-primary md:text-[2.5rem]">
              Build habits that stick
            </h1>
            <p className=" text-body-md text-secondary md:mt-lg md:text-[1.125rem]">
              HaaBeet is a simple habit tracker that helps you build routines,
              keep your streaks alive, and stay consistent without the noise.
            </p>
            <div className="mt-lg flex w-full flex-col gap-sm sm:mx-auto sm:max-w-sm sm:flex-row sm:justify-center md:mt-xl">
              <Button
                type="button"
                className="w-auto whitespace-nowrap sm:w-auto"
                onClick={() => router.push('/signup')}
              >
                Get started free
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="w-full whitespace-nowrap sm:w-auto"
                onClick={() => router.push('/login')}
              >
                Log in
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 pb-xl md:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-heading-lg text-primary">Why HaaBeet?</h2>
              <p className="mx-auto mt-sm max-w-2xl text-body-md text-secondary">
                Everything you need to stay consistent, without the noise.
              </p>
            </div>

            <div className="mt-lg grid grid-cols-1 gap-md md:mt-xl md:grid-cols-3 md:gap-lg">
              {features.map(({ icon: Icon, title, description }) => (
                <Card key={title} bordered interactive>
                  <div className="flex size-11 items-center justify-center rounded-sm bg-brand-blue/30 text-primary transition-base">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-md text-heading-md text-primary">{title}</h3>
                  <p className="mt-sm text-body-sm text-secondary md:text-body-md">
                    {description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="bg-brand-dark px-4 py-xl md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-heading-lg text-white">
              Ready to start your streak?
            </h2>
            <p className="mx-auto mt-sm min-w-xl text-body-sm text-white/80 md:text-body-md">
              Create your first habit in seconds. No credit card, no clutter —
              just a cleaner way to build routines.
            </p>
            <Button
              type="button"
              variant="secondary"
              className="mt-lg border-white/20 bg-white text-brand-dark transition-base hover:bg-white/90 hover:brightness-100 md:mt-xl"
              onClick={() => router.push('/signup')}
            >
              Create free account
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-light bg-bg-surface px-4 py-lg md:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-sm text-body-xs text-secondary sm:flex-row">
          <p>&copy; {new Date().getFullYear()} HaaBeet</p>
          <div className="flex items-center gap-md">
            <Link href="/login" className={`${navLinkClass} min-h-0 px-0 py-0 text-body-xs`}>
              Log in
            </Link>
            <Link href="/signup" className={`${navLinkClass} min-h-0 px-0 py-0 text-body-xs`}>
              Sign up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
