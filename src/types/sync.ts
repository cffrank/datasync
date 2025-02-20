export type SyncStatus = 'idle' | 'running' | 'error' | 'success';

export interface SyncStats {
  totalClients: number;
  syncedClients: number;
  failedClients: number;
  lastSyncAt: string | null;
  lastError: string | null;
}

export interface SyncState {
  // Status
  isRunning: boolean;
  progress: number;
  status: SyncStatus;
  error: string | null;
  
  // Stats
  stats: SyncStats;
  
  // Settings
  interval: number;
  autoSync: boolean;
  
  // Status Actions
  setStatus: (status: SyncStatus) => void;
  setError: (error: string | null) => void;
  setProgress: (progress: number) => void;
  reset: () => void;

  // Sync Actions
  startSync: () => void;
  stopSync: () => void;
  cancelSync: () => void;

  // Stats Actions
  updateStats: (stats: Partial<SyncStats>) => void;

  // Settings Actions
  setInterval: (interval: number) => void;
  setAutoSync: (enabled: boolean) => void;
}

export interface SyncResult {
  success: boolean;
  error?: string;
  stats: {
    processed: number;
    succeeded: number;
    failed: number;
    skipped: number;
  };
}

export interface SyncOptions {
  batchSize?: number;
  retryAttempts?: number;
  retryDelay?: number;
  onProgress?: (progress: number) => void;
  onError?: (error: Error) => void;
}
