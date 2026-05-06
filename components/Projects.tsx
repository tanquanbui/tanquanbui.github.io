'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import ProjectModal from './ProjectModal';
import Section from './Section';
import { useLang } from '@/lib/lang';

// ── Decorative SVG elements (parallax on mouse) ──────────────────────────────

function FolioDecor() {
  return (
    <svg width="380" height="260" viewBox="0 0 380 260" fill="none">
      {Array.from({ length: 9 }).map((_, i) => (
        <rect
          key={i}
          x={14 + (i % 3) * 122}
          y={14 + Math.floor(i / 3) * 78}
          width="104"
          height="64"
          rx="8"
          fill="#1C1A1A"
          opacity={0.08 + (i % 3) * 0.025}
        />
      ))}
      {/* Simulated image placeholder bars */}
      {Array.from({ length: 9 }).map((_, i) => (
        <rect
          key={`b${i}`}
          x={14 + (i % 3) * 122}
          y={54 + Math.floor(i / 3) * 78}
          width={60 + (i % 4) * 8}
          height="6"
          rx="3"
          fill="#1C1A1A"
          opacity={0.12}
        />
      ))}
    </svg>
  );
}

// Precompute wave path so it's stable across renders
const tempoWave1 = Array.from({ length: 100 }, (_, i) => {
  const t = i / 99;
  const x = t * 400;
  const y = 130 + Math.sin(t * Math.PI * 7) * 58 * Math.sin(t * Math.PI);
  return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
}).join(' ');

const tempoWave2 = Array.from({ length: 100 }, (_, i) => {
  const t = i / 99;
  const x = t * 400;
  const y = 130 + Math.sin(t * Math.PI * 5 + 1.2) * 38 * Math.sin(t * Math.PI);
  return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
}).join(' ');

function TempoDecor() {
  return (
    <svg width="400" height="260" viewBox="0 0 400 260" fill="none">
      <path d={tempoWave1} stroke="#1C1A1A" strokeWidth="2.5" strokeLinecap="round" opacity={0.14} />
      <path d={tempoWave2} stroke="#1C1A1A" strokeWidth="1.5" strokeLinecap="round" opacity={0.09} />
      {/* Frequency dots */}
      {Array.from({ length: 18 }, (_, i) => {
        const x = 18 + i * 21;
        const h = 18 + Math.sin(i * 0.9) * 14 + Math.sin(i * 2.1) * 10;
        return <rect key={i} x={x} y={130 - h / 2} width="9" height={h} rx="4" fill="#1C1A1A" opacity={0.1} />;
      })}
    </svg>
  );
}

function FormaDecor() {
  return (
    <svg width="360" height="260" viewBox="0 0 360 260" fill="none">
      {/* Oversized italic letterforms */}
      <text x="50%" y="72%" fontSize="220" fontStyle="italic" fontWeight="700"
        textAnchor="middle" fill="#1C1A1A" opacity={0.07} fontFamily="serif">
        Aa
      </text>
      {/* Type metric lines */}
      {[38, 72, 188, 210].map((y) => (
        <line key={y} x1="20" y1={y} x2="340" y2={y} stroke="#1C1A1A" strokeWidth="1" opacity={0.1} />
      ))}
    </svg>
  );
}

// ── Project data ──────────────────────────────────────────────────────────────

export const projects = [
  {
    title: 'Folio',
    subtitle: 'Portfolio builder for creative studios',
    description: 'A minimal, opinionated portfolio platform built for artists and designers who want to focus on their work — not their website. Drag, compose, publish.',
    href: '#',
    tag: 'Web App',
    year: '2024',
    swatches: ['#E8C860', '#D4A830', '#C8922A'],
    gradient: 'linear-gradient(145deg, #F0DC90 0%, #D4A030 100%)',
    accent: '#9A6C14',
    Decor: FolioDecor,
  },
  {
    title: 'Forma',
    subtitle: 'Live typography exploration tool',
    description: 'Manipulate typefaces in real time — weight, width, optical size, letter-spacing. Export your decisions as CSS custom properties or design tokens.',
    href: '#',
    tag: 'Experiment',
    year: '2023',
    swatches: ['#8AAA88', '#6A8A68', '#4A6B48'],
    gradient: 'linear-gradient(145deg, #B8D4B0 0%, #6A9060 100%)',
    accent: '#3A5C38',
    Decor: FormaDecor,
  },
  {
    title: 'Tempo',
    subtitle: 'Audio-reactive generative art',
    description: 'Feed it sound; it gives you motion. An experiment in translating frequency, rhythm, and timbre into real-time generative visuals.',
    href: '#',
    tag: 'Art',
    year: '2023',
    swatches: ['#D4805A', '#C06040', '#A84828'],
    gradient: 'linear-gradient(145deg, #E0A080 0%, #B85030 100%)',
    accent: '#8A3018',
    Decor: TempoDecor,
  },
];

