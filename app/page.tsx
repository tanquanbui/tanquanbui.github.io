import Background from '@/components/Background';
import Cursor from '@/components/Cursor';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollProgress from '@/components/ScrollProgress';
import Intro from '@/components/Intro';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Timeline from '@/components/Timeline';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AmbientSound from '@/components/AmbientSound';
import LangToggle from '@/components/LangToggle';
import { LangProvider } from '@/lib/lang';

export default function Home() {
  return (
    <LangProvider>
      <SmoothScroll />
      <Cursor />
      <ScrollProgress />
      <Intro />
      <Background />
      <Nav />
      <AmbientSound />
      <LangToggle />
      <main className="relative z-10">
        <Hero />
        <About />
        <Timeline />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </LangProvider>
  );
}
