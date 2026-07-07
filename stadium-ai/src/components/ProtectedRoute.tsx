'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: ReactNode;
  role: 'fan' | 'volunteer' | 'admin';
}

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('stadiumai_user');
    if (!stored) {
      router.push('/login');
      return;
    }
    try {
      const user = JSON.parse(stored);
      if (user.role !== role) {
        router.push('/login');
      }
    } catch {
      router.push('/login');
    }
  }, [role, router]);

  const stored = typeof window !== 'undefined' ? localStorage.getItem('stadiumai_user') : null;
  if (!stored) return null;

  let parsedUser: { role: string } | null = null;
  try {
    parsedUser = JSON.parse(stored);
  } catch {
    return null;
  }

  if (!parsedUser || parsedUser.role !== role) return null;
  return <>{children}</>;
}
