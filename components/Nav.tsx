'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setVisible(v > 80));

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ opacity: visible || menuOpen ? 1 : 0, y: visible || menuOpen ? 0 : -16 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-paper/95 backdrop-blur-md border-b border-linen"
        style={{ pointerEvents: visible || menuOpen ? 'auto' : 'none' }}
      >
        <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-14 sm:h-16 flex items-center justify-between">
          <Link
            href="/"
            onClick={closeMenu}
            className="font-semibold tracking-widest text-sm text-ink hover:text-clay transition-colors duration-300"
          >
            TQB
          </Link>

          {/* Desktop links */}
          <ul className="hidden sm:flex items-center gap-10">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[11px] tracking-[0.18em] uppercase text-ash hover:text-ink transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-5 h-px bg-ink"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-px bg-ink"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-5 h-px bg-ink"
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-paper flex flex-col justify-center px-8 sm:hidden"
          >
            <ul className="flex flex-col gap-2">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block font-bold tracking-tighter text-ink hover:text-clay transition-colors duration-300"
                    style={{ fontSize: 'clamp(3rem, 14vw, 5rem)' }}
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
