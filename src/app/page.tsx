import { SettingsForm } from "@/components/settings-form"

export default function SettingsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8 space-y-2">
        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          FlyRankAI
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Settings
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Manage appearance, notifications, and locale preferences. Changes
          update the live preview instantly.
        </p>
      </header>

      <main>
        <SettingsForm />
      </main>
    </div>
  )
}
