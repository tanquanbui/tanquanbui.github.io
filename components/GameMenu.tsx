'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useLang } from '@/lib/lang';
import { useView, type View } from '@/lib/view';

const WebGLGrid = dynamic(() => import('./WebGLGrid'), { ssr: false });

function RevealWord({ text, align, startDelay }: { text: string; align: string; startDelay: number }) {
  return (
    <div className={`block ${align} overflow-hidden`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 160, damping: 20, delay: startDelay + i * 0.05 }}
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

function MenuItem({ index, label, onClick, delay }: { index: string; label: string; onClick: () => void; delay: number }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover="hover"
      className="group flex items-center gap-4 sm:gap-6 py-1.5 sm:py-2 text-left"
    >
      <span className="font-mono text-[11px] sm:text-xs text-ink/35 group-hover:text-clay transition-colors duration-300 shrink-0">
        {index}
      </span>
      <span
        className="font-display uppercase tracking-tight text-ink group-hover:text-clay transition-colors duration-300 leading-none"
        style={{ fontSize: 'clamp(1.4rem, 4.2vw, 2.75rem)' }}
      >
        {label}
      </span>
      <motion.span
        variants={{ hover: { x: 6, opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="text-clay shrink-0"
      >
        →
      </motion.span>
    </motion.button>
  );
}

export default function GameMenu() {
  const { t } = useLang();
  const { setView } = useView();

  const items: { index: string; label: string; view: View }[] = [
    { index: '01', label: t.about.title, view: 'about' },
    { index: '02', label: t.story.title, view: 'story' },
    { index: '03', label: t.work.title, view: 'projects' },
    { index: '04', label: t.skills.title, view: 'skills' },
    { index: '05', label: t.contact.title, view: 'contact' },
  ];

  return (
    <section
      id="menu"
      className="fixed inset-0 h-[100dvh] w-full flex flex-col overflow-hidden"
    >
      {/* Procedural WebGL grid — warps toward the cursor */}
      <div className="absolute inset-0 -z-10">
        <WebGLGrid />
      </div>

      {/* Frame corners — brutalist crop marks */}
      <div className="pointer-events-none absolute inset-5 sm:inset-10 border border-ink/10" />

      {/* ── Header bar ── */}
      <motion.div
        {...fadeUp(1.2)}
        className="shrink-0 flex items-center justify-between px-5 sm:px-10 pt-7"
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-ink font-bold">QB</span>
          <span className="w-6 h-px bg-ink/40" />
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink/75">Creative Developer</span>
        </div>
        <span className="hidden sm:block font-mono text-[11px] tracking-[0.2em] uppercase text-ink/70">
          Melbourne, Australia
        </span>
      </motion.div>

      {/* ── Main: wordmark + menu ── */}
      <div className="flex-1 min-h-0 flex flex-col sm:flex-row items-center sm:items-end justify-center sm:justify-between gap-6 sm:gap-10 px-5 sm:px-10 py-4">
        <h1
          className="font-display leading-[0.8] tracking-tight text-ink uppercase shrink-0"
          style={{ fontSize: 'clamp(2.75rem, 10vw, 9rem)' }}
        >
          <RevealWord text="QUAN" align="text-left" startDelay={0.25} />
          <RevealWord text="BUI" align="text-left" startDelay={0.45} />
        </h1>

        <nav className="flex flex-col shrink-0">
          {items.map((item, i) => (
            <MenuItem
              key={item.view}
              index={item.index}
              label={item.label}
              delay={0.6 + i * 0.08}
              onClick={() => setView(item.view)}
            />
          ))}
        </nav>
      </div>

      {/* ── Footer bar ── */}
      <motion.div
        {...fadeUp(1.5)}
        className="shrink-0 flex items-center justify-between px-5 sm:px-10 pb-7"
      >
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
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ash/50">
          © {new Date().getFullYear()} Quan Bui
        </span>
      </motion.div>
    </section>
  );
}
