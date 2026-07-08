'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/types';
import { isUser } from '@/lib/auth';

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('stadiumai_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (isUser(parsed)) {
          setUser(parsed);
        } else {
          localStorage.removeItem('stadiumai_user');
        }
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
