'use client';

import { motion } from 'framer-motion';
import Section from './Section';

const links = [
  { label: 'Email', href: 'mailto:hello@example.com', display: 'hello@example.com' },
  { label: 'GitHub', href: 'https://github.com/tanquanbui', display: 'github.com/tanquanbui' },
  { label: 'LinkedIn', href: '#', display: 'linkedin.com/in/tanquanbui' },
];

export default function Contact() {
  return (
    <Section id="contact" title="Contact" alt index={4}>
      <div className="mb-16">
        <motion.p
          className="leading-[0.85] tracking-tighter text-ink"
          style={{ fontSize: 'clamp(3.5rem, 12vw, 11rem)' }}
          whileHover={{ scale: 1.01, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
        >
          <span className="font-bold">Let&apos;s</span><br />
          <span className="font-light italic">Talk.</span>
        </motion.p>
      </div>

      <div className="flex flex-col max-w-lg">
        {links.map(({ label, href, display }, i) => (
          <motion.div
            key={label}
            className="flex items-center gap-8 py-5 border-b border-linen"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: i * 0.08 }}
          >
            <span className="text-[10px] tracking-[0.28em] uppercase text-ash/50 w-16 shrink-0">
              {label}
            </span>
            <motion.a
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="font-light text-sm text-ink"
              whileHover={{
                x: 6,
                color: '#A896D0',
                transition: { type: 'spring', stiffness: 500, damping: 20 },
              }}
              whileTap={{ scale: 0.97 }}
            >
              {display}
            </motion.a>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
