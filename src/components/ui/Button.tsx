import { Loader2 } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-primary font-bold text-text-inverse shadow-card enabled:hover:brightness-105',
  secondary:
    'border border-border-hairline bg-bg-surface text-text-primary enabled:hover:bg-bg-app',
  danger: 'bg-red-600 font-bold text-text-inverse shadow-card',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-11 px-lg py-xs text-body-sm md:min-h-0',
  md: 'min-h-11 px-xl py-sm text-body-sm md:min-h-0',
};

const interactionClasses =
  'inline-flex items-center justify-center gap-xs rounded-full transition-base focus-ring enabled:hover:scale-[1.02] active:scale-95 disabled:pointer-events-none disabled:opacity-50';

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  type = 'button',
  disabled,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={`${interactionClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
      disabled={isDisabled}
      aria-busy={loading ? true : undefined}
    >
      {loading && (
        <Loader2 className="size-4 shrink-0 animate-spin" aria-hidden="true" />
      )}
      {children}
    </button>
  );
}
