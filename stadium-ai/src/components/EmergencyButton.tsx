'use client';

import { useState } from 'react';

export function EmergencyButton() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 6000);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {clicked ? (
        <div className="bg-red-600/90 text-white px-4 py-3.5 rounded-xl shadow-2xl backdrop-blur-md border border-red-500/30 animate-pulse flex flex-col gap-0.5" role="alert">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full animate-ping" />
            <p className="font-semibold text-sm">Emergency Alert Dispatched</p>
          </div>
          <p className="text-xs text-red-100/90">A volunteer supervisor has been alerted to your coordinates.</p>
          <p className="text-xs text-red-200 mt-1 font-medium bg-red-800/40 px-2 py-1 rounded">If serious, call 112 immediately.</p>
        </div>
      ) : (
        <button
          onClick={handleClick}
          className="bg-red-600 text-white px-4 py-3.5 rounded-xl shadow-lg hover:bg-red-700 transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center gap-2 pulse-ring font-semibold text-sm"
          aria-label="Emergency help dispatch"
        >
          <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.27 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          Emergency Help
        </button>
      )}
    </div>
  );
}
