'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const words = [
  { text: 'TAN', align: 'text-left', weight: 'font-bold' },
  { text: 'QUAN', align: 'text-center', weight: 'font-light italic' },
  { text: 'BUI', align: 'text-right', weight: 'font-bold' },
];

function RevealWord({
  text,
  align,
  weight,
  startDelay,
}: {
  text: string;
  align: string;
  weight: string;
  startDelay: number;
}) {
  return (
    <div className={`block ${align} overflow-hidden`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className={`inline-block ${weight}`}
          initial={{ y: '105%' }}
          animate={{ y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 180,
            damping: 18,
            delay: startDelay + i * 0.04,
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Name drifts up at 40% of scroll speed — parallax
  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  // Name slowly fades as you scroll away
  const nameOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  // Slight scale-down for depth
  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center px-5 sm:px-8 overflow-hidden"
    >
      <motion.h1
        className="leading-[0.82] tracking-tighter text-ink w-full"
        style={{
          fontSize: 'clamp(4.5rem, 18.5vw, 18rem)',
          y: nameY,
          opacity: nameOpacity,
          scale: nameScale,
        }}
      >
        {words.map((word, i) => (
          <RevealWord
            key={word.text}
            text={word.text}
            align={word.align}
            weight={word.weight}
            startDelay={0.2 + i * 0.18}
          />
        ))}
      </motion.h1>
    </section>
  );
}
