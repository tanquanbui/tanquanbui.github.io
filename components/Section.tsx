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
      className={`px-5 sm:px-10 lg:px-16 py-24 sm:py-32 ${alt ? 'bg-sand/60' : ''}`}
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header — huge index numeral + rule + mono title */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end gap-5 sm:gap-7 mb-14 sm:mb-20"
        >
          {index !== undefined && (
            <span className="font-display leading-[0.8] text-ink/10 shrink-0" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
              {String(index).padStart(2, '0')}
            </span>
          )}
          <div className="flex-1 h-px bg-ink/25 mb-3" />
          <h2 className="font-mono text-xs tracking-[0.25em] uppercase text-ink font-bold shrink-0 mb-3">
            {title}
          </h2>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
