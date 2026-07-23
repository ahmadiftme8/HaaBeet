import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-app': 'var(--bg-app)',
        'bg-surface': 'var(--bg-surface)',
        'bg-inverse': 'var(--bg-inverse)',
        'brand-primary': 'var(--brand-primary)',
        'brand-primary-soft': 'var(--brand-primary-soft)',
        'accent-lime': 'var(--accent-lime)',
        'accent-coral': 'var(--accent-coral)',
        'accent-teal': 'var(--accent-teal)',
        'accent-amber': 'var(--accent-amber)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-inverse': 'var(--text-inverse)',
        'border-hairline': 'var(--border-hairline)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        raised: 'var(--shadow-raised)',
      },
      fontSize: {
        display: ['var(--display)', { fontWeight: '700', letterSpacing: '-0.02em' }],
        'heading-xl': ['var(--heading-xl)', { fontWeight: '700' }],
        'heading-lg': ['var(--heading-lg)', { fontWeight: '600' }],
        'heading-md': ['var(--heading-md)', { fontWeight: '600' }],
        'body-md': ['var(--body-md)', { fontWeight: '400' }],
        'body-sm': ['var(--body-sm)', { fontWeight: '500' }],
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
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        full: 'var(--radius-full)',
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
