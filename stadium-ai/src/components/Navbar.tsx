'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

interface NavbarProps {
  user?: { name: string; role: string } | null;
  onLogout?: () => void;
}

export function Navbar({ user, onLogout }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLanding = pathname === '/';

  const handleLogout = () => {
    if (onLogout) onLogout();
    router.push('/');
  };

  return (
    <nav className={`sticky top-0 z-50 w-full backdrop-blur-md border-b transition-all duration-300 ${
      isLanding 
        ? 'bg-navy-950/70 border-white/5 shadow-sm' 
        : 'bg-navy-900/90 border-white/10 shadow-lg shadow-navy-950/20'
    }`} role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group" aria-label="StadiumAI Home">
            <div className="w-9 h-9 bg-blue-600 rounded-md flex items-center justify-center shadow-md shadow-blue-500/20 transition-transform group-hover:scale-105 border border-blue-300/20">
              <span className="text-white font-extrabold text-sm tracking-wider">S</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight transition-colors group-hover:text-blue-300">StadiumAI</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <span className="text-blue-100/90 text-sm font-medium bg-white/5 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  {user.name} <span className="opacity-60 text-xs">({user.role})</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="text-white/80 hover:text-white transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2 rounded-lg hover:bg-white/5"
                  aria-label="Logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-white/80 hover:text-white transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2 rounded-lg hover:bg-white/5">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md shadow-blue-600/20"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4">
            {user ? (
              <div className="flex flex-col gap-2">
                <span className="text-blue-200 text-sm px-3">{user.name} ({user.role})</span>
                <button onClick={handleLogout} className="text-white/80 hover:text-white transition-colors text-sm px-3 py-2 text-left">Logout</button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/login" className="text-white/80 hover:text-white transition-colors text-sm px-3 py-2" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link href="/register" className="text-white bg-blue-600 px-3 py-2 rounded text-sm" onClick={() => setMenuOpen(false)}>Get Started</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
