'use client';

import { ErrorPage } from '@/components/ui/error';

export default function SettingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorPage
      title="Settings Error"
      message={error.message}
      retry={reset}
    />
  );
}
