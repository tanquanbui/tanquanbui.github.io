'use client';

import { motion } from 'framer-motion';

export default function Background() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#191919]">
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(239,237,234,0.06), transparent 50%)',
            'radial-gradient(circle at 80% 70%, rgba(239,237,234,0.06), transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(239,237,234,0.06), transparent 50%)',
          ],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0"
      />
    </div>
  );
}
