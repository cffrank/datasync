'use client';

import { type ReactNode, useEffect } from 'react';
import { useSync, useToast } from '@/hooks';
import { SYNC_CONFIG, SUCCESS_MESSAGES, ERROR_MESSAGES } from '@/lib/constants';

interface SyncProviderProps {
  children: ReactNode;
}

export function SyncProvider({ children }: SyncProviderProps) {
  const {
    isRunning,
    autoSync,
    interval,
    status,
    error,
    setAutoSync,
    setInterval,
    sync,
    cancelSync,
  } = useSync();
  const toast = useToast();

  // Start sync on mount if auto-sync is enabled
  useEffect(() => {
    if (autoSync && !isRunning) {
      sync();
    }
  }, [autoSync, isRunning, sync]);

  // Handle sync completion
  useEffect(() => {
    if (status === 'success') {
      toast.success(SUCCESS_MESSAGES.SYNC.COMPLETED);
    } else if (status === 'error' && error) {
      toast.error(error);
    }
  }, [status, error, toast]);

  // Validate sync interval
  useEffect(() => {
    if (autoSync && interval < SYNC_CONFIG.INTERVALS.MIN) {
      setInterval(SYNC_CONFIG.INTERVALS.DEFAULT);
      setAutoSync(false);
      toast.error(ERROR_MESSAGES.SYNC.INVALID_CONFIG);
    }
  }, [autoSync, interval, setInterval, setAutoSync, toast]);

  return <>{children}</>;
}
