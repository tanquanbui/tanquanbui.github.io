import Section from './Section';

export default function About() {
  return (
    <Section id="about" title="About" index={1}>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-16 items-start">
        {/* Bio */}
        <p className="font-light text-base leading-9 text-ash max-w-xl">
          Hi, I&apos;m Quan. I enjoy{' '}
          <span className="font-semibold text-ink">designing and building</span>{' '}
          software — from web apps and APIs to small tools that solve everyday
          problems. I care about{' '}
          <span className="italic text-ink">clean code, thoughtful UX,</span>{' '}
          and shipping work that actually gets used.
        </p>

        {/* Bold side stats */}
        <div className="flex flex-row md:flex-col gap-10 md:gap-8 shrink-0">
          <div>
            <p className="font-black text-5xl text-ink leading-none tracking-tighter">Open</p>
            <p className="font-black text-5xl text-ink leading-none tracking-tighter">to work</p>
            <p className="text-[11px] tracking-[0.2em] uppercase text-ash mt-2">Status</p>
          </div>
          <div>
            <p className="font-black text-5xl text-ink leading-none tracking-tighter">Web</p>
            <p className="font-black text-5xl text-ink leading-none tracking-tighter">Dev</p>
            <p className="text-[11px] tracking-[0.2em] uppercase text-ash mt-2">Discipline</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
