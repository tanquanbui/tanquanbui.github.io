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
      className={`py-16 sm:py-28 px-5 sm:px-8 ${alt ? 'bg-sand' : ''}`}
      style={{ perspective: '1200px' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 80, rotateX: 10, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        style={{ transformOrigin: 'center bottom' }}
        className="max-w-5xl mx-auto"
      >
        <div className="relative mb-16 overflow-hidden">
          {index !== undefined && (
            <span
              className="absolute -top-6 right-0 font-bold leading-none text-ink/[0.04] select-none pointer-events-none"
              style={{ fontSize: 'clamp(6rem, 22vw, 20rem)' }}
            >
              {String(index).padStart(2, '0')}
            </span>
          )}
          <div className="relative flex items-baseline pb-6 border-b border-linen">
            <motion.h2
              className="font-bold text-3xl text-ink tracking-tight"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.1 }}
            >
              {title}
            </motion.h2>
          </div>
        </div>
        {children}
      </motion.div>
    </section>
  );
}
