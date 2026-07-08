'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  largeText: boolean;
  theme: 'light' | 'dark';
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleTheme: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType>({
  highContrast: false,
  largeText: false,
  theme: 'light',
  toggleHighContrast: () => {},
  toggleLargeText: () => {},
  toggleTheme: () => {},
});

export function useAccessibility() {
  return useContext(AccessibilityContext);
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('stadiumai_theme');
    const storedContrast = localStorage.getItem('stadiumai_high_contrast');
    const storedLargeText = localStorage.getItem('stadiumai_large_text');
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;

    setTheme(storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : prefersDark ? 'dark' : 'light');
    setHighContrast(storedContrast === 'true');
    setLargeText(storedLargeText === 'true');
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    root.dataset.theme = theme;
    root.classList.toggle('theme-dark', theme === 'dark');
    root.classList.toggle('high-contrast', highContrast);
    root.classList.toggle('large-text', largeText);

    localStorage.setItem('stadiumai_theme', theme);
    localStorage.setItem('stadiumai_high_contrast', String(highContrast));
    localStorage.setItem('stadiumai_large_text', String(largeText));
  }, [highContrast, largeText, theme]);

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        largeText,
        theme,
        toggleHighContrast: () => setHighContrast(prev => !prev),
        toggleLargeText: () => setLargeText(prev => !prev),
        toggleTheme: () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark')),
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}
