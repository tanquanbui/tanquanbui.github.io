'use client';

import { motion } from 'framer-motion';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-8 text-center"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center gap-7"
      >
        <motion.p
          variants={item}
          className="text-[11px] tracking-[0.35em] uppercase font-sans text-ash"
        >
          Software Developer
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display font-light leading-none tracking-tight text-ink"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
        >
          Tan Quan Bui
        </motion.h1>

        <motion.div variants={item} className="w-10 h-px bg-clay" />

        <motion.p
          variants={item}
          className="max-w-sm text-sm font-sans font-light text-ash leading-7 tracking-wide"
        >
          Building useful things on the web with care and intention.
        </motion.p>

        <motion.div variants={item} className="flex items-center gap-5 pt-2">
          <a
            href="#projects"
            className="px-8 py-3 bg-ink text-paper text-[11px] tracking-[0.18em] uppercase font-sans hover:bg-clay transition-colors duration-300"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-ink text-ink text-[11px] tracking-[0.18em] uppercase font-sans hover:border-clay hover:text-clay transition-colors duration-300"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-ash/60">
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-ash origin-top"
        />
      </motion.div>
    </section>
  );
}
