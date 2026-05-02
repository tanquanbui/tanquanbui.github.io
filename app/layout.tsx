import type { Metadata } from 'next';
import { Titillium_Web } from 'next/font/google';
import './globals.css';

const titillium = Titillium_Web({
  subsets: ['latin'],
  weight: ['200', '400', '600', '700'],
  variable: '--font-titillium',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tan Quan Bui | Portfolio',
  description: 'Software developer building useful things on the web.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={titillium.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
