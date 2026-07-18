import { z } from 'zod'

export const settingsSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, 'Display name must be at least 2 characters')
    .max(50, 'Display name must be at most 50 characters'),
  username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be at most 30 characters')
    .regex(
      /^[a-z0-9_]+$/,
      'Username can only contain lowercase letters, numbers, and underscores',
    ),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  bio: z
    .string()
    .max(160, 'Bio must be at most 160 characters')
    .optional()
    .or(z.literal('')),
  language: z.enum(['en', 'es', 'fr', 'de'], {
    error: 'Select a language',
  }),
  timezone: z.string().min(1, 'Select a timezone'),
  emailNotifications: z.boolean(),
  marketingEmails: z.boolean(),
  weeklyDigest: z.boolean(),
})

export type SettingsFormValues = z.infer<typeof settingsSchema>

export const defaultSettingsValues: SettingsFormValues = {
  displayName: 'Alex Rivera',
  username: 'alex_rivera',
  email: 'alex@flyrank.ai',
  bio: 'Building AI-assisted search experiences.',
  language: 'en',
  timezone: 'America/New_York',
  emailNotifications: true,
  marketingEmails: false,
  weeklyDigest: true,
}
