import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold">
              Jobber Sync
            </Link>
            <nav className="flex gap-4">
              <Link
                href="/dashboard"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/clients"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Clients
              </Link>
              <Link
                href="/dashboard/settings"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Settings
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="text-sm text-muted-foreground hover:text-foreground"
              onClick={() => {
                // TODO: Implement sign out
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