// ── Project card ──────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: typeof projects[0];
  index: number;
  onOpen: () => void;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const spring = { stiffness: 70, damping: 18 };
  const decorX = useSpring(useTransform(mouseX, [0, 1], [-28, 28]), spring);
  const decorY = useSpring(useTransform(mouseY, [0, 1], [-18, 18]), spring);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.button
      ref={cardRef}
      onClick={onOpen}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover="hovered"
      className="group relative w-full overflow-hidden rounded-2xl text-left cursor-pointer"
      style={{
        minHeight: 'clamp(260px, 50vh, 480px)',
        background: project.gradient,
      }}
    >
      {/* Decorative SVG — tracks mouse */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ x: decorX, y: decorY }}
      >
        <project.Decor />
      </motion.div>

      {/* Hover scrim */}
      <motion.div
        className="absolute inset-0 bg-white/0"
        variants={{ hovered: { backgroundColor: 'rgba(255,255,255,0.06)' } }}
        transition={{ duration: 0.3 }}
      />

      {/* Top metadata */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-7 sm:px-10 pt-7">
        <span
          className="text-[10px] tracking-[0.32em] uppercase font-semibold"
          style={{ color: project.accent }}
        >
          0{index + 1}
        </span>
        <div className="flex items-center gap-4">
          <span className="text-[10px] tracking-[0.22em] uppercase text-ink/65">{project.year}</span>
          <span
            className="text-[10px] tracking-[0.22em] uppercase"
            style={{ color: project.accent + 'BB' }}
          >
            {project.tag}
          </span>
        </div>
      </div>

      {/* Center description — appears on hover */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center px-10 sm:px-16"
        initial={{ opacity: 0 }}
        variants={{ hovered: { opacity: 1 } }}
        transition={{ duration: 0.28 }}
      >
        <p className="font-light text-sm sm:text-base text-ink/65 leading-relaxed text-center max-w-xs sm:max-w-sm">
          {project.description}
        </p>
      </motion.div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-7 sm:px-10 pb-7">
        <div>
          <motion.h3
            className="font-bold tracking-tighter text-ink leading-none"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)' }}
            variants={{ hovered: { y: -5 } }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          >
            {project.title}
          </motion.h3>
          <motion.p
            className="text-[11px] tracking-[0.18em] uppercase text-ink/45 mt-2"
            variants={{ hovered: { opacity: 0 } }}
            transition={{ duration: 0.2 }}
          >
            {project.subtitle}
          </motion.p>
          <p className="sm:hidden font-light text-sm text-ink/55 leading-relaxed mt-3 max-w-[85%]">
            {project.description}
          </p>
        </div>
        <motion.span
          className="text-xl sm:text-2xl text-ink/50 shrink-0 mb-1"
          variants={{ hovered: { x: 5, rotate: -40 } }}
          style={{ color: project.accent + '99' }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          →
        </motion.span>
      </div>
    </motion.button>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function Projects() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLang();

  const open = (i: number) => { setSelectedIndex(i); setIsOpen(true); };

  return (
    <>
      <Section id="projects" title={t.work.title} alt index={2}>
        <div className="flex flex-col gap-4 sm:gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} onOpen={() => open(i)} />
          ))}
        </div>
      </Section>

      <ProjectModal
        projects={projects}
        selectedIndex={selectedIndex}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onChange={setSelectedIndex}
      />
    </>
  );
}
