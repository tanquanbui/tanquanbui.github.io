'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useView } from '@/lib/view';
import Footer from './Footer';

export default function ViewFrame({ children }: { children: ReactNode }) {
  const { setView } = useView();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-30 bg-paper overflow-y-auto overscroll-contain"
    >
      <button
        onClick={() => setView('menu')}
        className="fixed top-7 left-5 sm:left-10 z-40 flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] uppercase text-ink/70 hover:text-clay transition-colors duration-300 bg-paper/80 backdrop-blur-sm px-2 py-1 -ml-2"
      >
        <span aria-hidden="true">←</span> Menu
      </button>
      {children}
      <Footer />
    </motion.div>
  );
}
