'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'vi';

export const translations = {
  en: {
    tagline: 'building the web from Vietnam',
    available: 'Available for work',
    nav: ['About', 'Work', 'Skills', 'Contact'],
    about: {
      title: 'About',
      bio: `I enjoy designing and building software — from web apps and APIs to small tools that solve everyday problems. I care about clean code, thoughtful UX, and shipping work that actually gets used.`,
      openToWork: ['Open', 'to work'],
      webDev: ['Web', 'Dev'],
      status: 'Status',
      discipline: 'Discipline',
    },
    timeline: {
      title: 'Timeline',
      items: [
        { year: '2024 –', role: 'Freelance Web Developer', desc: 'Building bespoke web experiences for clients.' },
        { year: '2023', role: 'How to Learn Vietnamese', desc: 'Launched an online learning resource.' },
        { year: '2022', role: 'Started Web Development', desc: 'Fell deep into React, TypeScript, and the web.' },
        { year: '2020', role: 'Computer Science Studies', desc: 'Foundation in algorithms, systems, and software.' },
      ],
    },
    work: { title: 'Work' },
    skills: { title: 'Skills' },
    contact: { title: 'Contact', lets: "Let's", talk: 'Talk.' },
  },
  vi: {
    tagline: 'xây dựng web từ Việt Nam',
    available: 'Sẵn sàng làm việc',
    nav: ['Về tôi', 'Dự án', 'Kỹ năng', 'Liên hệ'],
    about: {
      title: 'Về tôi',
      bio: 'Tôi thích thiết kế và xây dựng phần mềm — từ ứng dụng web và API đến những công cụ nhỏ giải quyết vấn đề hàng ngày. Tôi coi trọng code sạch, UX chu đáo và sản phẩm thực sự được sử dụng.',
      openToWork: ['Sẵn sàng', 'làm việc'],
      webDev: ['Lập trình', 'Web'],
      status: 'Trạng thái',
      discipline: 'Chuyên môn',
    },
    timeline: {
      title: 'Hành trình',
      items: [
        { year: '2024 –', role: 'Lập trình viên tự do', desc: 'Xây dựng trải nghiệm web cho khách hàng.' },
        { year: '2023', role: 'How to Learn Vietnamese', desc: 'Ra mắt tài nguyên học tiếng Việt trực tuyến.' },
        { year: '2022', role: 'Bắt đầu lập trình Web', desc: 'Đắm mình vào React, TypeScript và web.' },
        { year: '2020', role: 'Học Khoa học Máy tính', desc: 'Nền tảng về thuật toán, hệ thống và phần mềm.' },
      ],
    },
    work: { title: 'Dự án' },
    skills: { title: 'Kỹ năng' },
    contact: { title: 'Liên hệ', lets: 'Hãy', talk: 'nói chuyện.' },
  },
} as const;

type Translations = typeof translations.en;

interface LangCtx {
  lang: Lang;
  toggle: () => void;
  t: Translations;
}

const LangContext = createContext<LangCtx>({ lang: 'en', toggle: () => {}, t: translations.en });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  return (
    <LangContext.Provider value={{ lang, toggle: () => setLang(l => l === 'en' ? 'vi' : 'en'), t: translations[lang] as Translations }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
