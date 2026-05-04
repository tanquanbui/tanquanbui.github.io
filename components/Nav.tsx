'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { useLang } from '@/lib/lang';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const { t } = useLang();

  const links = [
    { href: '#about', label: t.nav[0] },
    { href: '#timeline', label: t.timeline.title },
    { href: '#projects', label: t.nav[1] },
    { href: '#skills', label: t.nav[2] },
    { href: '#contact', label: t.nav[3] },
  ];

  return (
    <>
      {/* Three-dot trigger — fixed to right side */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        onClick={() => setOpen((o) => !o)}
        aria-label="Menu"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-[5px] p-3 group"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={open ? { scale: 1.4, backgroundColor: '#A896D0' } : { scale: 1, backgroundColor: '#9A9090' }}
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
            className="fixed inset-0 z-40 bg-paper/95 backdrop-blur-md flex flex-col justify-center px-12 sm:px-20"
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-8 right-8 text-[11px] tracking-[0.3em] uppercase text-ash hover:text-ink transition-colors"
            >
              Close ✕
            </button>

            <ul className="flex flex-col gap-3">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={close}
                    className="block font-bold tracking-tighter text-ink hover:text-clay transition-colors duration-300"
                    style={{ fontSize: 'clamp(3rem, 12vw, 7rem)' }}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
