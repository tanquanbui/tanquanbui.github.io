import Section from './Section';

const links = [
  { label: 'Email', href: 'mailto:hello@example.com', display: 'hello@example.com' },
  { label: 'GitHub', href: 'https://github.com/tanquanbui', display: 'github.com/tanquanbui' },
  { label: 'LinkedIn', href: '#', display: 'linkedin.com/in/tanquanbui' },
];

export default function Contact() {
  return (
    <Section id="contact" title="Contact" alt>
      <div className="max-w-lg">
        <p className="font-sans font-light text-base leading-8 text-ash mb-12">
          Have a project in mind or just want to say hello? I&apos;d love to
          hear from you.
        </p>
        <div className="flex flex-col">
          {links.map(({ label, href, display }) => (
            <div
              key={label}
              className="flex items-center gap-8 py-5 border-b border-linen"
            >
              <span className="text-[10px] tracking-[0.28em] uppercase font-sans text-ash/60 w-16 shrink-0">
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
      </div>
    </Section>
  );
}
