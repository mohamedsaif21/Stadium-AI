'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Chatbot } from '@/components/Chatbot';
import { EmergencyButton } from '@/components/EmergencyButton';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';

export default function FanDashboard() {
  const { user, loading, logout } = useAuth();
  const [navQuery, setNavQuery] = useState('');
  const [navResult, setNavResult] = useState<{ route?: { instructions: string[]; estimatedMinutes: number; accessible: boolean } } | null>(null);
  const [navLoading, setNavLoading] = useState(false);
  const [navError, setNavError] = useState('');

  const handleNavSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!navQuery.trim()) return;
    setNavLoading(true);
    setNavError('');
    setNavResult(null);

    try {
      const res = await fetch(`/api/navigation?q=${encodeURIComponent(navQuery.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Search failed');
      setNavResult(data);
    } catch (err) {
      setNavError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setNavLoading(false);
    }
  };

  const suggestions = [
    { label: '📍 Gate B', query: 'How do I reach Gate B?' },
    { label: '🚻 Nearest Restroom', query: 'Where is the nearest restroom?' },
    { label: '♿ Wheelchair Access', query: 'I need wheelchair access.' },
    { label: '🚇 Metro After Match', query: 'How do I reach the metro after the match?' },
    { label: '🌐 Translate to Spanish', query: 'Translate Hello to Spanish' },
    { label: '🍔 Food Court', query: 'Where is the food court?' },
  ];

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-semibold text-sm animate-pulse-slow">Loading Matchday Experience...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute role="fan">
      <Navbar user={user || undefined} onLogout={logout} />
      <main className="flex-1 bg-gray-50">
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-blue-950 text-white border-b border-navy-800/40 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse-slow" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-extrabold mb-1 tracking-tight">Fan Dashboard</h1>
            <p className="text-blue-200/80 text-sm font-light font-medium">Welcome, {user?.name || 'Fan'}! Your AI-powered World Cup matchday assistant is live.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100/80">
                <h2 className="text-lg font-bold text-navy-900 tracking-tight mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Stadium Navigation
                </h2>
                <form onSubmit={handleNavSearch} className="mb-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={navQuery}
                      onChange={e => setNavQuery(e.target.value)}
                      placeholder="Search: Gate, seat, restroom, food..."
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all"
                      aria-label="Search stadium locations"
                    />
                    <button
                      type="submit"
                      disabled={navLoading || !navQuery.trim()}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 hover:scale-105 active:scale-95 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md shadow-blue-600/15"
                    >
                      {navLoading ? '...' : 'Search'}
                    </button>
                  </div>
                </form>

                {navError && <p className="text-red-500 text-xs font-semibold mb-3">⚠ {navError}</p>}

                {navResult?.route && (
                  <div className="bg-gradient-to-br from-green-50/70 to-emerald-50/20 border border-green-200/50 rounded-xl p-5 shadow-sm mb-4 animate-fade-in" role="status">
                    <p className="text-green-800 font-bold text-sm mb-3 flex items-center justify-between">
                      <span>⏱ Estimated time: {navResult.route.estimatedMinutes} minutes</span>
                      {navResult.route.accessible && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-extrabold uppercase">♿ Accessible</span>}
                    </p>
                    <ol className="space-y-2">
                      {navResult.route.instructions.map((step, i) => (
                        <li key={i} className="text-xs text-green-700/90 leading-relaxed font-medium flex gap-2">
                          <span className="font-bold font-mono bg-green-100 text-green-800 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]">{i + 1}</span>
                          <span className="pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  {suggestions.slice(0, 4).map(s => (
                    <button
                      key={s.label}
                      onClick={() => {
                        setNavQuery(s.query);
                        setNavResult(null);
                        setNavError('');
                      }}
                      className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-xs text-gray-600 rounded-full hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100/80">
                <h2 className="text-lg font-bold text-navy-900 tracking-tight mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  {suggestions.map(s => (
                    <button
                      key={s.label}
                      onClick={() => setNavQuery(s.query)}
                      className="text-left p-3.5 bg-gray-50/70 hover:bg-blue-50/50 rounded-xl text-xs font-semibold text-gray-700 transition-all border border-gray-100/80 hover:border-blue-200/80 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {s.label.split(' ').slice(1).join(' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100/80">
                <h2 className="text-lg font-bold text-navy-900 tracking-tight mb-3">Accessibility Assistance</h2>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">Need contrast or scaling options? Toggle the settings menu on the bottom right of your screen at any time.</p>
                <div className="flex gap-4 text-xs font-semibold text-gray-400">
                  <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-green-500 rounded-full" />Wheelchair Routes</span>
                  <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-green-500 rounded-full" />Multilingual Support</span>
                </div>
              </div>
            </div>

            <div className="h-[650px]">
              <Chatbot role="fan" />
            </div>
          </div>
        </div>
      </main>
      <EmergencyButton />
    </ProtectedRoute>
  );
}
