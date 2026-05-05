'use client';

import { motion } from 'framer-motion';
import Section from './Section';

const items = [
  {
    category: 'Building',
    content: 'This portfolio — and the creative tools to fill it.',
  },
  {
    category: 'Exploring',
    content: 'Three.js, WebGL, and the edges of what browsers can render.',
  },
  {
    category: 'Learning',
    content: 'Motion design principles and how to apply them in code.',
  },
  {
    category: 'Reading',
    content: 'The Design of Everyday Things — Don Norman.',
  },
  {
    category: 'Listening',
    content: 'Four Tet, Floating Points, and anything with a slow build.',
  },
  {
    category: 'Thinking about',
    content: 'How craft and software can occupy the same space.',
  },
];

export default function Now() {
  return (
    <Section id="now" title="Now" index={2}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-linen/40">
        {items.map((item, i) => (
          <motion.div
            key={item.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="bg-paper p-8 sm:p-10 flex flex-col gap-4 group hover:bg-sand/40 transition-colors duration-300"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-ash/60 font-medium">
              {item.category}
            </span>
            <p
              className="font-light text-ink/80 leading-relaxed"
              style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }}
            >
              {item.content}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-[10px] tracking-[0.25em] uppercase text-ash/40 mt-8"
      >
        Updated May 2026 — Melbourne
      </motion.p>
    </Section>
  );
}
