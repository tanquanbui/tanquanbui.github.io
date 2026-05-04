'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Project = {
  title: string;
  description: string;
  href: string;
  tag: string;
  year: string;
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

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const go = (dir: number) => {
    setDirection(dir);
    onChange((selectedIndex + dir + projects.length) % projects.length);
  };

  const project = projects[selectedIndex];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '40%' : '-40%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-40%' : '40%', opacity: 0 }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] bg-black flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-10 py-5 border-b border-linen shrink-0">
            <span className="text-[11px] tracking-[0.3em] uppercase text-ash">
              {String(selectedIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
            <button
              onClick={onClose}
              className="text-[11px] tracking-[0.3em] uppercase text-ash hover:text-ink transition-colors duration-300"
            >
              Close ✕
            </button>
          </div>

          {/* Sliding content */}
          <div className="flex-1 flex flex-col justify-center px-5 sm:px-10 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={selectedIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[11px] tracking-[0.3em] uppercase text-clay mb-6 sm:mb-10">
                  {project.tag} — {project.year}
                </p>
                <h2
                  className="font-bold leading-[0.85] tracking-tighter text-ink mb-6 sm:mb-10"
                  style={{ fontSize: 'clamp(2.5rem, 9vw, 9rem)' }}
                >
                  {project.title}
                </h2>
                <p className="font-light text-base text-ash leading-8 max-w-xl mb-10 sm:mb-14">
                  {project.description}
                </p>
                {project.href !== '#' && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[11px] tracking-[0.2em] uppercase text-ink border-b border-ink pb-px hover:text-clay hover:border-clay transition-colors duration-300"
                  >
                    Visit Site →
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer nav */}
          <div className="flex items-center justify-between px-5 sm:px-10 py-5 border-t border-linen shrink-0">
            <button
              onClick={() => go(-1)}
              className="text-[11px] tracking-[0.2em] uppercase text-ash hover:text-ink transition-colors duration-300"
            >
              ← Prev
            </button>
            <div className="flex gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > selectedIndex ? 1 : -1); onChange(i); }}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${i === selectedIndex ? 'bg-clay' : 'bg-linen'}`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              className="text-[11px] tracking-[0.2em] uppercase text-ash hover:text-ink transition-colors duration-300"
            >
              Next →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
