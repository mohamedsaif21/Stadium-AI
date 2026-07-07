'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { loginUser, getRedirectPath } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await loginUser(email, password);
      if (result.error) {
        setError(result.error);
        return;
      }
      if (result.user) {
        localStorage.setItem('stadiumai_user', JSON.stringify(result.user));
        router.push(getRedirectPath(result.user.role));
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = async (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setError('');
    setLoading(true);

    try {
      const result = await loginUser(email, password);
      if (result.user) {
        localStorage.setItem('stadiumai_user', JSON.stringify(result.user));
        router.push(getRedirectPath(result.user.role));
      }
    } catch {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
              <span className="text-white font-extrabold text-xl">S</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-navy-900">Welcome back</h2>
            <p className="text-gray-400 text-sm mt-1">Sign in to your StadiumAI account</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100/90 hover:shadow-2xl transition-all">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm flex items-center gap-2" role="alert">
                <span>⚠</span> {error}
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="email" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all bg-gray-50/50 hover:bg-gray-50 focus:bg-white"
                placeholder="you@example.com"
                aria-label="Email address"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all bg-gray-50/50 hover:bg-gray-50 focus:bg-white"
                placeholder="••••••••"
                aria-label="Password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.99] text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md shadow-blue-600/10"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">Register</Link>
            </p>
          </form>

          <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50/30 border border-blue-100/70 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-bold text-blue-900/80 uppercase tracking-wider mb-3">Demo Quick Login</h3>
            <div className="space-y-2">
              <button onClick={() => quickLogin('fan@stadiumai.demo', 'password123')} className="w-full text-left px-3.5 py-2.5 bg-white rounded-xl text-xs hover:bg-blue-50/65 transition-colors border border-blue-100/50 hover:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm flex items-center justify-between">
                <div>
                  <span className="font-semibold text-blue-700 mr-2">Fan</span>
                  <span className="text-gray-400 font-light font-mono">fan@stadiumai.demo</span>
                </div>
                <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold uppercase">Role</span>
              </button>
              <button onClick={() => quickLogin('volunteer@stadiumai.demo', 'password123')} className="w-full text-left px-3.5 py-2.5 bg-white rounded-xl text-xs hover:bg-blue-50/65 transition-colors border border-blue-100/50 hover:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm flex items-center justify-between">
                <div>
                  <span className="font-semibold text-green-700 mr-2">Volunteer</span>
                  <span className="text-gray-400 font-light font-mono">volunteer@stadiumai.demo</span>
                </div>
                <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded font-bold uppercase">Role</span>
              </button>
              <button onClick={() => quickLogin('admin@stadiumai.demo', 'password123')} className="w-full text-left px-3.5 py-2.5 bg-white rounded-xl text-xs hover:bg-blue-50/65 transition-colors border border-blue-100/50 hover:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm flex items-center justify-between">
                <div>
                  <span className="font-semibold text-purple-700 mr-2">Admin</span>
                  <span className="text-gray-400 font-light font-mono">admin@stadiumai.demo</span>
                </div>
                <span className="text-[10px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded font-bold uppercase">Role</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
