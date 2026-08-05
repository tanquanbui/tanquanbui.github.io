'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useLang } from '@/lib/lang';
import { useView, type View } from '@/lib/view';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const { t } = useLang();
  const { setView } = useView();

  const links: { view: View; label: string }[] = [
    { view: 'about', label: t.about.title },
    { view: 'philosophy', label: t.philosophy.title },
    { view: 'projects', label: t.work.title },
    { view: 'skills', label: t.skills.title },
    { view: 'contact', label: t.contact.title },
  ];

  const go = (v: View) => {
    setView(v);
    close();
  };

  return (
    <>
      {/* Three-dot trigger — fixed to right side */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        onClick={() => setOpen((o) => !o)}
        aria-label="Menu"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-[5px] p-3 group border border-ink/15 bg-paper/70"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={open ? { scale: 1.4, backgroundColor: '#FF3D1A' } : { scale: 1, backgroundColor: '#0A0A0A' }}
            transition={{ delay: i * 0.05, duration: 0.25 }}
            className="block w-[5px] h-[5px] rounded-full"
          />
        ))}
      </motion.button>

      {/* Full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-paper/97 backdrop-blur-md flex flex-col justify-center px-12 sm:px-20"
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-8 right-8 font-mono text-[11px] tracking-[0.3em] uppercase text-ash hover:text-ink transition-colors"
            >
              Close ✕
            </button>

            <button
              onClick={() => go('menu')}
              className="absolute top-8 left-8 font-mono text-[11px] tracking-[0.3em] uppercase text-ash hover:text-ink transition-colors"
            >
              ← Main Menu
            </button>

            <ul className="flex flex-col gap-2">
              {links.map((link, i) => (
                <motion.li
                  key={link.view}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-baseline gap-4"
                >
                  <span className="font-mono text-xs text-clay shrink-0">0{i + 1}</span>
                  <button
                    onClick={() => go(link.view)}
                    className="block font-display uppercase tracking-tight text-ink hover:text-clay transition-colors duration-300"
                    style={{ fontSize: 'clamp(3rem, 12vw, 7rem)' }}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
