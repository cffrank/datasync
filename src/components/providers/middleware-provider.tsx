'use client';

import { type ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/auth';
import { ROUTES } from '@/lib/constants';

interface MiddlewareProviderProps {
  children: ReactNode;
}

export function MiddlewareProvider({ children }: MiddlewareProviderProps) {
  const router = useRouter();
  const { user, loading } = useAuthContext();

  // Handle authentication
  useEffect(() => {
    if (loading) return;

    const isAuthRoute = window.location.pathname.startsWith('/auth');
    const isPublicRoute = window.location.pathname === '/';

    if (!user && !isAuthRoute && !isPublicRoute) {
      router.push(ROUTES.AUTH.LOGIN);
    } else if (user && isAuthRoute) {
      router.push(ROUTES.DASHBOARD);
    }
  }, [user, loading, router]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
