import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        paper: '#F9F7F4',
        ink: '#1A1815',
        clay: '#7A6A58',
        ash: '#8A8078',
        linen: '#E2DDD6',
        parchment: '#F2EEE8',
        sand: '#EDE9E2',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
