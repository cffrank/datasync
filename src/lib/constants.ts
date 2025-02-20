// Routes
export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    RESET_PASSWORD: '/auth/reset-password',
  },
  DASHBOARD: '/dashboard',
  CLIENTS: '/dashboard/clients',
  SETTINGS: '/dashboard/settings',
} as const;

// UI Configuration
export const UI_CONFIG = {
  SIDEBAR: {
    MIN_WIDTH: 64, // px
    MAX_WIDTH: 256, // px
  },
  TOAST: {
    DEFAULT_DURATION: 5000, // ms
    POSITION: 'bottom-right' as const,
    DURATION: 5000, // ms
  },
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  THEME: 'theme',
  SYNC_CONFIG: 'sync-config',
  SETTINGS: 'settings',
} as const;

// Sync Configuration
export const SYNC_CONFIG = {
  BATCH_SIZE: 100,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  MIN_INTERVAL: 60000, // 1 minute
  DEFAULT_INTERVAL: 300000, // 5 minutes
  RATE_LIMIT: {
    REQUESTS_PER_MINUTE: 60,
    CONCURRENT_REQUESTS: 5,
  },
  INTERVALS: {
    MIN: 60000, // 1 minute
    DEFAULT: 300000, // 5 minutes
    MAX: 3600000, // 1 hour
  },
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGIN: 'Successfully logged in',
    REGISTER: 'Successfully registered',
    LOGOUT: 'Successfully logged out',
    PASSWORD_RESET: 'Password reset email sent',
    EMAIL_VERIFIED: 'Email verified successfully',
  },
  SYNC: {
    STARTED: 'Sync started',
    COMPLETED: 'Sync completed successfully',
    CANCELLED: 'Sync cancelled',
    COMPLETE: 'Sync complete', // Alias for COMPLETED
    IN_PROGRESS: 'Sync in progress',
  },
  SETTINGS: {
    SAVED: 'Settings saved successfully',
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  SERVER: 'An unexpected error occurred',
  NETWORK: 'Network error occurred',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  NOT_FOUND: 'Resource not found',
  VALIDATION: 'Validation error',
  RATE_LIMIT: 'Rate limit exceeded',
  AUTH: {
    REQUIRED: 'Authentication required',
    INVALID_CREDENTIALS: 'Invalid email or password',
    EMAIL_IN_USE: 'Email already in use',
    WEAK_PASSWORD: 'Password is too weak',
    USER_NOT_FOUND: 'User not found',
    WRONG_PASSWORD: 'Wrong password',
    INVALID_EMAIL: 'Invalid email address',
    EMAIL_NOT_VERIFIED: 'Email not verified',
    OPERATION_NOT_ALLOWED: 'Operation not allowed',
    USER_DISABLED: 'User account has been disabled',
  },
  SYNC: {
    FAILED: 'Sync failed',
    ALREADY_RUNNING: 'Sync already in progress',
    NO_CHANGES: 'No changes to sync',
    IN_PROGRESS: 'Sync already in progress',
    INVALID_CONFIG: 'Invalid sync configuration',
  },
  JOBBER: {
    API_ERROR: 'Jobber API error',
    RATE_LIMIT: 'Rate limit exceeded',
    INVALID_TOKEN: 'Invalid API token',
  },
  FIREBASE: {
    INIT_FAILED: 'Firebase initialization failed',
    PERSISTENCE_FAILED: 'Offline persistence not available',
    PERMISSION_DENIED: 'Permission denied',
  },
} as const;
