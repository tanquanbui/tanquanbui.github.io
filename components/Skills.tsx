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
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 rounded-full bg-[#efedea]/[0.04] border border-[#efedea]/15 text-sm cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </Section>
  );
}
