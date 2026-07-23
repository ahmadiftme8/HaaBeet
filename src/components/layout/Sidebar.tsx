'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { LogOut } from 'lucide-react';

import { appNavItems, isNavItemActive } from '@/components/layout/nav-items';

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const displayName = session?.user?.name ?? session?.user?.email ?? 'User';
  const userInitial =
    (session?.user?.name ?? session?.user?.email ?? 'U')[0].toUpperCase();

  return (
    <aside
      className="fixed inset-y-0 left-0 z-40 flex w-60 shrink-0 flex-col bg-bg-inverse"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="px-md pt-lg pb-md">
        <Link
          href="/dashboard"
          className="inline-flex min-h-11 items-center gap-sm transition-base focus-ring"
          aria-label="HaaBeet dashboard"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-bg-surface text-body-sm font-bold text-text-primary shadow-card">
            H
          </span>
          <span className="text-heading-md text-text-inverse">HaaBeet</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-xs px-sm" aria-label="App">
        {appNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = isNavItemActive(pathname, item);

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`relative inline-flex min-h-11 items-center gap-sm rounded-full px-md py-sm text-body-sm font-medium transition-base focus-ring ${
                isActive
                  ? 'text-brand-primary'
                  : 'text-text-inverse/70 hover:text-text-inverse'
              }`}
            >
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-brand-primary-soft"
                />
              )}
              <Icon aria-hidden="true" className="relative size-5 shrink-0" />
              <span className="relative">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="mt-auto border-t border-text-inverse/10 px-md py-md">
        <div className="flex items-center gap-sm">
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-primary-soft text-body-sm font-semibold text-brand-primary"
          >
            {userInitial}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-body-sm font-medium text-text-inverse">
              {displayName}
            </p>
            <span className="mt-xs inline-flex rounded-full bg-text-inverse/10 px-sm py-0.5 text-body-sm text-text-inverse/80">
              Level 1
            </span>
          </div>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: '/' })}
            aria-label="Log out"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-sm text-text-inverse/60 transition-base hover:text-text-inverse focus-ring"
          >
            <LogOut aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
