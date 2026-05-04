'use client';

import { motion } from 'framer-motion';

const blobs = [
  {
    color: 'rgba(190, 172, 226, 0.4)',
    positions: ['15% 20%', '70% 60%', '15% 20%'],
    duration: 18,
  },
  {
    color: 'rgba(238, 190, 205, 0.35)',
    positions: ['80% 15%', '25% 75%', '80% 15%'],
    duration: 22,
  },
  {
    color: 'rgba(178, 215, 195, 0.3)',
    positions: ['50% 80%', '15% 30%', '50% 80%'],
    duration: 26,
  },
  {
    color: 'rgba(245, 208, 180, 0.25)',
    positions: ['40% 10%', '85% 80%', '40% 10%'],
    duration: 20,
  },
];

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 bg-paper">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{
            background: blob.positions.map(
              (pos) => `radial-gradient(ellipse 55% 45% at ${pos}, ${blob.color}, transparent)`
            ),
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
