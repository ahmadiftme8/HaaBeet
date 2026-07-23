import {
  BarChart2,
  Info,
  LayoutDashboard,
  Plus,
  type LucideIcon,
} from 'lucide-react';

export type NavItemConfig = {
  label: string;
  href: string;
  icon: LucideIcon;
  /** When omitted, active state is derived from the current pathname. */
  matchPath?: string | null;
};

export const appNavItems: NavItemConfig[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, matchPath: '/dashboard' },
  { label: 'New Habit', href: '/dashboard', icon: Plus, matchPath: null },
  { label: 'Report', href: '/report', icon: BarChart2, matchPath: '/report' },
  { label: 'About', href: '/about', icon: Info, matchPath: '/about' },
];

export function isNavItemActive(pathname: string, item: NavItemConfig): boolean {
  if (item.matchPath === null) return false;
  const match = item.matchPath ?? item.href;
  return pathname === match || pathname.startsWith(`${match}/`);
}
