'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { registerUser, getRedirectPath } from '@/lib/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'fan' | 'volunteer' | 'admin'>('fan');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await registerUser(email, password, name, role);
      if (result.error) {
        setError(result.error);
        return;
      }
      if (result.user) {
        localStorage.setItem('stadiumai_user', JSON.stringify(result.user));
        router.push(getRedirectPath(result.user.role));
      }
    } catch {
      setError('Registration failed. Please try again.');
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
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-navy-900">Create your account</h2>
            <p className="text-gray-400 text-sm mt-1">Join StadiumAI for the World Cup 2026</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100/90 hover:shadow-2xl transition-all">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm flex items-center gap-2" role="alert">
                <span>⚠</span> {error}
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="name" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all bg-gray-50/50 hover:bg-gray-50 focus:bg-white"
                placeholder="John Doe"
                aria-label="Full name"
              />
            </div>

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

            <div className="mb-4">
              <label htmlFor="password" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all bg-gray-50/50 hover:bg-gray-50 focus:bg-white"
                placeholder="Minimum 6 characters"
                aria-label="Password"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="role" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">I am a...</label>
              <select
                id="role"
                value={role}
                onChange={e => setRole(e.target.value as 'fan' | 'volunteer' | 'admin')}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all bg-gray-50/50 hover:bg-gray-50 focus:bg-white"
                aria-label="Select your role"
              >
                <option value="fan">Fan</option>
                <option value="volunteer">Volunteer</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.99] text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md shadow-blue-600/10"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
