'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import ProjectModal from './ProjectModal';
import Section from './Section';
import { useLang } from '@/lib/lang';

// ── Decorative SVG elements (parallax on mouse) ──────────────────────────────

// Precompute waveforms once so they're stable across renders
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

function PitStopDecor() {
  // Telemetry traces + dotted track
  const trace = Array.from({ length: 110 }, (_, i) => {
    const t = i / 109;
    const x = t * 420;
    const y = 130 + Math.sin(t * Math.PI * 4.5) * 42 + Math.cos(t * Math.PI * 9) * 12;
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return (
    <svg width="420" height="260" viewBox="0 0 420 260" fill="none">
      <path d={trace} stroke="#1C1A1A" strokeWidth="2" strokeLinecap="round" opacity={0.12} />
      {/* Sector markers */}
      {[60, 140, 240, 340].map((x) => (
        <line key={x} x1={x} y1="60" x2={x} y2="200" stroke="#1C1A1A" strokeWidth="1" strokeDasharray="3 4" opacity={0.1} />
      ))}
      {/* Speed bars */}
      {Array.from({ length: 22 }, (_, i) => {
        const x = 8 + i * 19;
        const h = 16 + Math.sin(i * 0.7) * 12 + Math.sin(i * 1.7) * 10;
        return <rect key={i} x={x} y={210 - h} width="6" height={h} rx="2" fill="#1C1A1A" opacity={0.09} />;
      })}
    </svg>
  );
}

function NotesDecor() {
  // Stacked note cards with checklist rows
  return (
    <svg width="380" height="260" viewBox="0 0 380 260" fill="none">
      {[0, 1, 2].map((i) => {
        const offset = i * 14;
        return (
          <g key={i} opacity={0.09 + i * 0.025}>
            <rect x={50 + offset} y={36 + offset} width="240" height="170" rx="10" fill="#1C1A1A" />
          </g>
        );
      })}
      {/* Checklist rows on top card */}
      {[0, 1, 2, 3].map((i) => (
        <g key={`row${i}`} opacity={0.18}>
          <rect x={108} y={78 + i * 28} width="12" height="12" rx="3" fill="none" stroke="#1C1A1A" strokeWidth="1.5" />
          {i < 2 && (
            <path d={`M ${110} ${85 + i * 28} L ${114} ${89 + i * 28} L ${120} ${82 + i * 28}`} stroke="#1C1A1A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          )}
          <rect x={130} y={82 + i * 28} width={120 - i * 18} height="4" rx="2" fill="#1C1A1A" opacity={0.6} />
        </g>
      ))}
    </svg>
  );
}

function PersonifyDecor() {
  return (
    <svg width="400" height="260" viewBox="0 0 400 260" fill="none">
      <path d={tempoWave1} stroke="#1C1A1A" strokeWidth="2.5" strokeLinecap="round" opacity={0.14} />
      <path d={tempoWave2} stroke="#1C1A1A" strokeWidth="1.5" strokeLinecap="round" opacity={0.09} />
      {/* Equalizer bars */}
      {Array.from({ length: 18 }, (_, i) => {
        const x = 18 + i * 21;
        const h = 22 + Math.sin(i * 0.9) * 18 + Math.sin(i * 2.1) * 12;
        return <rect key={i} x={x} y={130 - h / 2} width="9" height={h} rx="4" fill="#1C1A1A" opacity={0.1} />;
      })}
    </svg>
  );
}

// ── Project data ──────────────────────────────────────────────────────────────

export const projects = [
  {
    title: 'PitStop Analytics',
    subtitle: 'Serverless F1 race intelligence',
    description: 'A serverless Formula 1 race intelligence platform on AWS — ingests telemetry from FastF1 + Ergast, builds team performance fingerprints, and predicts race outcomes from interpretable signals like qualifying pace, recent form, overtaking, reliability, and track fit.',
    href: 'https://github.com/tanquanbui/FastF1Analysis',
    tag: 'Data · Cloud',
    year: '2025',
    swatches: ['#D43C3C', '#A82828', '#6E1818'],
    gradient: 'linear-gradient(145deg, #E66060 0%, #8A1818 100%)',
    accent: '#5A1010',
    Decor: PitStopDecor,
    screenshot: '/projects/fastf1.png',
    stack: ['Python', 'AWS Lambda', 'DynamoDB', 'SageMaker', 'CloudFront', 'FastF1', 'XGBoost'],
  },
  {
    title: 'Notes',
    subtitle: 'Interactive task management',
    description: 'A full-stack task management tool focused on interactive design — add tasks with tags, toggle completion, and persist across sessions. Built with React on the front, Node + Express + MongoDB Atlas on the back.',
    href: 'https://github.com/tanquanbui/Interactive-todo-list',
    tag: 'Web App',
    year: '2024',
    swatches: ['#E8A86B', '#D48A45', '#A66628'],
    gradient: 'linear-gradient(145deg, #F2C48F 0%, #C07840 100%)',
    accent: '#7A4818',
    Decor: NotesDecor,
    screenshot: '/projects/todo.png',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Axios'],
  },
  {
    title: 'Personify',
    subtitle: 'Spotify listening habits, visualized',
    description: 'A web application that visualizes your Spotify listening patterns — top tracks, artists, and genres — through interactive D3 charts and parallax-driven storytelling powered by the Spotify Web API.',
    href: 'https://github.com/tanquanbui/personify-spotify-analysis',
    tag: 'Web App',
    year: '2024',
    swatches: ['#5FCB6B', '#1DB954', '#0F8C3A'],
    gradient: 'linear-gradient(145deg, #7EE092 0%, #0F8C3A 100%)',
    accent: '#0A6628',
    Decor: PersonifyDecor,
    screenshot: null,
    stack: ['React', 'D3.js', 'Framer Motion', 'Express', 'Spotify Web API'],
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
