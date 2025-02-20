export default function ClientsPage(): JSX.Element {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-4xl font-bold">Clients</h1>
      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <p className="text-sm text-muted-foreground">No clients synced yet.</p>
        </div>
      </div>
    </div>
  );
}
