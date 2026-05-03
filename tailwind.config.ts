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
      },
      colors: {
        paper: '#18120D',
        ink: '#EDE8E0',
        clay: '#C8804A',
        ash: '#7A6E62',
        linen: '#2E2418',
        parchment: '#211A13',
        sand: '#1C1610',
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
