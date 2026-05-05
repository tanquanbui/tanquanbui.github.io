'use client';

import { motion } from 'framer-motion';
import Section from './Section';
import { useLang } from '@/lib/lang';

export default function Timeline() {
  const { t } = useLang();
  const { items, title } = t.timeline;

  return (
    <Section id="timeline" title={title} index={2}>
      <div className="relative">
        {/* Vertical line */}
        <motion.div
          className="absolute left-0 sm:left-[7rem] top-0 bottom-0 w-px bg-linen/50"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ originY: 0 }}
        />

        <div className="flex flex-col">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 140, damping: 22, delay: i * 0.1 }}
              className="relative flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-0 pl-6 sm:pl-0 py-6 sm:py-10 border-b border-linen/30 group"
            >
              {/* Year — left column */}
              <div className="sm:w-28 shrink-0">
                <span className="text-[11px] tracking-[0.2em] uppercase text-ash/70 font-sans">
                  {item.year}
                </span>
              </div>

              {/* Dot on the line */}
              <motion.div
                className="hidden sm:block absolute left-[6.85rem] top-[2.75rem] w-[7px] h-[7px] rounded-full border-2 border-linen bg-paper group-hover:border-clay group-hover:bg-clay/30 transition-colors duration-300"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: i * 0.1 + 0.2 }}
              />

              {/* Content — right */}
              <div className="sm:pl-10 flex-1">
                <motion.h3
                  className="font-bold tracking-tight text-ink mb-2 group-hover:text-clay transition-colors duration-300"
                  style={{ fontSize: 'clamp(1rem, 2.5vw, 1.6rem)' }}
                  whileHover={{ x: 4, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
                >
                  {item.role}
                </motion.h3>
                <p className="font-light text-sm text-ash/85 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
