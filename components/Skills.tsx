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
      <div className="flex flex-col gap-0">
        {skills.map((skill, i) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group flex items-center justify-between py-5 border-b border-linen"
          >
            <span
              className="font-black leading-none tracking-tighter text-ink/20 group-hover:text-clay/40 transition-colors duration-300 select-none"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              className="font-bold tracking-tight text-ink group-hover:text-clay transition-colors duration-300"
              style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.5rem)' }}
            >
              {skill}
            </span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
