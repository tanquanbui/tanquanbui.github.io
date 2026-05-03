'use client';

import { motion } from 'framer-motion';

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
            duration: 0.7,
            delay: startDelay + i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-5 sm:px-8"
    >
      <h1
        className="leading-[0.82] tracking-tighter text-ink w-full"
        style={{ fontSize: 'clamp(4.5rem, 18.5vw, 18rem)' }}
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
      </h1>
    </section>
  );
}
