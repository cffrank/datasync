'use client';

import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from '@/hooks';

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const { user } = useAuth();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Only refetch if window is focused and user is logged in
        refetchOnWindowFocus: Boolean(user),
        // Retry failed queries 3 times
        retry: 3,
        // Stale after 5 minutes
        staleTime: 5 * 60 * 1000,
        // Cache for 10 minutes
        cacheTime: 10 * 60 * 1000,
      },
      mutations: {
        // Retry failed mutations 3 times
        retry: 3,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
