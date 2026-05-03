'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  id: string;
  title: string;
  children: ReactNode;
  alt?: boolean;
};

export default function Section({ id, title, children, alt = false }: Props) {
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
        <div className="flex items-baseline gap-6 pb-6 border-b border-linen mb-16">
          <h2 className="font-sans font-bold text-3xl text-ink tracking-tight">{title}</h2>
        </div>
        {children}
      </motion.div>
    </section>
  );
}
