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
    stateClasses = 'bg-brand-orange text-brand-dark shadow-sm';
  } else if (isToday) {
    stateClasses = 'bg-brand-dark text-white shadow-sm hover:shadow-md';
  } else {
    stateClasses = 'border border-border-light bg-bg-app text-secondary';
  }

  return (
    <button
      type="button"
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-pill text-xl transition-all disabled:opacity-50 ${stateClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
