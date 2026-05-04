'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  id: string;
  title: string;
  children: ReactNode;
  alt?: boolean;
  index?: number;
};

export default function Section({ id, title, children, alt = false, index }: Props) {
  return (
    <section
      id={id}
      className={`min-h-screen flex flex-col px-5 sm:px-12 pt-20 pb-16 ${alt ? 'bg-sand/60' : ''}`}
    >
      {/* Section label — small, top left */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-4 mb-auto pb-16"
      >
        {index !== undefined && (
          <span className="text-[10px] tracking-[0.3em] uppercase text-ash/40">
            {String(index).padStart(2, '0')}
          </span>
        )}
        <span className="text-[10px] tracking-[0.3em] uppercase text-ash/40">—</span>
        <h2 className="text-[10px] tracking-[0.3em] uppercase text-ash/40">{title}</h2>
      </motion.div>

      {/* Content pushed to bottom — negative space at top */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: 'transform' }}
        className="max-w-6xl w-full mx-auto mt-auto"
      >
        {children}
      </motion.div>
    </section>
  );
}
