'use client';

import { motion } from 'framer-motion';
import Section from './Section';

const skills = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Python',
  'HTML & CSS',
  'Tailwind CSS',
  'Git',
];

export default function Skills() {
  return (
    <Section id="skills" title="Skills" index={3}>
      <div className="flex flex-col">
        {skills.map((skill, i) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 160, damping: 22, delay: i * 0.055 }}
            whileHover={{ x: i % 2 === 0 ? 8 : -8, transition: { type: 'spring', stiffness: 500, damping: 18 } }}
            className="group flex items-center justify-between py-6 sm:py-8 border-b border-linen/40 cursor-default"
          >
            {/* Number left */}
            <motion.span
              className="font-bold text-xl sm:text-3xl leading-none tracking-tighter text-ink/10 group-hover:text-clay/60 select-none shrink-0"
              transition={{ type: 'spring', stiffness: 400, damping: 12 }}
            >
              {String(i + 1).padStart(2, '0')}
            </motion.span>

            {/* Expanding line */}
            <motion.div
              className="flex-1 mx-6 sm:mx-10 h-px bg-linen/30 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.055 + 0.2, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Skill name right */}
            <motion.span
              className="font-bold tracking-tight text-ink group-hover:text-clay shrink-0"
              style={{ fontSize: 'clamp(1.2rem, 3vw, 2.4rem)' }}
              whileHover={{ rotate: i % 2 === 0 ? 1.5 : -1.5, scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
            >
              {skill}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
