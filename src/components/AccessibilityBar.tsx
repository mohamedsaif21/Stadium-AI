'use client';

import { useState } from 'react';
import { useAccessibility } from './AccessibilityProvider';

export function AccessibilityBar() {
  const { highContrast, largeText, toggleHighContrast, toggleLargeText } = useAccessibility();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2" role="toolbar" aria-label="Accessibility controls">
      {open && (
        <div className="bg-navy-900 border border-white/10 rounded-xl p-2.5 shadow-2xl flex flex-col gap-1.5 glass-panel mr-1">
          <button
            onClick={toggleHighContrast}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold w-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              highContrast ? 'bg-yellow-400 text-black shadow-md' : 'text-white hover:bg-white/5'
            }`}
            aria-label={`${highContrast ? 'Disable' : 'Enable'} high contrast mode`}
            aria-pressed={highContrast}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Contrast
          </button>
          <button
            onClick={toggleLargeText}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold w-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              largeText ? 'bg-yellow-400 text-black shadow-md' : 'text-white hover:bg-white/5'
            }`}
            aria-label={`${largeText ? 'Disable' : 'Enable'} large text mode`}
            aria-pressed={largeText}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
            Large Text
          </button>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="p-3.5 rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center hover:scale-105 active:scale-95"
        aria-label="Accessibility options menu"
        aria-expanded={open}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </div>
  );
}
