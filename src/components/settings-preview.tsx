"use client"

import { Bell, Globe, Moon, Sun } from "lucide-react"
import {
  getLanguageLabel,
  getTimezoneLabel,
  type SettingsFormValues,
} from "@/lib/settings-schema"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type SettingsPreviewProps = {
  values: SettingsFormValues
}

export function SettingsPreview({ values }: SettingsPreviewProps) {
  const isRtl = values.language === "ar"

  return (
    <Card
      className="sticky top-6"
      aria-live="polite"
      aria-atomic="true"
      aria-label="Live preview of settings"
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Live preview</CardTitle>
        <p className="text-sm text-muted-foreground">
          Updates as you change preferences.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={cn(
            "overflow-hidden rounded-xl border transition-colors duration-300",
            values.darkMode
              ? "border-zinc-700 bg-zinc-900 text-zinc-50"
              : "border-zinc-200 bg-zinc-50 text-zinc-900",
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between border-b px-4 py-3 text-sm font-medium",
              values.darkMode ? "border-zinc-700" : "border-zinc-200",
            )}
          >
            <span>FlyRankAI</span>
            {values.darkMode ? (
              <Moon className="size-4 opacity-80" aria-hidden />
            ) : (
              <Sun className="size-4 opacity-80" aria-hidden />
            )}
          </div>
          <div
            className={cn("space-y-2 px-4 py-4 text-sm", isRtl && "text-right")}
            dir={isRtl ? "rtl" : "ltr"}
            lang={values.language}
          >
            <p className="font-medium">
              {values.language === "ar"
                ? "مرحباً بك في الإعدادات"
                : values.language === "fr"
                  ? "Bienvenue dans les paramètres"
                  : "Welcome to settings"}
            </p>
            <p
              className={cn(
                "text-xs",
                values.darkMode ? "text-zinc-400" : "text-zinc-500",
              )}
            >
              {values.language === "ar"
                ? "هذه معاينة مباشرة لتفضيلاتك."
                : values.language === "fr"
                  ? "Ceci est un aperçu en direct de vos préférences."
                  : "This is a live preview of your preferences."}
            </p>
          </div>
        </div>

        <Separator />

        <dl className="space-y-3 text-sm">
          <div className="flex items-start justify-between gap-3">
            <dt className="flex items-center gap-2 text-muted-foreground">
              {values.darkMode ? (
                <Moon className="size-4" aria-hidden />
              ) : (
                <Sun className="size-4" aria-hidden />
              )}
              Theme
            </dt>
            <dd className="font-medium">
              {values.darkMode ? "Dark" : "Light"}
            </dd>
          </div>
          <div className="flex items-start justify-between gap-3">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <Bell className="size-4" aria-hidden />
              Email
            </dt>
            <dd className="font-medium">
              {values.emailNotifications ? "On" : "Off"}
            </dd>
          </div>
          <div className="flex items-start justify-between gap-3">
            <dt className="flex items-center gap-2 text-muted-foreground">
              <Globe className="size-4" aria-hidden />
              Language
            </dt>
            <dd className="font-medium">{getLanguageLabel(values.language)}</dd>
          </div>
          <div className="flex items-start justify-between gap-3">
            <dt className="text-muted-foreground">Timezone</dt>
            <dd className="max-w-[60%] text-right font-medium">
              {getTimezoneLabel(values.timezone)}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}
