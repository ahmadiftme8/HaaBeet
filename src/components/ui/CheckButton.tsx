import type { ButtonHTMLAttributes } from 'react';

interface CheckButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isCompleted: boolean;
  isToday: boolean;
}

export function CheckButton({
  isCompleted,
  isToday,
  className = '',
  children,
  ...props
}: CheckButtonProps) {
  let stateClasses: string;

  if (isCompleted) {
    stateClasses = 'bg-accent-amber text-text-primary shadow-card';
  } else if (isToday) {
    stateClasses = 'bg-brand-primary text-text-inverse shadow-card hover:shadow-raised';
  } else {
    stateClasses = 'border border-border-hairline bg-bg-app text-text-secondary';
  }

  return (
    <button
      type="button"
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg transition-all disabled:opacity-50 sm:h-12 sm:w-12 sm:text-xl ${stateClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
