'use client';

import { type ReactNode, useEffect } from 'react';
import { useKeyboard } from '@/hooks';

interface KeyboardProviderProps {
  children: ReactNode;
}

export function KeyboardProvider({ children }: KeyboardProviderProps) {
  // The keyboard hook already sets up default handlers for sync and sidebar
  useKeyboard();

  return <>{children}</>;
}
