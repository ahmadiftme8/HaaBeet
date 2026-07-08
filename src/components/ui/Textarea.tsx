import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, id, className = '', ...props }: TextareaProps) {
  const errorId = error && id ? `${id}-error` : undefined;

  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-xs block text-body-sm text-secondary">
          {label}
        </label>
      )}
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={`w-full rounded-sm border bg-bg-app px-sm py-sm text-body-sm text-primary focus:outline-none focus:ring-2 focus:ring-brand-blue/40 ${
          error ? 'border-brand-pink' : 'border-border-light'
        } ${className}`}
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
