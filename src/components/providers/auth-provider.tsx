'use client';

import { type ReactNode } from 'react';
import { AuthContextProvider } from '@/contexts/auth';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
