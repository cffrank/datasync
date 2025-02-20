import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '@/lib/constants';

// Base state without actions
interface SettingsStateWithoutActions {
  // Firebase Configuration
  firebase: {
    apiKey: string;
    projectId: string;
    authDomain: string;
    storageBucket: string;
  };

  // Jobber Configuration
  jobber: {
    apiKey: string;
    webhookSecret: string;
    batchSize: number;
  };

  // Theme Configuration
  theme: {
    mode: 'light' | 'dark' | 'system';
    sidebarCollapsed: boolean;
  };
}

// Full state including actions
interface SettingsState extends SettingsStateWithoutActions {
  // Actions
  setFirebaseConfig: (config: Partial<SettingsState['firebase']>) => void;
  setJobberConfig: (config: Partial<SettingsState['jobber']>) => void;
  setTheme: (mode: SettingsState['theme']['mode']) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  reset: () => void;
}

const initialState: SettingsStateWithoutActions = {
  firebase: {
    apiKey: '',
    projectId: '',
    authDomain: '',
    storageBucket: '',
  },
  jobber: {
    apiKey: '',
    webhookSecret: '',
    batchSize: 100,
  },
  theme: {
    mode: 'system',
    sidebarCollapsed: false,
  },
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...initialState,

      // Firebase Actions
      setFirebaseConfig: (config) =>
        set((state) => ({
          firebase: {
            ...state.firebase,
            ...config,
          },
        })),

      // Jobber Actions
      setJobberConfig: (config) =>
        set((state) => ({
          jobber: {
            ...state.jobber,
            ...config,
          },
        })),

      // Theme Actions
      setTheme: (mode) =>
        set((state) => ({
          theme: {
            ...state.theme,
            mode,
          },
        })),

      setSidebarCollapsed: (collapsed) =>
        set((state) => ({
          theme: {
            ...state.theme,
            sidebarCollapsed: collapsed,
          },
        })),

      // Reset Action
      reset: () => set(initialState),
    }),
    {
      name: STORAGE_KEYS.SETTINGS,
      // Only persist certain parts of the state
      partialize: (state) => ({
        theme: state.theme,
        jobber: {
          batchSize: state.jobber.batchSize,
        },
      }),
    }
  )
);
