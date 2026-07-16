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
        // Named spacing tokens. In Tailwind v4 these ALSO feed w-*/max-w-*/min-w-*
        // unless maxWidth/minWidth below pin container sizes for the same keys.
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
      },
      // Pin container widths so max-w-md ≠ spacing md (16px). See .cursor/rules/tailwind-tokens.mdc
      maxWidth: {
        form: '400px',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '7xl': '80rem',
      },
      minWidth: {
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
      },
      borderRadius: {
        // Size tokens — `rounded-l` means large radius, NOT "left"
        l: 'var(--radius-l)',
        m: 'var(--radius-m)',
        sm: 'var(--radius-sm)',
        pill: 'var(--radius-pill)',
      },
      fontFamily: {
        sans: ['var(--font-family)'],
      },
      transitionDuration: {
        fast: '120ms',
        base: '200ms',
        slow: '320ms',
      },
      transitionTimingFunction: {
        'ease-out': 'ease-out',
        'ease-in-out': 'ease-in-out',
      },
    },
  },
  plugins: [],
};

export default config;
