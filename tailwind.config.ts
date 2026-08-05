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
        display: ['var(--font-anton)', 'Impact', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        paper: '#F5F2EA',      // raw off-white stock
        ink: '#0A0A0A',        // near-black, the primary mark
        clay: '#FF3D1A',       // signal — the one hot accent
        ash: '#6E6B63',        // working gray
        linen: '#D8D4C8',      // hairline / rule color
        parchment: '#D4FF3D',  // secondary pop — electric lime
        sand: '#EDE9DD',       // low-contrast fill
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
