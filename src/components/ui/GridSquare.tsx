export type GridSquareColorScheme = 'blue' | 'purple' | 'orange' | 'pink';

export type GridSquareSize = 'sm' | 'md';

interface GridSquareProps {
  filled: boolean;
  colorScheme: GridSquareColorScheme;
  size?: GridSquareSize;
  className?: string;
}

const filledColorClasses: Record<GridSquareColorScheme, string> = {
  blue: 'bg-brand-blue',
  purple: 'bg-brand-purple',
  orange: 'bg-brand-orange',
  pink: 'bg-brand-pink',
};

const sizeClasses: Record<GridSquareSize, string> = {
  sm: 'h-4 w-4 md:h-5 md:w-5',
  md: 'h-5 w-5 md:h-7 md:w-7',
};

export function GridSquare({
  filled,
  colorScheme,
  size = 'sm',
  className = '',
}: GridSquareProps) {
  const stateClasses = filled
    ? filledColorClasses[colorScheme]
    : 'border border-border-light bg-transparent';

  return (
    <span
      className={`inline-block shrink-0 rounded-sm ${sizeClasses[size]} ${stateClasses} ${className}`}
      aria-hidden
    />
  );
}
