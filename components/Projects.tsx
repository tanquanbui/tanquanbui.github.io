'use client';

import { motion } from 'framer-motion';
import Section from './Section';

const projects = [
  {
    title: 'How to Learn Vietnamese',
    description: 'An online resource for learners to practice and improve their Vietnamese.',
    href: 'https://howtolearnvietnamese.com',
    tag: 'Web',
  },
  {
    title: 'Project Two',
    description: "Short description of a project you've built. Replace this with real content.",
    href: '#',
    tag: 'App',
  },
  {
    title: 'Project Three',
    description: "Short description of a project you've built. Replace this with real content.",
    href: '#',
    tag: 'Tool',
  },
];

export default function Projects() {
  return (
    <Section id="projects" title="Projects" alt>
      <div className="flex flex-col">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 py-8 border-b border-linen"
          >
            <span className="text-[11px] tracking-[0.2em] font-sans text-ash/50 w-6 shrink-0">
              0{i + 1}
            </span>
            <h3 className="font-sans font-semibold text-xl text-ink flex-1 group-hover:text-clay transition-colors duration-300">
              {project.title}
            </h3>
            <p className="font-sans font-light text-sm text-ash leading-relaxed sm:max-w-xs">
              {project.description}
            </p>
            <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-ash/60 w-10 shrink-0">
              {project.tag}
            </span>
            {project.href !== '#' ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-[0.18em] uppercase font-sans text-ink border-b border-ink pb-px hover:text-clay hover:border-clay transition-colors duration-300 shrink-0"
              >
                Visit
              </a>
            ) : (
              <span className="w-8 shrink-0" />
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
