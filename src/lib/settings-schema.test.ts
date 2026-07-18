import { describe, expect, it } from "vitest"
import {
  defaultSettingsValues,
  settingsSchema,
} from "@/lib/settings-schema"

describe("settingsSchema", () => {
  it("accepts valid default settings", () => {
    const result = settingsSchema.safeParse(defaultSettingsValues)

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual(defaultSettingsValues)
    }
  })

  it("accepts all supported languages", () => {
    for (const language of ["en", "ar", "fr"] as const) {
      const result = settingsSchema.safeParse({
        ...defaultSettingsValues,
        language,
      })
      expect(result.success).toBe(true)
    }
  })

  it("rejects an unsupported language", () => {
    const result = settingsSchema.safeParse({
      ...defaultSettingsValues,
      language: "es",
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.path).toContain("language")
      expect(result.error.issues[0]?.message).toMatch(/language/i)
    }
  })

  it("rejects an unsupported timezone", () => {
    const result = settingsSchema.safeParse({
      ...defaultSettingsValues,
      timezone: "Mars/Olympus",
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.path).toContain("timezone")
      expect(result.error.issues[0]?.message).toMatch(/timezone/i)
    }
  })

  it("rejects missing darkMode", () => {
    const { darkMode: _darkMode, ...rest } = defaultSettingsValues
    const result = settingsSchema.safeParse(rest)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path.includes("darkMode"))).toBe(
        true,
      )
    }
  })

  it("rejects missing emailNotifications", () => {
    const { emailNotifications: _emailNotifications, ...rest } =
      defaultSettingsValues
    const result = settingsSchema.safeParse(rest)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(
        result.error.issues.some((issue) =>
          issue.path.includes("emailNotifications"),
        ),
      ).toBe(true)
    }
  })

  it("rejects non-boolean darkMode", () => {
    const result = settingsSchema.safeParse({
      ...defaultSettingsValues,
      darkMode: "yes",
    })

    expect(result.success).toBe(false)
  })

  it("rejects non-boolean emailNotifications", () => {
    const result = settingsSchema.safeParse({
      ...defaultSettingsValues,
      emailNotifications: 1,
    })

    expect(result.success).toBe(false)
  })

  it("accepts a fully customized valid payload", () => {
    const result = settingsSchema.safeParse({
      darkMode: true,
      emailNotifications: false,
      language: "ar",
      timezone: "Asia/Dubai",
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.language).toBe("ar")
      expect(result.data.timezone).toBe("Asia/Dubai")
      expect(result.data.darkMode).toBe(true)
      expect(result.data.emailNotifications).toBe(false)
    }
  })
})
