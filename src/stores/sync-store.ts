import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS, SYNC_CONFIG } from '@/lib/constants';
import type { SyncState } from '@/types/sync';

const initialState = {
  isRunning: false,
  progress: 0,
  status: 'idle' as const,
  error: null,
  stats: {
    totalClients: 0,
    syncedClients: 0,
    failedClients: 0,
    lastSyncAt: null,
    lastError: null,
  },
  interval: SYNC_CONFIG.DEFAULT_INTERVAL,
  autoSync: false,
};

export const useSyncStore = create<SyncState>()(
  persist(
    (set) => ({
      ...initialState,

      // Status Actions
      setStatus: (status) => set({ status }),
      setError: (error) => set({ error }),
      setProgress: (progress) => set({ progress }),
      reset: () => set(initialState),

      // Sync Actions
      startSync: () => set({ isRunning: true, error: null }),
      stopSync: () => set({ isRunning: false }),
      cancelSync: () => set({ isRunning: false, status: 'idle', progress: 0 }),

      // Stats Actions
      updateStats: (stats) =>
        set((state) => ({
          stats: {
            ...state.stats,
            ...stats,
          },
        })),

      // Settings Actions
      setInterval: (interval) => set({ interval }),
      setAutoSync: (enabled) => set({ autoSync: enabled }),
    }),
    {
      name: STORAGE_KEYS.SYNC_CONFIG,
      partialize: (state) => ({
        interval: state.interval,
        autoSync: state.autoSync,
      }),
    }
  )
);
