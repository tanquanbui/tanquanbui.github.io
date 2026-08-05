'use client';

import { AnimatePresence, motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Intro() {
  const [visible, setVisible] = useState(true);
  const [display, setDisplay] = useState(0);
  const count = useMotionValue(0);
  const progressScale = useTransform(count, [0, 100], [0, 1]);

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 2.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });

    // hold briefly at 100 before exit
    const t = setTimeout(() => setVisible(false), 3100);
    return () => { controls.stop(); clearTimeout(t); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.88, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] bg-paper flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Paper grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.028] mix-blend-multiply"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
              backgroundSize: '256px 256px',
            }}
          />

          {/* Top-left wordmark */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="absolute top-7 left-7 sm:left-10"
          >
            <span className="font-mono text-[11px] tracking-[0.38em] uppercase text-ink/40">QB</span>
          </motion.div>

          {/* Center: big percentage */}
          <div className="flex items-end gap-1">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-display leading-none text-ink tabular-nums select-none"
              style={{ fontSize: 'clamp(5rem, 22vw, 14rem)' }}
            >
              {String(display).padStart(2, '0')}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-light text-ink/30 mb-2 sm:mb-4 select-none"
              style={{ fontSize: 'clamp(1.5rem, 5vw, 4rem)' }}
            >
              %
            </motion.span>
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="absolute bottom-10 left-7 right-7 sm:left-10 sm:right-10"
          >
            <div className="h-px bg-linen w-full overflow-hidden">
              <motion.div
                className="h-full bg-ink/40 origin-left"
                style={{ scaleX: progressScale }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="font-mono text-[10px] tracking-[0.28em] uppercase text-ash/40 mt-3"
            >
              Loading
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
