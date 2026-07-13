'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { ChevronDown, LogOut } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function TopBar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleOutsideClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  const displayName = session?.user?.name ?? session?.user?.email ?? 'User';
  const userInitial =
    (session?.user?.name ?? session?.user?.email ?? 'U')[0].toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b border-border-light bg-bg-surface/95 shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:h-16 md:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="inline-flex min-h-11 items-center gap-sm transition-base focus-ring"
          aria-label="HaaBeet dashboard"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-brand-dark text-body-sm font-bold text-white shadow-sm">
            H
          </span>
          <span className="hidden text-heading-md text-primary sm:inline">
            HaaBeet
          </span>
        </Link>

        {/* User menu */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-haspopup="menu"
            aria-label="Open user menu"
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-xs rounded-sm px-xs transition-base focus-ring hover:bg-bg-app"
          >
            {/* Avatar circle */}
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-blue text-body-sm font-semibold text-brand-dark"
            >
              {userInitial}
            </span>
            <ChevronDown
              aria-hidden="true"
              className={`hidden size-4 shrink-0 text-secondary transition-transform duration-base sm:block ${open ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown */}
          {open && (
            <div
              role="menu"
              aria-label="User menu"
              className="absolute right-0 top-full z-50 mt-1 w-56 rounded-sm border border-border-light bg-bg-surface shadow-md"
            >
              {/* Profile info */}
              <div className="border-b border-border-light px-md py-sm">
                <p className="truncate text-body-sm font-medium text-primary">
                  {displayName}
                </p>
                {session?.user?.email && (
                  <p className="truncate text-body-xs text-secondary">
                    {session.user.email}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="py-xs">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="inline-flex min-h-11 w-full items-center gap-sm px-md py-sm text-body-sm text-primary transition-base focus-ring hover:bg-bg-app"
                >
                  <LogOut
                    aria-hidden="true"
                    className="size-4 shrink-0 text-secondary"
                  />
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
