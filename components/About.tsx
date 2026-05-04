'use client';

import { motion } from 'framer-motion';
import Section from './Section';
import { useLang } from '@/lib/lang';

const currently = [
  { label: 'Based', value: 'Hồ Chí Minh City' },
  { label: 'Status', value: 'Open to new work' },
  { label: 'Building', value: 'Creative tools & web experiments' },
];

export default function About() {
  const { t } = useLang();
  const { bio, openToWork, webDev, status, discipline, title } = t.about;

  const stats = [
    { lines: openToWork, label: status },
    { lines: webDev, label: discipline },
  ];

  return (
    <Section id="about" title={title} index={1}>

      {/* Bio — full width, large */}
      <motion.p
        className="font-serif font-light italic leading-[1.8] text-ash max-w-3xl"
        style={{ fontSize: 'clamp(1.2rem, 2.8vw, 1.75rem)' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {bio}
      </motion.p>

      {/* Lower strip — currently on left, stats on right */}
      <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-12 sm:gap-16 items-start">

        {/* Currently */}
        <div className="flex flex-col gap-0">
          {currently.map(({ label, value }, i) => (
            <motion.div
              key={label}
              className="flex items-baseline gap-6 py-3.5 border-b border-linen/50"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-[11px] tracking-[0.22em] uppercase text-ash/40 w-16 shrink-0">
                {label}
              </span>
              <span className="font-light text-sm sm:text-base text-ink/65">{value}</span>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-row sm:flex-col gap-10 sm:gap-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 160, damping: 22, delay: 0.2 + i * 0.12 }}
            >
              {stat.lines.map((line) => (
                <p
                  key={line}
                  className="font-bold leading-none tracking-tighter text-ink"
                  style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}
                >
                  {line}
                </p>
              ))}
              <p className="text-[11px] tracking-[0.22em] uppercase text-ash/40 mt-2.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </Section>
  );
}
