'use client';

import { motion } from 'framer-motion';

const fade = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] } },
});

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col px-8 pt-24 pb-10 overflow-hidden"
    >
      {/* Top metadata */}
      <motion.div
        variants={fade(0.1)}
        initial="hidden"
        animate="show"
        className="flex justify-between items-center pb-5 border-b border-linen"
      >
        <span className="text-[11px] tracking-[0.3em] uppercase font-sans text-ash">
          Portfolio — {new Date().getFullYear()}
        </span>
        <span className="text-[11px] tracking-[0.3em] uppercase font-sans text-ash">
          Software Developer
        </span>
      </motion.div>

      {/* Staggered name — diagonal left → center → right */}
      <motion.div
        variants={fade(0.2)}
        initial="hidden"
        animate="show"
        className="flex-1 flex flex-col justify-center py-6"
      >
        <h1
          className="font-black leading-[0.82] tracking-tighter text-ink w-full"
          style={{ fontSize: 'clamp(4.5rem, 18.5vw, 18rem)' }}
        >
          <span className="block text-left">TAN</span>
          <span className="block text-center">QUAN</span>
          <span className="block text-right">BUI</span>
        </h1>
      </motion.div>

      {/* Bottom — description left, links right */}
      <motion.div
        variants={fade(0.45)}
        initial="hidden"
        animate="show"
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 pt-5 border-t border-linen"
      >
        <p className="font-sans font-light text-sm text-ash leading-7 max-w-[260px]">
          Building useful things on the web<br />with care and intention.
        </p>
        <div className="flex flex-col gap-3 sm:items-end">
          <a
            href="#projects"
            className="text-[11px] tracking-[0.2em] uppercase font-sans text-ink border-b border-ink pb-px hover:text-clay hover:border-clay transition-colors duration-300 w-fit"
          >
            View Work →
          </a>
          <a
            href="#contact"
            className="text-[11px] tracking-[0.2em] uppercase font-sans text-ink border-b border-ink pb-px hover:text-clay hover:border-clay transition-colors duration-300 w-fit"
          >
            Get in Touch →
          </a>
        </div>
      </motion.div>
    </section>
  );
}
