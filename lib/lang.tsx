'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'vi';

export const translations = {
  en: {
    tagline: 'building the web from Melbourne',
    available: 'Available for work',
    nav: ['About', 'Work', 'Skills', 'Contact'],
    about: {
      title: 'About',
      bio: `I make things on the web that feel alive — digital experiences where code and craft blur into something you can feel. Based in Melbourne, working at the intersection of design, motion, and software.`,
      openToWork: ['Open', 'to work'],
      webDev: ['Web', 'Dev'],
      status: 'Status',
      discipline: 'Discipline',
    },
    story: {
      title: 'My Story',
      items: [
        { year: '2020', role: 'Computer Science Studies', desc: 'Foundation in algorithms, systems, and software.' },
        { year: '2022', role: 'Started Web Development', desc: 'Fell deep into React, TypeScript, and the web.' },
        { year: '2023', role: 'How to Learn Vietnamese', desc: 'Launched an online learning resource.' },
        { year: '2024 –', role: 'Freelance Web Developer', desc: 'Building bespoke web experiences for clients.' },
      ],
    },
    work: { title: 'Work' },
    skills: { title: 'Skills' },
    contact: { title: 'Contact', lets: "Let's", talk: 'Talk.' },
    menu: { start: 'Enter Site', back: 'Menu' },
  },
  vi: {
    tagline: 'xây dựng web từ Melbourne',
    available: 'Sẵn sàng làm việc',
    nav: ['Về tôi', 'Dự án', 'Kỹ năng', 'Liên hệ'],
    about: {
      title: 'Về tôi',
      bio: 'Tôi tạo ra những thứ trên web mang lại cảm giác sống động — những trải nghiệm kỹ thuật số nơi code và nghệ thuật hòa quyện thành điều bạn có thể cảm nhận. Làm việc tại điểm giao thoa giữa thiết kế, chuyển động và phần mềm.',
      openToWork: ['Sẵn sàng', 'làm việc'],
      webDev: ['Lập trình', 'Web'],
      status: 'Trạng thái',
      discipline: 'Chuyên môn',
    },
    story: {
      title: 'Câu Chuyện Của Tôi',
      items: [
        { year: '2020', role: 'Học Khoa học Máy tính', desc: 'Nền tảng về thuật toán, hệ thống và phần mềm.' },
        { year: '2022', role: 'Bắt đầu lập trình Web', desc: 'Đắm mình vào React, TypeScript và web.' },
        { year: '2023', role: 'How to Learn Vietnamese', desc: 'Ra mắt tài nguyên học tiếng Việt trực tuyến.' },
        { year: '2024 –', role: 'Lập trình viên tự do', desc: 'Xây dựng trải nghiệm web cho khách hàng.' },
      ],
    },
    work: { title: 'Dự án' },
    skills: { title: 'Kỹ năng' },
    contact: { title: 'Liên hệ', lets: 'Hãy', talk: 'nói chuyện.' },
    menu: { start: 'Vào trang', back: 'Menu' },
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
