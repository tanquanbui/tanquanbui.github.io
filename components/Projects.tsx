'use client';

import { motion } from 'framer-motion';
import Section from './Section';

const projects = [
  {
    title: 'How to Learn Vietnamese',
    description: 'An online resource for learners to practice and improve their Vietnamese.',
    href: 'https://howtolearnvietnamese.com',
    tag: 'Web',
    year: '2024',
  },
  {
    title: 'Project Two',
    description: "Short description of a project you've built. Replace this with real content.",
    href: '#',
    tag: 'App',
    year: '2024',
  },
  {
    title: 'Project Three',
    description: "Short description of a project you've built. Replace this with real content.",
    href: '#',
    tag: 'Tool',
    year: '2023',
  },
];

export default function Projects() {
  return (
    <Section id="projects" title="Work" alt index={2}>
      <div className="flex flex-col">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group py-8 sm:py-10 border-b border-linen"
          >
            {/* Top row: number + title + tags */}
            <div className="flex items-start gap-4 sm:gap-6 mb-3">
              <span className="font-bold text-2xl sm:text-[3.5rem] leading-none tracking-tighter text-ink/10 group-hover:text-clay/30 transition-colors duration-500 shrink-0 mt-1 select-none">
                0{i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                  <h3
                    className="font-bold leading-tight tracking-tight text-ink group-hover:text-clay transition-colors duration-300"
                    style={{ fontSize: 'clamp(1.3rem, 4vw, 2.8rem)' }}
                  >
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-ash/60">{project.year}</span>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-clay">{project.tag}</span>
                  </div>
                </div>
                {/* Description + visit */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                  <p className="font-light text-sm text-ash leading-relaxed max-w-md">
                    {project.description}
                  </p>
                  {project.href !== '#' && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] tracking-[0.2em] uppercase text-ink border-b border-ink pb-px hover:text-clay hover:border-clay transition-colors duration-300 self-start sm:self-auto shrink-0"
                    >
                      Visit →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
