'use client';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
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
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setVisible(v > 80));

  return (
    <motion.header
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -16 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-paper/90 backdrop-blur-md border-b border-linen"
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <nav className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-sans text-base font-semibold tracking-widest text-ink hover:text-clay transition-colors duration-300"
        >
          TQB
        </Link>
        <ul className="flex items-center gap-10">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[11px] tracking-[0.18em] uppercase font-sans text-ash hover:text-ink transition-colors duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
