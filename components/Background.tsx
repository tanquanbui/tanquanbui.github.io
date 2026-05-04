'use client';

import { motion } from 'framer-motion';

// GPU-safe: animate transform only, not background property
// filter:blur on a transformed element gets compositor-layer cached
const blobs = [
  { color: 'rgba(190,172,226,0.45)', size: '65vw', top: '-10%', left: '-10%', x: [0, 180, -80, 0], y: [0, 120, -60, 0], duration: 20 },
  { color: 'rgba(238,190,205,0.38)', size: '55vw', top: '20%', right: '-15%', x: [0, -160, 60, 0], y: [0, 100, -80, 0], duration: 24 },
  { color: 'rgba(178,215,195,0.32)', size: '50vw', bottom: '-10%', left: '20%', x: [0, 100, -120, 0], y: [0, -80, 60, 0], duration: 28 },
  { color: 'rgba(245,208,180,0.28)', size: '45vw', top: '40%', left: '40%', x: [0, -100, 80, 0], y: [0, 60, -100, 0], duration: 22 },
];

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 bg-paper overflow-hidden">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            background: blob.color,
            filter: 'blur(72px)',
            top: blob.top,
            left: blob.left,
            right: (blob as any).right,
            bottom: (blob as any).bottom,
            willChange: 'transform',
          }}
          animate={{ x: blob.x, y: blob.y }}
          transition={{ duration: blob.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
