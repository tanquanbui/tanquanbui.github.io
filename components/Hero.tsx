'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { useLang } from '@/lib/lang';

const WebGLGrid = dynamic(() => import('./WebGLGrid'), { ssr: false });

const words = [
  { text: 'QUAN', align: 'text-left' },
  { text: 'BUI', align: 'text-right' },
];

function RevealWord({ text, align, startDelay }: {
  text: string; align: string; startDelay: number;
}) {
  return (
    <div className={`block ${align} overflow-hidden`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
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
  transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '-32%']);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center px-5 sm:px-10 overflow-hidden border-b border-ink/15"
    >
      {/* Procedural WebGL grid — warps toward the cursor */}
      <div className="absolute inset-0 -z-10">
        <WebGLGrid />
      </div>

      {/* Frame corners — brutalist crop marks */}
      <div className="pointer-events-none absolute inset-5 sm:inset-10 border border-ink/10" />

      {/* ── Top-left: initials + role ── */}
      <motion.div
        {...fadeUp(1.2)}
        className="absolute top-7 left-5 sm:left-10 flex items-center gap-3"
      >
        <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-ink font-bold">QB / 01</span>
        <span className="w-6 h-px bg-ink/40" />
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink/75">Creative Developer</span>
      </motion.div>

      {/* ── Top-right: location ── */}
      <motion.div
        {...fadeUp(1.35)}
        className="hidden sm:block absolute top-7 right-5 sm:right-10"
      >
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink/70">
          Melbourne, Australia
        </span>
      </motion.div>

      {/* ── Name — full width, vertically centered ── */}
      <motion.h1
        className="w-full font-display leading-[0.78] tracking-tight text-ink uppercase"
        style={{
          fontSize: 'clamp(5.5rem, 23vw, 23rem)',
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
        className="absolute bottom-7 left-5 sm:left-10 flex flex-col gap-2"
      >
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink/75">
          {t.tagline}
        </span>
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[6px] h-[6px] rounded-full bg-clay shrink-0"
          />
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink/70">
            {t.available}
          </span>
        </div>
      </motion.div>

      {/* ── Bottom-right: scroll indicator ── */}
      <motion.div
        {...fadeUp(1.8)}
        className="absolute bottom-7 right-5 sm:right-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink/60 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <motion.div
          className="w-px bg-ink/30 origin-top"
          animate={{ scaleY: [0, 1, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', times: [0, 0.4, 0.8, 1] }}
          style={{ height: 40 }}
        />
      </motion.div>
    </section>
  );
}
