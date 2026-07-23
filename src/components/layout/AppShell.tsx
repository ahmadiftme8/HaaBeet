'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { MobileNav } from '@/components/layout/MobileNav';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-app">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex min-h-screen flex-col pb-20 md:ml-60 md:pb-0">
        <div className="flex-1 overflow-y-auto bg-bg-app">{children}</div>
      </div>

      <div className="md:hidden">
        <MobileNav />
      </div>
    </div>
  );
}
