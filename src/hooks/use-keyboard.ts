import { useCallback, useEffect, useRef } from 'react';
import { useSync } from './use-sync';
import { useSidebar } from './use-sidebar';
import { useToast } from './use-toast';
import { ERROR_MESSAGES } from '@/lib/constants';

export type KeyHandler = (event: KeyboardEvent) => void;

export function useKeyboard() {
  const handlers = useRef<Map<string, KeyHandler>>(new Map());
  const { isRunning, sync, cancelSync } = useSync();
  const { isCollapsed, expandSidebar, collapseSidebar } = useSidebar();
  const toast = useToast();

  // Register default handlers
  useEffect(() => {
    const map = handlers.current;
    map.clear(); // Clear previous handlers

    // Sync shortcuts
    map.set('ctrl+s', (event) => {
      event.preventDefault();
      if (!isRunning) {
        sync();
      } else {
        toast.warning(ERROR_MESSAGES.SYNC.IN_PROGRESS);
      }
    });

    map.set('ctrl+x', (event) => {
      event.preventDefault();
      if (isRunning) {
        cancelSync();
      }
    });

    // Sidebar shortcuts
    map.set('ctrl+b', (event) => {
      event.preventDefault();
      if (isCollapsed) {
        expandSidebar();
      } else {
        collapseSidebar();
      }
    });
  }, [isRunning, sync, cancelSync, isCollapsed, expandSidebar, collapseSidebar, toast]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Build key combo string (e.g., 'ctrl+s')
      const combo = [
        event.ctrlKey || event.metaKey ? 'ctrl' : '',
        event.altKey ? 'alt' : '',
        event.shiftKey ? 'shift' : '',
        event.key.toLowerCase(),
      ]
        .filter(Boolean)
        .join('+');

      // Execute handler if registered
      const handler = handlers.current.get(combo);
      if (handler) {
        handler(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Register custom handler
  const register = useCallback((combo: string, handler: KeyHandler) => {
    const map = handlers.current;
    map.set(combo.toLowerCase(), handler);
    return () => map.delete(combo.toLowerCase());
  }, []);

  // Unregister handler
  const unregister = useCallback((combo: string) => {
    handlers.current.delete(combo.toLowerCase());
  }, []);

  return {
    register,
    unregister,
  };
}
