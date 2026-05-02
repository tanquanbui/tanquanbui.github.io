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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.a
            key={project.title}
            href={project.href}
            target={project.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="glass-card rounded-xl p-6 transition-colors block group"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <span className="text-xs uppercase tracking-wider opacity-60 px-2 py-1 rounded-full border border-[#efedea]/15">
                {project.tag}
              </span>
            </div>
            <p className="opacity-80 mb-4">{project.description}</p>
            <span className="text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              Visit <span aria-hidden>→</span>
            </span>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
