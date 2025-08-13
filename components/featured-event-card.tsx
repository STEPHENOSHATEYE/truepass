"use client"

import type { EventItem } from "@/lib/types"

export default function FeaturedEventCard({ event }: { event: EventItem }) {
  const date = new Date(event.startISO)
  const subtitle = date.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })

  return (
    <div className="relative rounded-xl overflow-hidden bg-black/40">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={event.mediaUrl ?? "/placeholder.svg?height=400&width=600&query=featured%20event"}
        alt={`${event.name} image`}
        className="h-56 w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="text-white font-semibold drop-shadow">{event.name}</div>
        <div className="text-white/80 text-xs drop-shadow">{subtitle}</div>
      </div>
    </div>
  )
}
