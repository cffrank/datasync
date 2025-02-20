import { ErrorScreen } from '@/components/ui/error';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

export default function NotFound() {
  return (
    <ErrorScreen
      title="Page Not Found"
      message="The page you're looking for doesn't exist."
    >
      <Link
        href={ROUTES.DASHBOARD}
        className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Return to Dashboard
      </Link>
    </ErrorScreen>
  );
}
