import type { ReactNode } from 'react';

type BadgeColor = 'blue' | 'purple' | 'orange' | 'pink';

interface BadgeProps {
  color: BadgeColor;
  children: ReactNode;
  className?: string;
}

const colorClasses: Record<BadgeColor, string> = {
  blue: 'bg-brand-blue',
  purple: 'bg-brand-purple',
  orange: 'bg-brand-orange',
  pink: 'bg-brand-pink',
};

export function Badge({ color, children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex w-fit rounded-pill px-sm py-xs text-body-xs text-brand-dark ${colorClasses[color]} ${className}`}
    >
      {children}
    </span>
  );
}
