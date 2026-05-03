import Section from './Section';

const links = [
  { label: 'Email', href: 'mailto:hello@example.com', display: 'hello@example.com' },
  { label: 'GitHub', href: 'https://github.com/tanquanbui', display: 'github.com/tanquanbui' },
  { label: 'LinkedIn', href: '#', display: 'linkedin.com/in/tanquanbui' },
];

export default function Contact() {
  return (
    <Section id="contact" title="Contact" alt index={4}>
      {/* Big featured heading */}
      <div className="mb-16">
        <p
          className="font-black leading-[0.85] tracking-tighter text-ink"
          style={{ fontSize: 'clamp(3.5rem, 12vw, 11rem)' }}
        >
          Let&apos;s<br />Talk.
        </p>
      </div>

      {/* Contact links */}
      <div className="flex flex-col max-w-lg">
        {links.map(({ label, href, display }) => (
          <div
            key={label}
            className="flex items-center gap-8 py-5 border-b border-linen"
          >
            <span className="text-[10px] tracking-[0.28em] uppercase font-sans text-ash/50 w-16 shrink-0">
              {label}
            </span>
            <a
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="font-sans font-light text-sm text-ink hover:text-clay transition-colors duration-300"
            >
              {display}
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}
