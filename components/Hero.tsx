'use client';

import { motion } from 'framer-motion';

const fade = (delay = 0) => ({
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] } },
});

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between px-8 pt-28 pb-12"
    >
      {/* Top metadata row */}
      <motion.div
        variants={fade(0.1)}
        initial="hidden"
        animate="show"
        className="flex items-center justify-between border-b border-linen pb-5"
      >
        <span className="text-[11px] tracking-[0.3em] uppercase font-sans text-ash">
          Portfolio
        </span>
        <span className="text-[11px] tracking-[0.3em] uppercase font-sans text-ash">
          {new Date().getFullYear()}
        </span>
      </motion.div>

      {/* Big name */}
      <motion.div
        variants={fade(0.2)}
        initial="hidden"
        animate="show"
        className="py-8"
      >
        <h1
          className="font-sans font-black leading-[0.88] tracking-tighter text-ink select-none"
          style={{ fontSize: 'clamp(4.5rem, 17.5vw, 17rem)' }}
        >
          Tan<br />
          Quan<br />
          Bui
        </h1>
      </motion.div>

      {/* Bottom row */}
      <motion.div
        variants={fade(0.4)}
        initial="hidden"
        animate="show"
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 border-t border-linen pt-6"
      >
        <p className="max-w-xs font-sans font-light text-sm text-ash leading-7">
          Software developer building<br />useful things on the web.
        </p>
        <div className="flex items-center gap-5">
          <a
            href="#projects"
            className="px-7 py-3 bg-ink text-paper text-[11px] tracking-[0.18em] uppercase font-sans hover:bg-clay transition-colors duration-300"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-7 py-3 border border-ink text-ink text-[11px] tracking-[0.18em] uppercase font-sans hover:border-clay hover:text-clay transition-colors duration-300"
          >
            Contact
          </a>
        </div>
      </motion.div>
    </section>
  );
}
