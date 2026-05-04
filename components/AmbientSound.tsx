'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

function createPinkNoise(ctx: AudioContext): AudioBufferSourceNode {
  const rate = ctx.sampleRate;
  const buf = ctx.createBuffer(1, rate * 8, rate);
  const d = buf.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < d.length; i++) {
    const w = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + w * 0.0555179;
    b1 = 0.99332 * b1 + w * 0.0750759;
    b2 = 0.96900 * b2 + w * 0.1538520;
    b3 = 0.86650 * b3 + w * 0.3104856;
    b4 = 0.55000 * b4 + w * 0.5329522;
    b5 = -0.7616 * b5 - w * 0.0168980;
    d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.1;
    b6 = w * 0.115926;
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  return src;
}

export default function AmbientSound() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const srcRef = useRef<AudioBufferSourceNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const toggle = () => {
    if (!on) {
      const ctx = new AudioContext();
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 2);
      const src = createPinkNoise(ctx);
      src.connect(gain);
      gain.connect(ctx.destination);
      src.start();
      ctxRef.current = ctx;
      srcRef.current = src;
      gainRef.current = gain;
    } else {
      const ctx = ctxRef.current;
      const gain = gainRef.current;
      if (ctx && gain) {
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
        setTimeout(() => { srcRef.current?.stop(); ctx.close(); }, 1600);
      }
    }
    setOn(v => !v);
  };

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.8 }}
      onClick={toggle}
      className="fixed bottom-7 left-6 z-50 flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-ash/50 hover:text-ash transition-colors duration-300"
    >
      <motion.span
        animate={on ? { scale: [1, 1.4, 1], opacity: [1, 0.5, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
        className={`w-[5px] h-[5px] rounded-full ${on ? 'bg-clay' : 'bg-ash/30'}`}
      />
      {on ? 'sound on' : 'sound'}
    </motion.button>
  );
}
