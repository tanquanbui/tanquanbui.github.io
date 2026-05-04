import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-space)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      colors: {
        paper: '#FAF8F5',
        ink: '#1C1A1A',
        clay: '#A896D0',
        ash: '#9A9090',
        linen: '#E8E2D8',
        parchment: '#F4F0EA',
        sand: '#F0EBE3',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-33.333%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
