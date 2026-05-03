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
      className={`py-28 px-8 ${alt ? 'bg-sand' : ''}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl mx-auto"
      >
        {/* Section header with large ghost number */}
        <div className="relative mb-16 overflow-hidden">
          {index !== undefined && (
            <span
              className="absolute -top-6 right-0 font-black leading-none text-ink/[0.04] select-none pointer-events-none"
              style={{ fontSize: 'clamp(6rem, 22vw, 20rem)' }}
            >
              {String(index).padStart(2, '0')}
            </span>
          )}
          <div className="relative flex items-baseline pb-6 border-b border-linen">
            <h2 className="font-bold text-3xl text-ink tracking-tight">{title}</h2>
          </div>
        </div>
        {children}
      </motion.div>
    </section>
  );
}
