import { toast } from 'sonner';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/lib/constants';

interface ToastOptions {
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function useToast() {
  const success = (message: string, options?: ToastOptions) => {
    toast.success(message, {
      duration: options?.duration,
      action: options?.action,
    });
  };

  const error = (message: string, options?: ToastOptions) => {
    toast.error(message, {
      duration: options?.duration,
      action: options?.action,
    });
  };

  const info = (message: string, options?: ToastOptions) => {
    toast(message, {
      duration: options?.duration,
      action: options?.action,
    });
  };

  const warning = (message: string, options?: ToastOptions) => {
    toast.warning(message, {
      duration: options?.duration,
      action: options?.action,
    });
  };

  const promise = <T>(
    promise: Promise<T>,
    {
      loading = 'Loading...',
      success = SUCCESS_MESSAGES.SYNC.COMPLETE,
      error = ERROR_MESSAGES.SERVER,
    }: {
      loading?: string;
      success?: string | ((data: T) => string);
      error?: string | ((error: Error) => string);
    } = {}
  ) => {
    toast.promise(promise, {
      loading,
      success: (data) => (typeof success === 'function' ? success(data) : success),
      error: (err) => (typeof error === 'function' ? error(err) : error),
    });
  };

  return {
    success,
    error,
    info,
    warning,
    promise,
  };
}
