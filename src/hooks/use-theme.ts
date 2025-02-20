import { useEffect } from 'react';
import { useSettingsStore } from '@/stores/settings-store';

export function useTheme() {
  const { theme, setTheme } = useSettingsStore();

  // Update theme class on document
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme.mode === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme.mode);
    }
  }, [theme.mode]);

  // Watch system theme changes
  useEffect(() => {
    if (theme.mode !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(mediaQuery.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme.mode]);

  return {
    theme: theme.mode,
    isDark:
      theme.mode === 'dark' ||
      (theme.mode === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches),
    setTheme,
  };
}
