'use client';

import { ErrorPage } from '@/components/ui/error';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorPage
      title="Application Error"
      message={error.message}
      retry={reset}
    />
  );
}
