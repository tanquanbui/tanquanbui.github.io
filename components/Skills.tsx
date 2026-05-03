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
    <Section id="skills" title="Skills">
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="px-5 py-2 border border-linen text-[11px] tracking-[0.18em] uppercase font-sans text-ash hover:border-clay hover:text-clay transition-colors duration-300 cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </Section>
  );
}
