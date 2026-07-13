import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  error?: string;
}

export function Input({ label, error, id, className = '', disabled, ...props }: InputProps) {
  const errorId = error && id ? `${id}-error` : undefined;

  const stateClasses = error
    ? 'border-red-500 focus-visible:outline-red-500/50'
    : 'border-border-light focus-ring';

  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-xs block text-body-sm text-secondary">
          {label}
        </label>
      )}
      <input
        id={id}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={`min-h-11 w-full rounded-sm border bg-bg-app px-sm py-sm text-body-sm text-primary transition-base md:min-h-0 disabled:cursor-not-allowed disabled:opacity-50 ${stateClasses} ${className}`}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-xs text-body-sm text-brand-pink">
          {error}
        </p>
      )}
    </div>
  );
}
