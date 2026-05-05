'use client';

import { motion } from 'framer-motion';
import Section from './Section';
import { useLang } from '@/lib/lang';

const links = [
  { label: 'Email', href: 'mailto:hello@example.com', display: 'hello@example.com' },
  { label: 'GitHub', href: 'https://github.com/tanquanbui', display: 'github.com/tanquanbui' },
  { label: 'LinkedIn', href: '#', display: 'linkedin.com/in/tanquanbui' },
];

export default function Contact() {
  const { t } = useLang();
  const { title, lets, talk } = t.contact;

  return (
    <Section id="contact" title={title} alt index={4}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-32 items-end">

        {/* Big heading — left */}
        <motion.p
          className="leading-[0.82] tracking-tighter text-ink"
          style={{ fontSize: 'clamp(2.8rem, 13vw, 12rem)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.01, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
        >
          <span className="block font-bold">{lets}</span>
          <span className="block font-serif font-light italic text-clay">{talk}</span>
        </motion.p>

        {/* Links — right, bottom-aligned */}
        <div className="flex flex-col gap-0">
          {links.map(({ label, href, display }, i) => (
            <motion.div
              key={label}
              className="flex items-center gap-6 py-4 sm:py-5 border-b border-linen/40"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 180, damping: 20, delay: 0.1 + i * 0.09 }}
            >
              <span className="text-xs tracking-[0.2em] uppercase text-ash/65 w-14 shrink-0">
                {label}
              </span>
              <motion.a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="font-light text-sm text-ink break-all sm:whitespace-nowrap"
                whileHover={{ x: 5, color: '#A896D0', transition: { type: 'spring', stiffness: 500, damping: 20 } }}
                whileTap={{ scale: 0.97 }}
              >
                {display}
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
