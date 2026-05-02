'use client';

import { motion } from 'framer-motion';

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="font-bold tracking-widest text-lg">
          TQB
        </a>
        <ul className="flex gap-6 sm:gap-8 text-sm sm:text-base">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="opacity-80 hover:opacity-100 transition-opacity"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
