import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-app': 'var(--bg-app)',
        'bg-surface': 'var(--bg-surface)',
        'border-light': 'var(--border-light)',
        'brand-blue': 'var(--color-blue)',
        'brand-purple': 'var(--color-purple)',
        'brand-orange': 'var(--color-orange)',
        'brand-pink': 'var(--color-pink)',
        'brand-dark': 'var(--color-dark)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-white': 'var(--text-white)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      fontSize: {
        'heading-xl': 'var(--heading-xl)',
        'heading-lg': 'var(--heading-lg)',
        'heading-md': 'var(--heading-md)',
        'body-md': 'var(--body-md)',
        'body-sm': 'var(--body-sm)',
        'body-xs': 'var(--body-xs)',
      },
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
      },
      maxWidth: {
        form: '400px',
      },
      borderRadius: {
        l: 'var(--radius-l)',
        m: 'var(--radius-m)',
        sm: 'var(--radius-sm)',
        pill: 'var(--radius-pill)',
      },
      fontFamily: {
        sans: ['var(--font-family)'],
      },
    },
  },
  plugins: [],
};

export default config;
