'use client';

import { type ReactNode } from 'react';
import { Toaster } from 'sonner';
import { UI_CONFIG } from '@/lib/constants';

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      <Toaster
        position={UI_CONFIG.TOAST.POSITION}
        duration={UI_CONFIG.TOAST.DURATION}
        className="dark:hidden"
      />
      <Toaster
        position={UI_CONFIG.TOAST.POSITION}
        duration={UI_CONFIG.TOAST.DURATION}
        theme="dark"
        className="hidden dark:block"
      />
      {children}
    </>
  );
}
