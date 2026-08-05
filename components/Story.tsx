'use client';

import { motion } from 'framer-motion';
import Section from './Section';
import { useLang } from '@/lib/lang';

function Milestone({
  year, role, desc, index, total, align,
}: {
  year: string; role: string; desc: string; index: number; total: number; align: 'left' | 'right';
}) {
  const isRight = align === 'right';
  return (
    <div className={`relative py-12 sm:py-20 flex flex-col ${isRight ? 'sm:items-end sm:text-right' : 'sm:items-start'}`}>
      {/* Node on the center line */}
      <motion.span
        className="hidden sm:block absolute left-1/2 top-14 -translate-x-1/2 w-3 h-3 rounded-full bg-clay border-2 border-paper z-10"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ type: 'spring', stiffness: 320, damping: 18 }}
      />

      <div className={`w-full sm:w-[46%] ${isRight ? 'sm:ml-auto' : ''}`}>
        <motion.div
          className="flex items-baseline gap-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-[11px] tracking-[0.25em] text-clay font-bold">
            {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink/45">{year}</span>
        </motion.div>

        <motion.h3
          className="font-display uppercase leading-[0.85] text-ink mt-3 sm:mt-4"
          style={{ fontSize: 'clamp(2.2rem, 6.5vw, 5rem)' }}
          initial={{ opacity: 0, x: isRight ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {role}
        </motion.h3>

        <motion.p
          className="font-light text-ink/60 leading-relaxed mt-4"
          style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {desc}
        </motion.p>
      </div>
    </div>
  );
}

export default function Story() {
  const { t } = useLang();
  const items = t.story.items;

  return (
    <Section id="story" title={t.story.title} index={2}>
      <div className="relative">
        {/* Center spine — grows in as it's scrolled through */}
        <motion.div
          className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-ink/15 origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />

        {items.map((item, i) => (
          <Milestone
            key={item.year}
            {...item}
            index={i + 1}
            total={items.length}
            align={i % 2 === 0 ? 'left' : 'right'}
          />
        ))}

        {/* "Now" cap */}
        <motion.div
          className="relative flex flex-col items-center gap-3 pt-4 pb-2"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <span className="hidden sm:block absolute left-1/2 -top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-clay" />
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-2 h-2 rounded-full bg-clay"
          />
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-ink/50">
            Now — building this site
          </span>
        </motion.div>
      </div>
    </Section>
  );
}
