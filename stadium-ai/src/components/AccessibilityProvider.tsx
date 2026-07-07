'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  largeText: boolean;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType>({
  highContrast: false,
  largeText: false,
  toggleHighContrast: () => {},
  toggleLargeText: () => {},
});

export function useAccessibility() {
  return useContext(AccessibilityContext);
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast);
    document.documentElement.classList.toggle('large-text', largeText);
  }, [highContrast, largeText]);

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        largeText,
        toggleHighContrast: () => setHighContrast(prev => !prev),
        toggleLargeText: () => setLargeText(prev => !prev),
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}
