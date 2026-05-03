import Section from './Section';

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-3xl">
        <p className="font-sans font-light text-base leading-8 text-ash">
          Hi, I&apos;m Quan. I enjoy designing and building software — from web
          apps and APIs to small tools that solve everyday problems.
        </p>
        <p className="font-sans font-light text-base leading-8 text-ash">
          I care about clean code, thoughtful UX, and shipping work that
          actually gets used. Details matter.
        </p>
      </div>
    </Section>
  );
}
