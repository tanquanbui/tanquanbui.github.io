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

const rotations = [2, -2, 1.5, -1.5, 2.5, -2, 1, -2.5, 2];

export default function Skills() {
  return (
    <Section id="skills" title="Skills" index={3}>
      <div className="flex flex-col gap-0">
        {skills.map((skill, i) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: i * 0.06 }}
            whileHover={{
              x: 8,
              transition: { type: 'spring', stiffness: 500, damping: 15 },
            }}
            className="group flex items-center justify-between py-5 border-b border-linen cursor-default"
          >
            <motion.span
              className="font-bold leading-none tracking-tighter text-ink/15 group-hover:text-clay/50 select-none"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
              whileHover={{ scale: 1.1, transition: { type: 'spring', stiffness: 400, damping: 12 } }}
            >
              {String(i + 1).padStart(2, '0')}
            </motion.span>
            <motion.span
              className="font-bold tracking-tight text-ink group-hover:text-clay"
              style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.5rem)' }}
              whileHover={{
                rotate: rotations[i],
                scale: 1.04,
                transition: { type: 'spring', stiffness: 400, damping: 10 },
              }}
            >
              {skill}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
