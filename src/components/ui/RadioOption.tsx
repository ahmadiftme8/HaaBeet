import type { InputHTMLAttributes, ReactNode } from 'react';

type BadgeColor = 'blue' | 'purple' | 'orange' | 'pink';

interface RadioOptionProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  color: BadgeColor;
  children: ReactNode;
}

const colorClasses: Record<BadgeColor, string> = {
  blue: 'bg-brand-blue',
  purple: 'bg-brand-purple',
  orange: 'bg-brand-orange',
  pink: 'bg-brand-pink',
};

export function RadioOption({ color, children, className = '', ...props }: RadioOptionProps) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-xs rounded-pill px-sm py-xs text-body-xs text-brand-dark ${colorClasses[color]} ${className}`}
    >
      <input type="radio" {...props} />
      {children}
    </label>
  );
}

export function frequencyColor(frequency: string): BadgeColor {
  if (frequency === 'DAILY') return 'blue';
  if (frequency === 'WEEKLY') return 'purple';
  return 'orange';
}

export function formatFrequencyLabel(frequency: string): string {
  return frequency.charAt(0) + frequency.slice(1).toLowerCase();
}
