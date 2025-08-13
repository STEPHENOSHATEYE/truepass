"use client"

import { useEffect } from "react"
import { THEMES, type ThemeId } from "@/lib/themes"
import { useThemeStore } from "@/store/use-theme"

function hexToRgb(hex: string) {
  const v = hex.replace("#", "")
  const bigint = Number.parseInt(
    v.length === 3
      ? v
          .split("")
          .map((c) => c + c)
          .join("")
      : v,
    16,
  )
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return { r, g, b }
}

function applyTheme(id: ThemeId) {
  const t = THEMES[id]
  const root = document.documentElement
  const { r, g, b } = hexToRgb(t.accent)
  root.style.setProperty("--tp-accent", t.accent)
  root.style.setProperty("--tp-accent-20", `rgba(${r}, ${g}, ${b}, 0.2)`)
  root.style.setProperty("--tp-accent-30", `rgba(${r}, ${g}, ${b}, 0.3)`)
  root.style.setProperty("--tp-accent-contrast", t.accentContrast)
  root.style.setProperty("--tp-bg-start", t.bgStart)
  root.style.setProperty("--tp-bg-end", t.bgEnd)
  root.style.setProperty("--tp-surface", t.surface)
  root.style.setProperty("--tp-surface2", t.surface2)
  root.style.setProperty("--tp-text", t.text)
  root.style.setProperty("--tp-muted", t.mutedText)
}

export default function ThemeVariables() {
  const { theme } = useThemeStore()
  useEffect(() => {
    applyTheme(theme)
  }, [theme])
  return null
}
