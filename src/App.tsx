import { SettingsForm } from '@/components/settings-form'

export default function App() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-10 animate-[fade-up_0.5s_ease-out]">
        <p className="font-display text-sm font-semibold tracking-[0.14em] uppercase text-accent">
          FlyRankAI
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Settings
        </h1>
        <p className="mt-2 max-w-xl text-base text-ink-muted sm:text-lg">
          Manage your profile, preferences, and notification choices.
        </p>
      </header>

      <main className="animate-[fade-up_0.6s_ease-out_0.08s_both]">
        <SettingsForm />
      </main>
    </div>
  )
}
