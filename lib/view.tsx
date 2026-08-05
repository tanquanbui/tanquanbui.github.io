'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

export const views = ['about', 'story', 'projects', 'skills', 'contact'] as const;
export type View = 'menu' | (typeof views)[number];

interface ViewCtx {
  view: View;
  setView: (v: View) => void;
}

const ViewContext = createContext<ViewCtx>({ view: 'menu', setView: () => {} });

export function ViewProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>('menu');
  return <ViewContext.Provider value={{ view, setView }}>{children}</ViewContext.Provider>;
}

export const useView = () => useContext(ViewContext);
