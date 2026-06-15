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

// ── Featured project row ───────────────────────────────────────────────────────

function ProjectRow({
  project,
  index,
  onOpen,
}: {
  project: typeof projects[0];
  index: number;
  onOpen: () => void;
}) {
  const visualRef = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const spring = { stiffness: 70, damping: 18 };
  const decorX = useSpring(useTransform(mouseX, [0, 1], [-24, 24]), spring);
  const decorY = useSpring(useTransform(mouseY, [0, 1], [-16, 16]), spring);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = visualRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Alternate sides on desktop: even = visual left, odd = visual right
  const flip = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="grid gap-7 sm:gap-10 lg:grid-cols-2 lg:items-center"
    >
      {/* ── Visual (screenshot or gradient + decor) ── */}
      <motion.button
        ref={visualRef}
        onClick={onOpen}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover="hovered"
        aria-label={`Open ${project.title} details`}
        className={`group relative w-full overflow-hidden rounded-2xl cursor-pointer ${flip ? 'lg:order-2' : ''}`}
        style={{
          minHeight: 'clamp(220px, 40vh, 380px)',
          background: project.gradient,
        }}
      >
        {project.screenshot ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src={project.screenshot}
              alt={`${project.title} screenshot`}
              className="absolute inset-0 w-full h-full object-cover object-top"
              variants={{ hovered: { scale: 1.04 } }}
              transition={{ type: 'spring', stiffness: 200, damping: 28 }}
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-ink/10 rounded-2xl pointer-events-none" />
          </>
        ) : (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            style={{ x: decorX, y: decorY }}
          >
            <project.Decor />
          </motion.div>
        )}

        {/* Hover scrim */}
        <motion.div
          className="absolute inset-0"
          initial={{ backgroundColor: 'rgba(28,18,8,0)' }}
          variants={{ hovered: { backgroundColor: 'rgba(28,18,8,0.10)' } }}
          transition={{ duration: 0.3 }}
        />

        {/* "View" pill on hover */}
        <motion.span
          className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold text-paper backdrop-blur-sm"
          style={{ backgroundColor: (project.accent ?? '#1C1208') + 'E6' }}
          initial={{ opacity: 0, y: 8 }}
          variants={{ hovered: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.25 }}
        >
          View details →
        </motion.span>
      </motion.button>

      {/* ── Details (always visible) ── */}
      <div className={flip ? 'lg:order-1' : ''}>
        <div className="flex items-center gap-4 mb-4">
          <span
            className="text-[11px] tracking-[0.28em] uppercase font-semibold"
            style={{ color: project.accent }}
          >
            0{index + 1}
          </span>
          <div className="flex-1 h-px bg-linen" />
          <span className="text-[10px] tracking-[0.22em] uppercase text-ink/45">{project.year}</span>
          <span
            className="text-[10px] tracking-[0.22em] uppercase font-medium"
            style={{ color: (project.accent ?? '#1C1208') + 'CC' }}
          >
            {project.tag}
          </span>
        </div>

        <h3
          className="font-bold tracking-tighter text-ink leading-[0.95]"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
        >
          {project.title}
        </h3>

        <p
          className="font-serif font-light italic mt-2 mb-4"
          style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)', color: (project.accent ?? '#1C1208') + 'CC' }}
        >
          {project.subtitle}
        </p>

        <p className="font-light text-ink/65 leading-relaxed max-w-md"
          style={{ fontSize: 'clamp(0.92rem, 1.4vw, 1rem)' }}>
          {project.description}
        </p>

        {/* Tech stack chips */}
        <div className="flex flex-wrap gap-2 mt-5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] tracking-[0.14em] uppercase font-medium px-3 py-1.5 rounded-full bg-linen/50 text-ink/65"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5 mt-7">
          <button
            onClick={onOpen}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold text-paper transition-transform hover:scale-[1.03] active:scale-[0.97]"
            style={{ backgroundColor: project.accent }}
          >
            View details →
          </button>
          {project.href !== '#' && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-[0.2em] uppercase font-medium text-ink/50 hover:text-ink transition-colors"
            >
              Source ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
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
        <div className="flex flex-col gap-20 sm:gap-28">
          {projects.map((project, i) => (
            <ProjectRow key={project.title} project={project} index={i} onOpen={() => open(i)} />
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
