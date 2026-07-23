'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { appNavItems, isNavItemActive } from '@/components/layout/nav-items';

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border-hairline bg-bg-surface/95 pb-[env(safe-area-inset-bottom)] shadow-raised backdrop-blur-sm"
      aria-label="Mobile navigation"
    >
      <ul className="flex h-16 items-stretch justify-around px-xs">
        {appNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = isNavItemActive(pathname, item);
          const isNewHabit = item.label === 'New Habit';

          return (
            <li key={item.label} className="flex flex-1">
              <Link
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex flex-1 flex-col items-center justify-center gap-0.5 transition-base focus-ring ${
                  isNewHabit
                    ? 'text-brand-primary'
                    : isActive
                      ? 'text-brand-primary'
                      : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {isActive && !isNewHabit && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-2 top-1.5 bottom-1.5 rounded-full bg-brand-primary-soft"
                  />
                )}
                <span
                  className={`relative flex items-center justify-center ${
                    isNewHabit
                      ? 'size-10 rounded-full bg-brand-primary text-text-inverse shadow-card'
                      : 'size-6'
                  }`}
                >
                  <Icon
                    aria-hidden="true"
                    className={isNewHabit ? 'size-5' : 'size-5'}
                  />
                </span>
                <span className="relative text-[11px] font-medium leading-none">
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
