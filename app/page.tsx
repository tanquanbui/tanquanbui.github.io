'use client';

import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Background from '@/components/Background';
import Cursor from '@/components/Cursor';
import Intro from '@/components/Intro';
import Nav from '@/components/Nav';
import GameMenu from '@/components/GameMenu';
import ViewFrame from '@/components/ViewFrame';
import About from '@/components/About';
import Philosophy from '@/components/Philosophy';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import AmbientSound from '@/components/AmbientSound';
import LangToggle from '@/components/LangToggle';
import { LangProvider } from '@/lib/lang';
import { ViewProvider, useView } from '@/lib/view';

function ActiveView() {
  const { view, setView } = useView();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setView('menu');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setView]);

  return (
    <AnimatePresence mode="wait">
      {view === 'about' && (
        <ViewFrame key="about"><About /></ViewFrame>
      )}
      {view === 'philosophy' && (
        <ViewFrame key="philosophy"><Philosophy /></ViewFrame>
      )}
      {view === 'projects' && (
        <ViewFrame key="projects"><Projects /></ViewFrame>
      )}
      {view === 'skills' && (
        <ViewFrame key="skills"><Skills /></ViewFrame>
      )}
      {view === 'contact' && (
        <ViewFrame key="contact"><Contact /></ViewFrame>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  return (
    <LangProvider>
      <ViewProvider>
        <Cursor />
        <Intro />
        <Background />
        <Nav />
        <AmbientSound />
        <LangToggle />
        <GameMenu />
        <ActiveView />
      </ViewProvider>
    </LangProvider>
  );
}
