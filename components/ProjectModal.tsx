'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Project = {
  title: string;
  subtitle?: string;
  description: string;
  href: string;
  tag: string;
  year: string;
  gradient?: string;
  accent?: string;
};

type Props = {
  projects: Project[];
  selectedIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onChange: (index: number) => void;
};

export default function ProjectModal({ projects, selectedIndex, isOpen, onClose, onChange }: Props) {
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, selectedIndex]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const go = (dir: number) => {
    setDirection(dir);
    onChange((selectedIndex + dir + projects.length) % projects.length);
  };

  const project = projects[selectedIndex];
  const accentColor = project.accent ?? '#A896D0';

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '35%' : '-35%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-35%' : '35%', opacity: 0 }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-paper flex flex-col"
        >
          {/* Gradient banner — top third */}
          <motion.div
            key={`grad-${selectedIndex}`}
            className="shrink-0 relative overflow-hidden"
            style={{
              height: 'clamp(160px, 30vh, 280px)',
              background: project.gradient ?? 'linear-gradient(145deg, #C8B6E8, #ECC6D6)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Subtle noise grain over gradient */}
            <div
              className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: '200px 200px',
              }}
            />

            {/* Header nav — overlaid on gradient */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 sm:px-10 py-5">
              <span className="text-[10px] tracking-[0.32em] uppercase font-medium text-ink/50">
                {String(selectedIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
              <button
                onClick={onClose}
                className="text-[10px] tracking-[0.3em] uppercase text-ink/50 hover:text-ink transition-colors"
              >
                Close ✕
              </button>
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={selectedIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  className="text-[10px] tracking-[0.32em] uppercase font-semibold mb-5 sm:mb-8"
                  style={{ color: accentColor }}
                >
                  {project.tag} — {project.year}
                </p>
                <h2
                  className="font-bold leading-[0.85] tracking-tighter text-ink mb-4 sm:mb-6"
                  style={{ fontSize: 'clamp(2.4rem, 8vw, 8rem)' }}
                >
                  {project.title}
                </h2>
                {project.subtitle && (
                  <p className="font-serif font-light italic text-ash mb-4 sm:mb-6"
                    style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
                    {project.subtitle}
                  </p>
                )}
                <p className="font-light text-base text-ash leading-8 max-w-lg mb-10 sm:mb-14">
                  {project.description}
                </p>
                {project.href !== '#' && (
                  <motion.a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase font-medium border-b pb-px transition-colors duration-300"
                    style={{ color: accentColor, borderColor: accentColor + '66' }}
                    whileHover={{ x: 5, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                  >
                    Visit Site →
                  </motion.a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer nav */}
          <div className="flex items-center justify-between px-6 sm:px-10 py-5 border-t border-linen/60 shrink-0">
            <motion.button
              onClick={() => go(-1)}
              className="text-[10px] tracking-[0.22em] uppercase text-ash hover:text-ink transition-colors"
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.96 }}
            >
              ← Prev
            </motion.button>
            <div className="flex gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > selectedIndex ? 1 : -1); onChange(i); }}
                  className="w-[6px] h-[6px] rounded-full transition-all duration-300"
                  style={{ backgroundColor: i === selectedIndex ? accentColor : '#E8E2D8' }}
                />
              ))}
            </div>
            <motion.button
              onClick={() => go(1)}
              className="text-[10px] tracking-[0.22em] uppercase text-ash hover:text-ink transition-colors"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.96 }}
            >
              Next →
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
