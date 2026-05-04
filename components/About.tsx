'use client';

import { motion } from 'framer-motion';
import Section from './Section';

export default function About() {
  return (
    <Section id="about" title="About" index={1}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-20 lg:gap-32 items-end">

        {/* Left — bio anchored to bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <p className="font-light text-lg sm:text-xl leading-[1.9] text-ash max-w-md">
            Hi, I&apos;m Quan. I enjoy{' '}
            <span className="font-semibold text-ink">designing and building</span>{' '}
            software — from web apps and APIs to small tools that solve everyday
            problems. I care about{' '}
            <span className="italic text-ink">clean code, thoughtful UX,</span>{' '}
            and shipping work that actually gets used.
          </p>
        </motion.div>

        {/* Right — large stat blocks */}
        <div className="flex flex-col gap-12">
          {[
            { lines: ['Open', 'to work'], label: 'Status' },
            { lines: ['Web', 'Dev'], label: 'Discipline' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 160, damping: 22, delay: 0.15 + i * 0.14 }}
            >
              {stat.lines.map((line) => (
                <p key={line} className="font-bold leading-none tracking-tighter text-ink"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}>
                  {line}
                </p>
              ))}
              <p className="text-[10px] tracking-[0.28em] uppercase text-ash/50 mt-3">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
