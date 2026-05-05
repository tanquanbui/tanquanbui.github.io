'use client';

import { motion } from 'framer-motion';
import Section from './Section';

const principles = [
  {
    index: '01',
    heading: 'craft over output',
    body: 'I'd rather spend twice as long on one thing and have it feel right than ship ten things that feel hollow. The details most people skip are the ones I find most interesting.',
  },
  {
    index: '02',
    heading: 'motion is meaning',
    body: 'How something moves tells you what it is. Animation isn't decoration — it's the difference between a page and an experience. I treat every transition as a design decision.',
  },
  {
    index: '03',
    heading: 'learn by making',
    body: 'I don't wait until I know enough to start. I build things to understand them — experiments, prototypes, half-finished ideas. The making is the learning.',
  },
  {
    index: '04',
    heading: 'code is a creative medium',
    body: 'A browser is a canvas. Constraints are a starting point. I'm not interested in separating design from engineering — the most interesting work lives in that overlap.',
  },
];

export default function Philosophy() {
  return (
    <Section id="philosophy" title="Philosophy" index={2}>
      <div className="flex flex-col">
        {principles.map((p, i) => (
          <motion.div
            key={p.index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group grid grid-cols-[3rem_1fr] sm:grid-cols-[6rem_1fr] lg:grid-cols-[10rem_1fr] gap-6 sm:gap-10 py-10 sm:py-14 border-b border-linen/50 items-start"
          >
            {/* Number */}
            <span className="text-[11px] tracking-[0.2em] uppercase text-ink/35 font-medium pt-1 sm:pt-2">
              {p.index}
            </span>

            {/* Content */}
            <div className="flex flex-col gap-4">
              <motion.h3
                className="font-bold tracking-tighter text-ink leading-none"
                style={{ fontSize: 'clamp(1.6rem, 4vw, 3.2rem)' }}
                whileHover={{ x: 6, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
              >
                {p.heading}
              </motion.h3>
              <p className="font-light text-ink/65 leading-relaxed max-w-2xl"
                style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)' }}
              >
                {p.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
