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
        paper: '#F2E8D0',      // aged plaster — the iconic Saigon wall
        ink: '#1C1208',        // deep old wood / shadow interior
        clay: '#4A6B48',       // colonial shutter green
        ash: '#8A7D6A',        // weathered concrete
        linen: '#D8C9A8',      // aged trim / patina
        parchment: '#EAD9BC',  // lighter plaster
        sand: '#E2D0B0',       // sun-faded wall
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
