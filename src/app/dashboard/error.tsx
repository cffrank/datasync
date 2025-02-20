'use client';

import { ErrorPage } from '@/components/ui/error';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorPage
      title="Dashboard Error"
      message={error.message}
      retry={reset}
    />
  );
}
