import Link from 'next/link';

export default function Home(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="mb-8 text-4xl font-bold text-center">
          Jobber Sync Dashboard
        </h1>
        <div className="flex flex-col items-center gap-4">
          <p className="text-center text-lg text-muted-foreground">
            Synchronize your Jobber data with Firebase
          </p>
          <Link
            href="/dashboard"
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
