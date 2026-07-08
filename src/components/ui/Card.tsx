import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
  padding?: 'md' | 'lg';
  radius?: 'm' | 'l';
}

export function Card({
  children,
  className = '',
  bordered = false,
  padding = 'lg',
  radius = 'm',
}: CardProps) {
  const paddingClass = padding === 'md' ? 'p-md' : 'p-lg';
  const radiusClass = radius === 'l' ? 'rounded-l' : 'rounded-m';
  const borderClass = bordered ? 'border border-border-light' : '';

  return (
    <div
      className={`bg-bg-surface shadow-sm ${paddingClass} ${radiusClass} ${borderClass} ${className}`}
    >
      {children}
    </div>
  );
}
