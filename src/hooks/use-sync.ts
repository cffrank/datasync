import { useCallback, useState } from 'react';
import { useSyncStore } from '@/stores/sync-store';
import { useToast } from './use-toast';
import { handleAPIError } from '@/lib/utils';
import { SYNC_CONFIG, ERROR_MESSAGES } from '@/lib/constants';
import type { SyncStatus } from '@/types/sync';

export function useSync() {
  const [isLoading, setIsLoading] = useState(false);
  const store = useSyncStore();
  const toast = useToast();

  const sync = useCallback(async () => {
    if (store.isRunning) {
      toast.warning(ERROR_MESSAGES.SYNC.IN_PROGRESS);
      return;
    }

    try {
      setIsLoading(true);
      store.startSync();
      store.setStatus('running');

      // Perform sync operations here
      await new Promise((resolve) => setTimeout(resolve, 2000));

      store.setStatus('success');
      store.setProgress(100);
    } catch (error) {
      const message = handleAPIError(error);
      store.setError(message);
      store.setStatus('error');
    } finally {
      store.stopSync();
      setIsLoading(false);
    }
  }, [store, toast]);

  const setInterval = useCallback(
    (interval: number) => {
      if (interval < SYNC_CONFIG.MIN_INTERVAL) {
        toast.error(ERROR_MESSAGES.SYNC.INVALID_CONFIG);
        return;
      }
      store.setInterval(interval);
    },
    [store, toast]
  );

  const setAutoSync = useCallback(
    (enabled: boolean) => {
      if (enabled && store.interval < SYNC_CONFIG.MIN_INTERVAL) {
        toast.error(ERROR_MESSAGES.SYNC.INVALID_CONFIG);
        return;
      }
      store.setAutoSync(enabled);
    },
    [store, toast]
  );

  return {
    // Status
    isLoading,
    error: store.error,
    status: store.status,
    progress: store.progress,
    isRunning: store.isRunning,

    // Settings
    autoSync: store.autoSync,
    interval: store.interval,

    // Stats
    stats: store.stats,

    // Actions
    sync,
    setInterval,
    setAutoSync,
    cancelSync: store.cancelSync,
    updateStats: store.updateStats,
    reset: store.reset,
  };
}
