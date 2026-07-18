import { z } from "zod"

export const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic" },
  { value: "fr", label: "French" },
] as const

export const TIMEZONES = [
  { value: "UTC", label: "UTC" },
  { value: "America/New_York", label: "Eastern Time (US)" },
  { value: "America/Chicago", label: "Central Time (US)" },
  { value: "America/Denver", label: "Mountain Time (US)" },
  { value: "America/Los_Angeles", label: "Pacific Time (US)" },
  { value: "Europe/London", label: "London" },
  { value: "Europe/Paris", label: "Paris" },
  { value: "Asia/Dubai", label: "Dubai" },
  { value: "Asia/Tokyo", label: "Tokyo" },
] as const

export const languageValues = LANGUAGES.map((l) => l.value) as unknown as [
  (typeof LANGUAGES)[number]["value"],
  ...(typeof LANGUAGES)[number]["value"][],
]

export const timezoneValues = TIMEZONES.map((t) => t.value) as unknown as [
  (typeof TIMEZONES)[number]["value"],
  ...(typeof TIMEZONES)[number]["value"][],
]

export const settingsSchema = z.object({
  darkMode: z.boolean({
    error: "Dark mode preference is required",
  }),
  emailNotifications: z.boolean({
    error: "Email notification preference is required",
  }),
  language: z.enum(languageValues, {
    error: "Please select a language",
  }),
  timezone: z.enum(timezoneValues, {
    error: "Please select a timezone",
  }),
})

export type SettingsFormValues = z.infer<typeof settingsSchema>

export const defaultSettingsValues: SettingsFormValues = {
  darkMode: false,
  emailNotifications: true,
  language: "en",
  timezone: "UTC",
}

export function getLanguageLabel(value: SettingsFormValues["language"]) {
  return LANGUAGES.find((l) => l.value === value)?.label ?? value
}

export function getTimezoneLabel(value: SettingsFormValues["timezone"]) {
  return TIMEZONES.find((t) => t.value === value)?.label ?? value
}
