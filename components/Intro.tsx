'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// ViewBox 0 0 520 360
// Q centered ~145,155  |  B spine at x=315
const strokes = [
  // ── Q body ──────────────────────────────────────────────────────────────
  {
    d: 'M 145,45 C 198,38 252,72 264,130 C 276,188 248,248 198,268 C 148,288 95,275 62,238 C 28,202 28,148 55,108 C 78,72 115,50 145,45',
    delay: 0.38, dur: 0.82, w: 7.5,
  },
  // Q inner highlight (calligraphic thinning on left side)
  {
    d: 'M 148,58 C 190,52 230,78 246,118 C 260,156 252,200 232,226',
    delay: 0.46, dur: 0.62, w: 2.5, opacity: 0.22,
  },
  // Q tail with terminal curl
  {
    d: 'M 218,243 C 242,264 264,278 286,290 C 302,298 316,290 308,276 C 302,266 287,265 281,272',
    delay: 1.14, dur: 0.38, w: 6,
  },
  // ── ink micro-splatters near tail lift-off ───────────────────────────
  { d: 'M 294,283 C 298,278 303,281 300,286', delay: 1.5, dur: 0.1, w: 2, opacity: 0.48 },
  { d: 'M 308,273 C 312,268 316,271 313,277', delay: 1.53, dur: 0.09, w: 1.5, opacity: 0.38 },
  { d: 'M 286,293 C 284,298 288,301 292,297', delay: 1.56, dur: 0.08, w: 1.2, opacity: 0.3 },
  // ── top-left decorative flourish ─────────────────────────────────────
  {
    d: 'M 20,74 C 9,52 18,30 40,28 C 58,26 68,41 60,56',
    delay: 0.52, dur: 0.34, w: 1.6, opacity: 0.36,
  },
  // ── B ────────────────────────────────────────────────────────────────
  // Spine
  {
    d: 'M 318,46 L 318,298',
    delay: 1.62, dur: 0.44, w: 9.5,
  },
  // Top serif
  { d: 'M 297,46 L 340,46', delay: 1.62, dur: 0.14, w: 3.5, opacity: 0.84 },
  // Top bowl
  {
    d: 'M 318,46 C 372,46 414,68 418,106 C 422,144 400,170 318,174',
    delay: 2.04, dur: 0.46, w: 7,
  },
  // Bottom bowl (wider — characteristic of B)
  {
    d: 'M 318,174 C 415,172 458,198 460,240 C 462,282 418,298 318,298',
    delay: 2.44, dur: 0.52, w: 7,
  },
  // Bottom serif
  { d: 'M 296,298 L 344,298', delay: 2.92, dur: 0.14, w: 3.5, opacity: 0.84 },
  // ── underline flourish ───────────────────────────────────────────────
  {
    d: 'M 16,332 C 100,322 390,322 504,332',
    delay: 3.08, dur: 0.48, w: 1.8, opacity: 0.32,
  },
] as const;

// Small ink dots that permanently appear as splatter marks
const permSplatters = [
  { cx: 129, cy: 41 }, { cx: 163, cy: 39 }, { cx: 148, cy: 32 },
  { cx: 122, cy: 52 }, { cx: 169, cy: 50 },
];

export default function Intro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // last stroke ends at ≈3.56 s → hold 0.5 s → exit at 4.06 s
    const t = setTimeout(() => setVisible(false), 4060);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.88, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] bg-paper flex items-center justify-center overflow-hidden"
        >
          <svg
            viewBox="0 0 520 360"
            className="w-[min(78vw,400px)] h-auto"
            fill="none"
            overflow="visible"
          >
            <defs>
              {/* Ink texture: slight warp + soft edge = hand-brushed feel */}
              <filter id="ink" x="-8%" y="-8%" width="116%" height="116%">
                <feTurbulence type="fractalNoise" baseFrequency="0.88" numOctaves="4" seed="7" result="n" />
                <feDisplacementMap in="SourceGraphic" in2="n" scale="1.3" result="w" />
                <feGaussianBlur in="w" stdDeviation="0.52" />
              </filter>
              {/* Soft glow for the falling drop */}
              <filter id="dropglow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="4" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* ── Ink drop falling to seed the Q stroke ── */}
            <motion.ellipse
              cx={145} cy={-20} rx={4} ry={6}
              fill="#1C1A1A"
              filter="url(#dropglow)"
              initial={{ cy: -24, opacity: 1 }}
              animate={{ cy: 44, opacity: 1 }}
              transition={{ delay: 0.04, duration: 0.26, ease: [0.5, 0, 1, 1] }}
            />

            {/* Drop impact ring */}
            <motion.ellipse
              cx={145} cy={44} rx={0} ry={0}
              fill="none" stroke="#1C1A1A" strokeWidth={1.8}
              initial={{ rx: 0, ry: 0, opacity: 0.7 }}
              animate={{ rx: 20, ry: 9, opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.42, ease: [0, 0, 0.4, 1] }}
            />

            {/* Permanent splatter dots left by the impact */}
            {permSplatters.map((s, i) => (
              <motion.circle
                key={i}
                cx={s.cx} cy={s.cy} r={1.4}
                fill="#1C1A1A"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.55, 0.38] }}
                transition={{ delay: 0.28 + i * 0.03, duration: 0.35 }}
              />
            ))}

            {/* ── Ink strokes ── */}
            {strokes.map((s, i) => (
              <motion.path
                key={i}
                d={s.d}
                stroke="#1C1A1A"
                strokeWidth={s.w}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#ink)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 'opacity' in s ? s.opacity : 1 }}
                transition={{
                  pathLength: {
                    delay: s.delay,
                    duration: s.dur,
                    ease: [0.36, 0, 0.18, 1],
                  },
                  opacity: { delay: s.delay, duration: 0.01 },
                }}
              />
            ))}
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
