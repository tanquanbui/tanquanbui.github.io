'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-5 sm:px-8"
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="leading-[0.82] tracking-tighter text-ink w-full"
        style={{ fontSize: 'clamp(4.5rem, 18.5vw, 18rem)' }}
      >
        <span className="block text-left font-bold">TAN</span>
        <span className="block text-center font-light italic">QUAN</span>
        <span className="block text-right font-bold">BUI</span>
      </motion.h1>
    </section>
  );
}
