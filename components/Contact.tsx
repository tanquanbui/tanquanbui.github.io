import Section from './Section';

const links = [
  { label: 'Email', href: 'mailto:hello@example.com' },
  { label: 'GitHub', href: 'https://github.com/tanquanbui' },
  { label: 'LinkedIn', href: '#' },
];

export default function Contact() {
  return (
    <Section id="contact" title="Contact" alt>
      <p className="text-lg opacity-90 mb-8 max-w-xl">
        Want to work together or just say hi? Reach out below.
      </p>
      <ul className="flex flex-wrap gap-6">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="text-lg font-semibold border-b border-[#efedea]/40 hover:border-[#efedea] pb-1 transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
