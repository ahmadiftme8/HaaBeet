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
  const radiusClass = radius === 'l' ? 'rounded-lg' : 'rounded-lg';
  const borderClass = bordered ? 'border border-border-hairline' : '';
  const interactiveClass = interactive
    ? 'transition-base hover:-translate-y-0.5 hover:shadow-raised'
    : '';

  return (
    <div
      className={`bg-bg-surface shadow-card ${paddingClass} ${radiusClass} ${borderClass} ${interactiveClass} ${className}`}
    >
      {children}
    </div>
  );
}
