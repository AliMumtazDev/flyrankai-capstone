import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, Loader2, Save } from 'lucide-react'
import {
  defaultSettingsValues,
  settingsSchema,
  type SettingsFormValues,
} from '@/lib/settings-schema'
import { Button } from '@/components/ui/button'
import { FieldError } from '@/components/ui/field-error'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
] as const

const TIMEZONE_OPTIONS = [
  { value: 'America/New_York', label: 'Eastern Time (US)' },
  { value: 'America/Chicago', label: 'Central Time (US)' },
  { value: 'America/Denver', label: 'Mountain Time (US)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (US)' },
  { value: 'Europe/London', label: 'London' },
  { value: 'Europe/Berlin', label: 'Berlin' },
  { value: 'Asia/Tokyo', label: 'Tokyo' },
  { value: 'UTC', label: 'UTC' },
] as const

export function SettingsForm() {
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle')

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: defaultSettingsValues,
    mode: 'onChange',
  })

  const bioValue = watch('bio') ?? ''

  async function onSubmit(values: SettingsFormValues) {
    setSaveState('saving')
    // Simulate persistence — replace with an API call when backend is ready
    await new Promise((resolve) => setTimeout(resolve, 700))
    console.info('Settings saved:', values)
    reset(values)
    setSaveState('saved')
    window.setTimeout(() => setSaveState('idle'), 2200)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-8"
      aria-label="Account settings"
    >
      <section
        className="rounded-2xl border border-border bg-surface-elevated/90 p-6 shadow-[0_1px_2px_rgba(15,28,36,0.04)] backdrop-blur-sm sm:p-8"
        aria-labelledby="profile-heading"
      >
        <div className="mb-6">
          <h2
            id="profile-heading"
            className="font-display text-xl font-semibold tracking-tight text-ink"
          >
            Profile
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            How you appear across FlyRankAI.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <Label htmlFor="displayName">Display name</Label>
            <Input
              id="displayName"
              autoComplete="name"
              placeholder="Your name"
              invalid={Boolean(errors.displayName)}
              {...register('displayName')}
            />
            <FieldError message={errors.displayName?.message} />
          </div>

          <div className="sm:col-span-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              autoComplete="username"
              placeholder="your_username"
              invalid={Boolean(errors.username)}
              {...register('username')}
            />
            <FieldError message={errors.username?.message} />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              invalid={Boolean(errors.email)}
              {...register('email')}
            />
            <FieldError message={errors.email?.message} />
          </div>

          <div className="sm:col-span-2">
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <Label htmlFor="bio" className="mb-0">
                Bio
              </Label>
              <span
                className={`text-xs tabular-nums ${
                  bioValue.length > 160 ? 'text-danger' : 'text-ink-muted'
                }`}
              >
                {bioValue.length}/160
              </span>
            </div>
            <Textarea
              id="bio"
              rows={3}
              placeholder="A short line about you"
              invalid={Boolean(errors.bio)}
              {...register('bio')}
            />
            <FieldError message={errors.bio?.message} />
          </div>
        </div>
      </section>

      <section
        className="rounded-2xl border border-border bg-surface-elevated/90 p-6 shadow-[0_1px_2px_rgba(15,28,36,0.04)] backdrop-blur-sm sm:p-8"
        aria-labelledby="preferences-heading"
      >
        <div className="mb-6">
          <h2
            id="preferences-heading"
            className="font-display text-xl font-semibold tracking-tight text-ink"
          >
            Preferences
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            Language and timezone for your workspace.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="language">Language</Label>
            <Select
              id="language"
              invalid={Boolean(errors.language)}
              {...register('language')}
            >
              {LANGUAGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            <FieldError message={errors.language?.message} />
          </div>

          <div>
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              id="timezone"
              invalid={Boolean(errors.timezone)}
              {...register('timezone')}
            >
              {TIMEZONE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            <FieldError message={errors.timezone?.message} />
          </div>
        </div>
      </section>

      <section
        className="rounded-2xl border border-border bg-surface-elevated/90 p-6 shadow-[0_1px_2px_rgba(15,28,36,0.04)] backdrop-blur-sm sm:p-8"
        aria-labelledby="notifications-heading"
      >
        <div className="mb-6">
          <h2
            id="notifications-heading"
            className="font-display text-xl font-semibold tracking-tight text-ink"
          >
            Notifications
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            Choose what you want to hear about.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Controller
            name="emailNotifications"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                label="Email notifications"
                description="Alerts about ranking changes and crawl issues."
              />
            )}
          />
          <Controller
            name="weeklyDigest"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                label="Weekly digest"
                description="A Monday summary of visibility trends."
              />
            )}
          />
          <Controller
            name="marketingEmails"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                label="Product updates"
                description="Occasional news about new FlyRankAI features."
              />
            )}
          />
        </div>
      </section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="min-h-5 text-sm text-ink-muted" aria-live="polite">
          {saveState === 'saved' ? (
            <span className="inline-flex items-center gap-1.5 text-success">
              <CheckCircle2 className="size-4" aria-hidden />
              Settings saved
            </span>
          ) : isDirty ? (
            'You have unsaved changes'
          ) : (
            'All changes saved'
          )}
        </p>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="secondary"
            disabled={!isDirty || saveState === 'saving'}
            onClick={() => {
              reset()
              setSaveState('idle')
            }}
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={!isDirty || !isValid || saveState === 'saving'}
          >
            {saveState === 'saving' ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden />
                Saving…
              </>
            ) : (
              <>
                <Save className="size-4" aria-hidden />
                Save changes
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}
