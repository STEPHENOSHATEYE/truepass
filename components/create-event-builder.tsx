"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppStore } from "@/store/use-app-store"
import TicketModal from "./ticket-modal"
import type { EventItem, TicketTier, ThemeName, EventType } from "@/lib/types"
import { useRouter } from "next/navigation"
import { Trash2, PencilLine, UploadCloud, Globe, MapPin, FileText } from "lucide-react"
import { useThemeStore } from "@/store/use-theme"
import { NAME_TO_ID } from "@/lib/themes"

const THEME_OPTIONS: ThemeName[] = ["Emerald", "Teal", "Lime", "Amber", "Orange", "Rose", "Violet", "Slate"]

export default function CreateEventBuilder() {
  const router = useRouter()
  const { walletAddress, addEvent } = useAppStore()
  const { setTheme } = useThemeStore()
  const [step, setStep] = useState<1 | 2>(1)

  // Step 1
  const [name, setName] = useState("")
  const [mediaUrl, setMediaUrl] = useState<string | undefined>()
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState<EventType | undefined>()
  const [theme, setThemeLocal] = useState<ThemeName>("Emerald")

  const [startDate, setStartDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endDate, setEndDate] = useState("")
  const [endTime, setEndTime] = useState("")
  const [timezone, setTimezone] = useState("GMT +01:00 Lagos")

  // Step 2
  const [tiers, setTiers] = useState<TicketTier[]>([])

  function handleMedia(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) {
      const url = URL.createObjectURL(f)
      setMediaUrl(url)
    }
  }

  function addTier(t: TicketTier) {
    setTiers((prev) => [...prev, t])
  }
  function removeTier(id: string) {
    setTiers((prev) => prev.filter((t) => t.id !== id))
  }

  function dateTimeToISO(d: string, t: string) {
    if (!d || !t) return ""
    return new Date(`${d}T${t}`).toISOString()
  }

  function deploy() {
    if (!walletAddress) {
      alert("Connect a wallet or social first.")
      return
    }
    const startISO = dateTimeToISO(startDate, startTime)
    const endISO = dateTimeToISO(endDate, endTime)
    if (!name || !startISO || !endISO || !type) {
      alert("Fill event details.")
      return
    }
    if (tiers.length === 0) {
      alert("Add at least one ticket tier.")
      return
    }

    const payload: Omit<EventItem, "id" | "createdAt"> = {
      creatorAddress: walletAddress,
      name,
      description,
      startISO,
      endISO,
      timezone,
      location,
      type,
      mediaUrl: mediaUrl ?? "/placeholder.svg?height=400&width=600",
      theme,
      tickets: tiers,
    }

    const id = addEvent(payload)
    router.push(`/events/${id}`)
  }

  const inputGreen = "border-transparent text-white placeholder:text-white/70"
  const selectGreen = "border-transparent text-white"

  return (
    <div className="min-h-[calc(100vh-4rem)] text-white" style={{ backgroundColor: "var(--tp-bg-start)" }}>
      <div className="container py-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Create Event Ticket</h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left: Upload and Theme */}
          <div>
            <Card className="border-none p-0 overflow-hidden" style={{ backgroundColor: "var(--tp-surface)" }}>
              <div className="p-6">
                <div
                  className="aspect-[4/3] rounded-xl border grid place-content-center overflow-hidden"
                  style={{ backgroundColor: "var(--tp-surface2)", borderColor: "rgba(255,255,255,0.1)" }}
                >
                  {mediaUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={mediaUrl || "/placeholder.svg"}
                      alt="Event media"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <UploadCloud className="mx-auto h-10 w-10" />
                      <p className="mt-4 font-semibold">Upload and drop media</p>
                      <button
                        type="button"
                        className="mt-2 underline underline-offset-4"
                        style={{ color: "var(--tp-accent)" }}
                        onClick={() => document.getElementById("file-input")?.click()}
                      >
                        Browse files
                      </button>
                      <p className="mt-4 text-sm" style={{ color: "var(--tp-muted)" }}>
                        Max size: 50MB
                        <br />
                        JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF
                      </p>
                    </div>
                  )}
                </div>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*,video/*,model/gltf-binary,model/gltf+json,audio/*"
                  onChange={handleMedia}
                  className="sr-only"
                />
              </div>
            </Card>

            {/* Theme Select pill */}
            <div className="mt-4">
              <Label className="mb-2 block" style={{ color: "var(--tp-muted)" }}>
                Theme
              </Label>
              <Select
                value={theme}
                onValueChange={(v) => {
                  const name = v as ThemeName
                  setThemeLocal(name)
                  // set global theme
                  const id = NAME_TO_ID[name]
                  if (id) setTheme(id)
                }}
              >
                <SelectTrigger
                  className="h-12 rounded-lg"
                  style={{ backgroundColor: "var(--tp-surface2)", color: "var(--tp-text)", borderColor: "transparent" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="h-6 w-10 rounded-md" style={{ backgroundColor: "var(--tp-accent)" }} />
                    <span className="font-semibold">{theme}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {THEME_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right: Details or Ticket builder */}
          {step === 1 ? (
            <div className="grid gap-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Event details</h2>
                <div className="h-px w-full" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
              </div>

              <div className="relative">
                <Input
                  placeholder="Event Name Here"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-3xl md:text-4xl font-bold px-4 py-5"
                  style={{ backgroundColor: "var(--tp-surface2)", color: "var(--tp-text)", borderColor: "transparent" }}
                />
              </div>

              <div className="grid grid-cols-[1fr_1fr] gap-3">
                <div className="grid grid-cols-[1fr_1fr] gap-3">
                  <div>
                    <Label style={{ color: "var(--tp-muted)" }}>Start Date</Label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className={inputGreen}
                      style={{ backgroundColor: "var(--tp-surface2)" }}
                    />
                    <Input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className={`${inputGreen} mt-2`}
                      style={{ backgroundColor: "var(--tp-surface2)" }}
                    />
                  </div>
                  <div>
                    <Label style={{ color: "var(--tp-muted)" }}>End Date</Label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className={inputGreen}
                      style={{ backgroundColor: "var(--tp-surface2)" }}
                    />
                    <Input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className={`${inputGreen} mt-2`}
                      style={{ backgroundColor: "var(--tp-surface2)" }}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label style={{ color: "var(--tp-muted)" }}>Timezone</Label>
                  <div
                    className="h-[76px] rounded-lg border flex items-center gap-3 px-3"
                    style={{ backgroundColor: "var(--tp-surface2)", borderColor: "transparent" }}
                  >
                    <Globe className="h-4 w-4" />
                    <Input
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="bg-transparent border-0 p-0 focus-visible:ring-0"
                      style={{ color: "var(--tp-text)" }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label style={{ color: "var(--tp-muted)" }}>Add Event Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                  <Input
                    placeholder="Offline location or virtual link"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={`${inputGreen} pl-9`}
                    style={{ backgroundColor: "var(--tp-surface2)" }}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label style={{ color: "var(--tp-muted)" }}>Add description</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4" />
                  <Textarea
                    placeholder="What is your event all about?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`${inputGreen} min-h-[56px] pl-9`}
                    style={{ backgroundColor: "var(--tp-surface2)" }}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label style={{ color: "var(--tp-muted)" }}>Event type</Label>
                <Select value={type} onValueChange={(v) => setType(v as any)}>
                  <SelectTrigger
                    className={`${selectGreen} h-12 rounded-lg`}
                    style={{ backgroundColor: "var(--tp-surface2)" }}
                  >
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Concert">Concert</SelectItem>
                    <SelectItem value="Conference">Conference</SelectItem>
                    <SelectItem value="Meetup">Meetup</SelectItem>
                    <SelectItem value="Festival">Festival</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-2">
                <Button
                  className="w-full rounded-lg"
                  style={{ backgroundColor: "#ffffff", color: "#000", borderColor: "transparent" }}
                  onClick={() => setStep(2)}
                >
                  Next: Create event ticket
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Ticket details</h2>
                <div className="h-px w-full" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
              </div>

              <Tabs defaultValue="paid" className="w-full">
                <TabsList className="bg-[color:var(--tp-surface2)]">
                  <TabsTrigger value="free">Free</TabsTrigger>
                  <TabsTrigger value="paid">Paid</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="grid gap-3">
                {tiers.length === 0 ? (
                  <div
                    className="rounded-xl border py-12 px-6 text-center"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/placeholder.svg?height=100&width=140"
                      alt="ticket illustration"
                      className="mx-auto mb-4"
                    />
                    <div className="font-semibold">{"Let's create tickets"}</div>
                    <p className="text-sm" style={{ color: "var(--tp-muted)" }}>
                      You don&apos;t have any tickets created yet, create your first ticket - it will only take 1 minute
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {tiers.map((t) => {
                      const remaining = t.unlimited ? "∞" : Math.max(0, t.quantity - (t.sold ?? 0)).toString()
                      return (
                        <div
                          key={t.id}
                          className="flex items-center gap-4 rounded-2xl border p-4"
                          style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={t.imageUrl ?? "/placeholder.svg?height=80&width=80&query=ticket"}
                            alt="ticket"
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold">{t.name}</div>
                            <div className="mt-1 flex items-center gap-3 text-sm">
                              <span
                                className="rounded-full px-2 py-0.5 text-xs"
                                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                              >
                                {remaining} available
                              </span>
                              <span>{t.isPaid ? `$${t.price}` : "Free"}</span>
                            </div>
                          </div>
                          <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full bg-transparent"
                            style={{ backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.1)" }}
                          >
                            <PencilLine className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => removeTier(t.id)}
                            className="rounded-full"
                            style={{ backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.1)" }}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <TicketModal
                  onAdd={addTier}
                  trigger={
                    <Button className="rounded-lg px-6" style={{ backgroundColor: "#ffffff", color: "#000" }}>
                      + Add new ticket
                    </Button>
                  }
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="outline"
                  className="rounded-lg bg-transparent"
                  style={{ borderColor: "rgba(255,255,255,0.4)", color: "var(--tp-text)" }}
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button className="rounded-lg" style={{ backgroundColor: "#ffffff", color: "#000" }} onClick={deploy}>
                  Deploy Event & Mint Tickets
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
