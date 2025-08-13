"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { ThemeId } from "@/lib/themes"

type ThemeState = {
  theme: ThemeId
  setTheme: (t: ThemeId) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "emerald",
      setTheme: (t) => set({ theme: t }),
    }),
    { name: "truepass-theme" },
  ),
)
