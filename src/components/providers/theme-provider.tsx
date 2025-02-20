'use client';

import { type ReactNode, useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  const { theme, isDark } = useTheme();

  // Update theme meta tag
  useEffect(() => {
    // Update theme color meta tag
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        isDark ? '#0f172a' : '#ffffff'
      );
    }

    // Update color scheme meta tag
    const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
    if (metaColorScheme) {
      metaColorScheme.setAttribute(
        'content',
        theme === 'system' ? 'light dark' : theme
      );
    }
  }, [theme, isDark]);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground">
        {children}
      </div>
    </div>
  );
}
