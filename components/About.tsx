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
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-20 lg:gap-32 items-end">

        {/* Left — bio + currently */}
        <div className="flex flex-col gap-10">
          <motion.p
            className="font-serif font-light italic leading-[1.85] text-ash"
            style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            {bio}
          </motion.p>

          {/* Currently */}
          <motion.div
            className="flex flex-col gap-0"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          >
            {currently.map(({ label, value }, i) => (
              <motion.div
                key={label}
                className="flex items-baseline gap-5 py-3 border-b border-linen/40"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-[9px] tracking-[0.3em] uppercase text-ash/40 w-14 shrink-0">
                  {label}
                </span>
                <span className="font-light text-sm text-ink/70">{value}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right — large stat blocks */}
        <div className="flex flex-col gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 160, damping: 22, delay: 0.15 + i * 0.14 }}
            >
              {stat.lines.map((line) => (
                <p
                  key={line}
                  className="font-bold leading-none tracking-tighter text-ink"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
                >
                  {line}
                </p>
              ))}
              <p className="text-[9px] tracking-[0.28em] uppercase text-ash/45 mt-3">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
