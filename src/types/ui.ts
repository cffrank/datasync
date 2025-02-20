import { type ReactNode } from 'react';

export interface BaseProps {
  children?: ReactNode;
  className?: string;
}

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export interface ErrorDisplayProps extends BaseProps {
  error?: Error | string;
  reset?: () => void;
  title?: string;
  message?: string;
  retry?: () => void;
}

export interface ToastOptions {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

export interface ShortcutHandlers {
  [key: string]: () => void;
}

export interface ThemeConfig {
  mode: 'light' | 'dark' | 'system';
  sidebarCollapsed: boolean;
}

export interface SidebarConfig {
  isCollapsed: boolean;
  isMobile: boolean;
  minWidth: number;
  maxWidth: number;
}

export interface ProviderProps {
  children: ReactNode;
}
