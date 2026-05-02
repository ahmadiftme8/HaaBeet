import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class', // we'll use next-themes later
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#6C47FF',
          light: '#8B6BFF',
          dark: '#5433D9',
        },
        success: '#10B981',
        warning: '#F59E0B',
        rose: '#F43F5E',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config; 