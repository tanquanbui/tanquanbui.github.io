'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from '@/lib/lang';

const words = [
  { text: 'QUAN', align: 'text-left', weight: 'font-light italic' },
  { text: 'BUI', align: 'text-right', weight: 'font-bold' },
];

function RevealWord({ text, align, weight, startDelay }: {
  text: string; align: string; weight: string; startDelay: number;
}) {
  return (
    <div className={`block ${align} overflow-hidden`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className={`inline-block ${weight}`}
          initial={{ y: '105%' }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 18, delay: startDelay + i * 0.05 }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

export default function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);

  return (
    <section ref={ref} id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 overflow-hidden gap-8"
    >
      {/* Pulsing available badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-linen/60 bg-paper/40 backdrop-blur-sm"
      >
        <motion.span
          animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[6px] h-[6px] rounded-full bg-clay shrink-0"
        />
        <span className="text-[10px] tracking-[0.25em] uppercase text-ash/70">
          {t.available}
        </span>
      </motion.div>

      {/* Big name */}
      <motion.h1
        className="leading-[0.82] tracking-tighter text-ink w-full"
        style={{ fontSize: 'clamp(5rem, 22vw, 22rem)', y: nameY, opacity: nameOpacity, scale: nameScale, willChange: 'transform' }}
      >
        {words.map((word, i) => (
          <RevealWord key={word.text} {...word} startDelay={0.3 + i * 0.22} />
        ))}
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-[11px] tracking-[0.3em] uppercase text-ash/60 font-sans self-center"
      >
        {t.tagline}
      </motion.p>
    </section>
  );
}
