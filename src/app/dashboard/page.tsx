export default function DashboardPage(): JSX.Element {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-4xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Sync Status</h2>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Last sync: Never</p>
            <p className="text-sm text-muted-foreground">Status: Not started</p>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Clients</h2>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Total: 0</p>
            <p className="text-sm text-muted-foreground">Synced: 0</p>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Actions</h2>
          <div className="space-y-2">
            <button
              className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
              onClick={() => {
                // TODO: Implement sync
              }}
            >
              Start Sync
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
