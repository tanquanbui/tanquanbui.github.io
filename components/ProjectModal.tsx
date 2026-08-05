'use client';

import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

type Project = {
  title: string;
  subtitle?: string;
  description: string;
  href: string;
  tag: string;
  year: string;
  gradient?: string;
  accent?: string;
  screenshot?: string | null;
  stack?: readonly string[];
};

type Props = {
  projects: Project[];
  selectedIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onChange: (index: number) => void;
};

export default function ProjectModal({ projects, selectedIndex, isOpen, onClose, onChange }: Props) {
  const dragY = useMotionValue(0);
  const backdropOpacity = useTransform(dragY, [0, 260], [1, 0]);
  const panelOpacity = useTransform(dragY, [0, 260], [1, 0.4]);

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
    onChange((selectedIndex + dir + projects.length) % projects.length);
  };

  const project = projects[selectedIndex];
  const accent = project.accent ?? '#FF3D1A';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            style={{ opacity: backdropOpacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-ink/40 backdrop-blur-sm"
          />

          {/* Drawer panel */}
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.3 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) {
                onClose();
              } else {
                dragY.set(0);
              }
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 32 }}
            className="fixed bottom-0 left-0 right-0 z-[100] bg-paper border-t-2 border-ink overflow-hidden flex flex-col"
            style={{ maxHeight: '88vh', y: dragY, opacity: panelOpacity }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 shrink-0 cursor-grab active:cursor-grabbing">
              <div className="w-10 h-[3px] rounded-full bg-ink/15" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 sm:px-10 py-4 shrink-0">
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-[10px] tracking-[0.28em] uppercase font-bold"
                  style={{ color: accent }}
                >
                  {project.tag}
                </span>
                <span className="text-ink/20 text-[10px]">—</span>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/40 font-medium">
                  {project.year}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 border border-ink/20 hover:border-ink hover:bg-ink flex items-center justify-center transition-colors text-ink/50 hover:text-paper"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="px-6 sm:px-10 pb-10">

                {/* Screenshot or gradient band */}
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full border border-ink/15 mb-8 sm:mb-10 overflow-hidden"
                  style={{
                    height: 'clamp(180px, 38vh, 360px)',
                    background: project.gradient ?? 'linear-gradient(145deg, #FF6B4A, #FF3D1A)',
                  }}
                >
                  {project.screenshot && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.screenshot}
                      alt={`${project.title} screenshot`}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                  )}
                </motion.div>

                {/* Title */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedIndex}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h2
                      className="font-display uppercase leading-[0.88] tracking-tight text-ink mb-3"
                      style={{ fontSize: 'clamp(2.4rem, 8vw, 7rem)' }}
                    >
                      {project.title}
                    </h2>

                    {project.subtitle && (
                      <p className="font-mono mb-5 sm:mb-7"
                        style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1rem)', color: accent + 'CC' }}>
                        {project.subtitle}
                      </p>
                    )}

                    <p className="font-light text-ink/65 leading-relaxed max-w-xl mb-6 sm:mb-8"
                      style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)' }}>
                      {project.description}
                    </p>

                    {project.stack && project.stack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-8 sm:mb-10">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[10px] tracking-[0.14em] uppercase font-medium px-3 py-1.5 border border-ink/20 text-ink/65"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {project.href !== '#' && (
                      <motion.a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 font-mono text-[11px] tracking-[0.2em] uppercase font-bold text-paper transition-colors"
                        style={{ backgroundColor: accent }}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        View Code →
                      </motion.a>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Footer nav */}
            <div className="shrink-0 border-t border-ink/15 px-6 sm:px-10 py-4 flex items-center justify-between bg-paper">
              <motion.button
                onClick={() => go(-1)}
                className="font-mono flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-medium text-ink/50 hover:text-ink transition-colors"
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.96 }}
              >
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <path d="M6 1L1 6L6 11M1 6H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Prev
              </motion.button>

              {/* Dot indicators */}
              <div className="flex items-center gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => onChange(i)}
                    className="transition-all duration-300"
                    style={{
                      width: i === selectedIndex ? 20 : 6,
                      height: 3,
                      backgroundColor: i === selectedIndex ? accent : '#D8D4C8',
                    }}
                  />
                ))}
              </div>

              <motion.button
                onClick={() => go(1)}
                className="font-mono flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-medium text-ink/50 hover:text-ink transition-colors"
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.96 }}
              >
                Next
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <path d="M10 1L15 6L10 11M15 6H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
