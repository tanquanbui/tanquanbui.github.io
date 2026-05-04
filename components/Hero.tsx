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
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 160, damping: 20, delay: startDelay + i * 0.055 }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '-32%']);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center px-5 sm:px-10 overflow-hidden"
    >
      {/* Paper grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.028] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
      />

      {/* ── Top-left: initials + role ── */}
      <motion.div
        {...fadeUp(1.2)}
        className="absolute top-7 left-5 sm:left-10 flex items-center gap-3"
      >
        <span className="text-[11px] tracking-[0.38em] uppercase text-ink/35">QB</span>
        <span className="w-6 h-px bg-ink/15" />
        <span className="text-[11px] tracking-[0.25em] uppercase text-ash/40">Creative Developer</span>
      </motion.div>

      {/* ── Top-right: location ── */}
      <motion.div
        {...fadeUp(1.35)}
        className="absolute top-7 right-5 sm:right-10"
      >
        <span className="text-[11px] tracking-[0.25em] uppercase text-ash/35">
          Hồ Chí Minh City
        </span>
      </motion.div>

      {/* ── Name — full width, vertically centered ── */}
      <motion.h1
        className="w-full leading-[0.82] tracking-tighter text-ink"
        style={{
          fontSize: 'clamp(5rem, 22vw, 22rem)',
          y: nameY,
          opacity: nameOpacity,
          scale: nameScale,
          willChange: 'transform',
        }}
      >
        {words.map((word, i) => (
          <RevealWord key={word.text} {...word} startDelay={0.25 + i * 0.2} />
        ))}
      </motion.h1>

      {/* ── Bottom-left: tagline + availability ── */}
      <motion.div
        {...fadeUp(1.5)}
        className="absolute bottom-7 left-5 sm:left-10 flex flex-col gap-1.5"
      >
        <span className="text-[11px] tracking-[0.28em] uppercase text-ash/50">
          {t.tagline}
        </span>
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[5px] h-[5px] rounded-full bg-clay shrink-0"
          />
          <span className="text-[11px] tracking-[0.28em] uppercase text-ash/40">
            {t.available}
          </span>
        </div>
      </motion.div>

      {/* ── Bottom-right: scroll indicator ── */}
      <motion.div
        {...fadeUp(1.8)}
        className="absolute bottom-7 right-5 sm:right-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-ash/30 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <motion.div
          className="w-px bg-ash/25 origin-top"
          animate={{ scaleY: [0, 1, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', times: [0, 0.4, 0.8, 1] }}
          style={{ height: 40 }}
        />
      </motion.div>
    </section>
  );
}
