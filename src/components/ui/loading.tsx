import { type LoadingProps } from '@/types';
import { cn } from '@/lib/utils';

const sizeClasses = {
  sm: 'h-6 w-6 border',
  md: 'h-12 w-12 border-2',
  lg: 'h-32 w-32 border-t-2 border-b-2',
} as const;

export function Loading({ size = 'md', message }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={cn(
          'animate-spin rounded-full border-primary',
          sizeClasses[size]
        )}
      />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}

export function LoadingScreen({ size = 'lg', message }: LoadingProps) {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loading size={size} message={message} />
    </div>
  );
}

export function LoadingOverlay({ size = 'md', message }: LoadingProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Loading size={size} message={message} />
    </div>
  );
}

// Next.js page loading component
export function LoadingPage({ size = 'lg', message }: LoadingProps) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Loading size={size} message={message} />
    </div>
  );
}
