'use client';

import { motion } from 'framer-motion';
import Section from './Section';

const projects = [
  {
    title: 'How to Learn Vietnamese',
    description:
      'An online resource for learners to practice and improve their Vietnamese.',
    href: 'https://howtolearnvietnamese.com',
    tag: 'Web',
  },
  {
    title: 'Project Two',
    description:
      'Short description of a project you\'ve built. Replace this with real content.',
    href: '#',
    tag: 'App',
  },
  {
    title: 'Project Three',
    description:
      'Short description of a project you\'ve built. Replace this with real content.',
    href: '#',
    tag: 'Tool',
  },
];

export default function Projects() {
  return (
    <Section id="projects" title="Projects" alt>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-linen">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="bg-parchment p-10 flex flex-col"
          >
            <div className="flex items-start justify-between mb-8">
              <span className="text-[10px] tracking-[0.28em] uppercase font-sans text-clay">
                {project.tag}
              </span>
              <span className="text-[10px] tracking-[0.1em] font-sans text-ash/50">
                0{i + 1}
              </span>
            </div>
            <h3 className="font-sans font-semibold text-xl text-ink mb-4 leading-snug">
              {project.title}
            </h3>
            <p className="font-sans font-light text-sm text-ash leading-relaxed mb-10 flex-1">
              {project.description}
            </p>
            {project.href !== '#' && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-[0.18em] uppercase font-sans text-ink border-b border-ink pb-px hover:text-clay hover:border-clay transition-colors duration-300 self-start"
              >
                Visit
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
