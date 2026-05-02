'use client';

import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="text-center max-w-3xl"
      >
        <motion.p
          variants={item}
          className="text-sm uppercase tracking-[0.3em] opacity-70 mb-6"
        >
          Hello, I'm
        </motion.p>
        <motion.h1
          variants={item}
          className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 text-shimmer leading-tight"
        >
          Tan Quan Bui
        </motion.h1>
        <motion.p
          variants={item}
          className="text-lg sm:text-xl opacity-90 mb-10 max-w-xl mx-auto"
        >
          Software developer building useful things on the web.
        </motion.p>
        <motion.div variants={item} className="flex gap-4 justify-center flex-wrap">
          <a
            href="#projects"
            className="px-6 py-3 rounded-md bg-[#efedea] text-[#191919] font-semibold hover:bg-[#efedea]/90 transition"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-md border border-[#efedea]/30 hover:bg-[#efedea]/10 hover:border-[#efedea]/70 transition"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-[#efedea]/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-[#efedea]/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
