import { type ErrorDisplayProps } from '@/types';
import { cn } from '@/lib/utils';

export function ErrorDisplay({
  error,
  reset,
  title,
  message,
  retry,
  className,
  children,
}: ErrorDisplayProps) {
  const errorMessage = message || (error instanceof Error ? error.message : error);
  const errorTitle = title || 'Something went wrong';
  const retryFn = retry || reset;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 text-center',
        className
      )}
    >
      <h2 className="text-2xl font-bold text-red-500">{errorTitle}</h2>
      {errorMessage && (
        <p className="text-muted-foreground">{errorMessage}</p>
      )}
      {children}
      {retryFn && (
        <button
          onClick={retryFn}
          className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export function ErrorScreen(props: ErrorDisplayProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <ErrorDisplay {...props} />
    </div>
  );
}

export function ErrorOverlay(props: ErrorDisplayProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <ErrorDisplay {...props} />
    </div>
  );
}

// Next.js error page component
export function ErrorPage(props: ErrorDisplayProps) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <ErrorDisplay {...props} />
    </div>
  );
}
