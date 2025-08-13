export type ThemeId = "emerald" | "teal" | "lime" | "amber" | "orange" | "rose" | "violet" | "slate"

export type ThemePreset = {
  name: string
  id: ThemeId
  // Core variables
  accent: string // hex
  accentContrast: "#000000" | "#ffffff"
  bgStart: string
  bgEnd: string
  surface: string
  surface2: string
  text: string
  mutedText: string
}

export const THEMES: Record<ThemeId, ThemePreset> = {
  emerald: {
    id: "emerald",
    name: "Emerald",
    accent: "#10B981",
    accentContrast: "#000000",
    bgStart: "#0B3B2C",
    bgEnd: "#0E2A22",
    surface: "#2F5B48",
    surface2: "#2A5A46",
    text: "#FFFFFF",
    mutedText: "rgba(255,255,255,0.7)",
  },
  teal: {
    id: "teal",
    name: "Teal",
    accent: "#14B8A6",
    accentContrast: "#000000",
    bgStart: "#083B3B",
    bgEnd: "#0B2C2C",
    surface: "#275454",
    surface2: "#214D4D",
    text: "#FFFFFF",
    mutedText: "rgba(255,255,255,0.7)",
  },
  lime: {
    id: "lime",
    name: "Lime",
    accent: "#84CC16",
    accentContrast: "#000000",
    bgStart: "#243B0B",
    bgEnd: "#1B2A08",
    surface: "#3E5B23",
    surface2: "#36511F",
    text: "#FFFFFF",
    mutedText: "rgba(255,255,255,0.7)",
  },
  amber: {
    id: "amber",
    name: "Amber",
    accent: "#F59E0B",
    accentContrast: "#000000",
    bgStart: "#3B2A0B",
    bgEnd: "#2A1E08",
    surface: "#5B4623",
    surface2: "#513D1F",
    text: "#FFFFFF",
    mutedText: "rgba(255,255,255,0.78)",
  },
  orange: {
    id: "orange",
    name: "Orange",
    accent: "#FB923C",
    accentContrast: "#000000",
    bgStart: "#3B210B",
    bgEnd: "#2A1708",
    surface: "#5B3823",
    surface2: "#512F1F",
    text: "#FFFFFF",
    mutedText: "rgba(255,255,255,0.78)",
  },
  rose: {
    id: "rose",
    name: "Rose",
    accent: "#F43F5E",
    accentContrast: "#ffffff",
    bgStart: "#3B0B16",
    bgEnd: "#2A0810",
    surface: "#5B2330",
    surface2: "#511F2B",
    text: "#FFFFFF",
    mutedText: "rgba(255,255,255,0.78)",
  },
  violet: {
    id: "violet",
    name: "Violet",
    accent: "#8B5CF6",
    accentContrast: "#ffffff",
    bgStart: "#1B103B",
    bgEnd: "#130B2A",
    surface: "#34235B",
    surface2: "#2E1F51",
    text: "#FFFFFF",
    mutedText: "rgba(255,255,255,0.8)",
  },
  slate: {
    id: "slate",
    name: "Slate",
    accent: "#94A3B8",
    accentContrast: "#000000",
    bgStart: "#0F172A",
    bgEnd: "#0B1220",
    surface: "#1E293B",
    surface2: "#172233",
    text: "#FFFFFF",
    mutedText: "rgba(255,255,255,0.8)",
  },
}

export const NAME_TO_ID: Record<string, ThemeId> = {
  Emerald: "emerald",
  Teal: "teal",
  Lime: "lime",
  Amber: "amber",
  Orange: "orange",
  Rose: "rose",
  Violet: "violet",
  Slate: "slate",
}
