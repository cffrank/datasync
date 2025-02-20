'use client';

import { ErrorPage } from '@/components/ui/error';

export default function ClientsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorPage
      title="Clients Error"
      message={error.message}
      retry={reset}
    />
  );
}
