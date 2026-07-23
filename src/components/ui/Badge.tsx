import type { ReactNode } from 'react';

type BadgeColor = 'blue' | 'purple' | 'orange' | 'pink';

interface BadgeProps {
  color: BadgeColor;
  children: ReactNode;
  className?: string;
}

const colorClasses: Record<BadgeColor, string> = {
  blue: 'bg-[color-mix(in_srgb,var(--accent-teal)_18%,var(--bg-surface))] text-accent-teal',
  purple: 'bg-[color-mix(in_srgb,var(--accent-lime)_28%,var(--bg-surface))] text-text-primary',
  orange: 'bg-[color-mix(in_srgb,var(--accent-amber)_22%,var(--bg-surface))] text-accent-amber',
  pink: 'bg-[color-mix(in_srgb,var(--accent-coral)_18%,var(--bg-surface))] text-accent-coral',
};

export function Badge({ color, children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex w-fit rounded-full px-sm py-xs text-body-xs font-medium ${colorClasses[color]} ${className}`}
    >
      {children}
    </span>
  );
}
