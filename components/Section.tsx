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
      className={`py-24 px-6 ${alt ? 'bg-[#efedea]/[0.02]' : ''}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">{title}</h2>
        {children}
      </motion.div>
    </section>
  );
}
