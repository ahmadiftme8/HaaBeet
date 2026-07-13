import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
  padding?: 'md' | 'lg';
  radius?: 'm' | 'l';
  interactive?: boolean;
}

export function Card({
  children,
  className = '',
  bordered = false,
  padding = 'lg',
  radius = 'm',
  interactive = false,
}: CardProps) {
  const paddingClass = padding === 'md' ? 'p-md' : 'p-md md:p-lg';
  const radiusClass = radius === 'l' ? 'rounded-l' : 'rounded-m';
  const borderClass = bordered ? 'border border-border-light' : '';
  const interactiveClass = interactive
    ? 'transition-base hover:-translate-y-0.5 hover:shadow-md'
    : '';

  return (
    <div
      className={`bg-bg-surface shadow-sm ${paddingClass} ${radiusClass} ${borderClass} ${interactiveClass} ${className}`}
    >
      {children}
    </div>
  );
}
