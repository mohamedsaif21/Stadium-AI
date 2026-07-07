'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/types';

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('stadiumai_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      } catch {
        localStorage.removeItem('stadiumai_user');
      }
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('stadiumai_user');
    setUser(null);
    router.push('/');
  };

  return { user, loading, logout };
}
