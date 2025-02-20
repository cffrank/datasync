export default function SettingsPage(): JSX.Element {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-4xl font-bold">Settings</h1>
      <div className="space-y-6">
        <div className="rounded-lg border bg-card">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Jobber API Configuration</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium" htmlFor="apiKey">
                  API Key
                </label>
                <input
                  id="apiKey"
                  type="password"
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="Enter your Jobber API key"
                />
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="webhookSecret">
                  Webhook Secret
                </label>
                <input
                  id="webhookSecret"
                  type="password"
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="Enter your webhook secret"
                />
              </div>
              <button
                className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                  // TODO: Implement save settings
                }}
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Sync Configuration</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium" htmlFor="syncInterval">
                  Sync Interval (minutes)
                </label>
                <input
                  id="syncInterval"
                  type="number"
                  min="5"
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="Enter sync interval"
                />
              </div>
              <button
                className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                  // TODO: Implement save sync settings
                }}
              >
                Save Sync Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
