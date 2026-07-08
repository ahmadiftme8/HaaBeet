import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-dark text-white shadow-sm hover:opacity-90 disabled:opacity-50',
  secondary:
    'border border-border-light bg-bg-surface text-primary shadow-sm hover:bg-bg-app disabled:opacity-50',
  danger:
    'bg-red-600 text-white shadow-sm hover:bg-red-700 disabled:opacity-50',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-sm py-xs text-body-sm',
  md: 'px-md py-sm text-body-sm',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`rounded-sm transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
