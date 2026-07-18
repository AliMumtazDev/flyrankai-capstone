"use client"

import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTheme } from "next-themes"
import { CheckCircle2, Loader2, RotateCcw, Save } from "lucide-react"
import {
  defaultSettingsValues,
  LANGUAGES,
  settingsSchema,
  TIMEZONES,
  type SettingsFormValues,
} from "@/lib/settings-schema"
import { SettingsPreview } from "@/components/settings-preview"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export function SettingsForm() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">(
    "idle",
  )

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: defaultSettingsValues,
    mode: "onChange",
  })

  const values = watch()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !resolvedTheme) return
    const isDark = resolvedTheme === "dark"
    setValue("darkMode", isDark, { shouldDirty: false, shouldValidate: true })
  }, [mounted, resolvedTheme, setValue])

  async function onSubmit(data: SettingsFormValues) {
    setSaveState("saving")
    setTheme(data.darkMode ? "dark" : "light")
    await new Promise((resolve) => setTimeout(resolve, 600))
    reset(data)
    setSaveState("saved")
    window.setTimeout(() => setSaveState("idle"), 2000)
  }

  function handleReset() {
    reset()
    const next = getValues()
    setTheme(next.darkMode ? "dark" : "light")
    setSaveState("idle")
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-6"
        aria-label="User preference settings"
      >
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Choose how FlyRankAI looks on your device.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Controller
              name="darkMode"
              control={control}
              render={({ field, fieldState }) => (
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="darkMode">Dark mode</Label>
                    <p id="darkMode-description" className="text-sm text-muted-foreground">
                      Use a darker color scheme across the app.
                    </p>
                    {fieldState.error ? (
                      <p
                        id="darkMode-error"
                        role="alert"
                        className="text-sm text-destructive"
                      >
                        {fieldState.error.message}
                      </p>
                    ) : null}
                  </div>
                  <Switch
                    id="darkMode"
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked)
                      setTheme(checked ? "dark" : "light")
                    }}
                    aria-describedby={
                      fieldState.error
                        ? "darkMode-error darkMode-description"
                        : "darkMode-description"
                    }
                    aria-invalid={Boolean(fieldState.error)}
                  />
                </div>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Control email alerts about ranking and crawl activity.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Controller
              name="emailNotifications"
              control={control}
              render={({ field, fieldState }) => (
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="emailNotifications">
                      Email notifications
                    </Label>
                    <p
                      id="emailNotifications-description"
                      className="text-sm text-muted-foreground"
                    >
                      Receive alerts when visibility metrics change.
                    </p>
                    {fieldState.error ? (
                      <p
                        id="emailNotifications-error"
                        role="alert"
                        className="text-sm text-destructive"
                      >
                        {fieldState.error.message}
                      </p>
                    ) : null}
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-describedby={
                      fieldState.error
                        ? "emailNotifications-error emailNotifications-description"
                        : "emailNotifications-description"
                    }
                    aria-invalid={Boolean(fieldState.error)}
                  />
                </div>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Locale</CardTitle>
            <CardDescription>
              Set your preferred language and timezone.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 sm:grid-cols-2">
            <Controller
              name="language"
              control={control}
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <Label htmlFor="language-trigger">Language</Label>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      if (value) field.onChange(value)
                    }}
                  >
                    <SelectTrigger
                      id="language-trigger"
                      className="w-full"
                      aria-invalid={Boolean(fieldState.error)}
                      aria-describedby={
                        fieldState.error ? "language-error" : undefined
                      }
                    >
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map((language) => (
                        <SelectItem key={language.value} value={language.value}>
                          {language.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.error ? (
                    <p
                      id="language-error"
                      role="alert"
                      className="text-sm text-destructive"
                    >
                      {fieldState.error.message}
                    </p>
                  ) : null}
                </div>
              )}
            />

            <Controller
              name="timezone"
              control={control}
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <Label htmlFor="timezone-trigger">Timezone</Label>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      if (value) field.onChange(value)
                    }}
                  >
                    <SelectTrigger
                      id="timezone-trigger"
                      className="w-full"
                      aria-invalid={Boolean(fieldState.error)}
                      aria-describedby={
                        fieldState.error ? "timezone-error" : undefined
                      }
                    >
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIMEZONES.map((timezone) => (
                        <SelectItem key={timezone.value} value={timezone.value}>
                          {timezone.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.error ? (
                    <p
                      id="timezone-error"
                      role="alert"
                      className="text-sm text-destructive"
                    >
                      {fieldState.error.message}
                    </p>
                  ) : null}
                </div>
              )}
            />
          </CardContent>
        </Card>

        {Object.keys(errors).length > 0 ? (
          <div
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          >
            Please fix the highlighted fields before saving.
          </div>
        ) : null}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="min-h-5 text-sm text-muted-foreground" aria-live="polite">
            {saveState === "saved" ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="size-4" aria-hidden />
                Preferences saved
              </span>
            ) : isDirty ? (
              "You have unsaved changes"
            ) : (
              "All changes saved"
            )}
          </p>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={!isDirty || saveState === "saving"}
              onClick={handleReset}
            >
              <RotateCcw data-icon="inline-start" />
              Reset
            </Button>
            <Button
              type="submit"
              disabled={!isDirty || !isValid || saveState === "saving"}
            >
              {saveState === "saving" ? (
                <>
                  <Loader2
                    data-icon="inline-start"
                    className="animate-spin"
                    aria-hidden
                  />
                  Saving…
                </>
              ) : (
                <>
                  <Save data-icon="inline-start" aria-hidden />
                  Save changes
                </>
              )}
            </Button>
          </div>
        </div>
      </form>

      <aside className="lg:pt-0">
        <SettingsPreview
          values={{
            darkMode: values.darkMode ?? false,
            emailNotifications: values.emailNotifications ?? true,
            language: values.language ?? "en",
            timezone: values.timezone ?? "UTC",
          }}
        />
      </aside>
    </div>
  )
}
