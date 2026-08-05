'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/lib/lang';

export default function LangToggle() {
  const { lang, toggle } = useLang();

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-7 right-6 z-50 font-mono text-[10px] tracking-[0.3em] uppercase text-ash/50 hover:text-ash transition-colors duration-300"
    >
      {lang === 'en' ? 'VI' : 'EN'}
    </motion.button>
  );
}
