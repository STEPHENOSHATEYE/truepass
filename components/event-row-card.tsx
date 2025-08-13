"use client"

import type { EventItem } from "@/lib/types"
import { CalendarClock, MapPin } from "lucide-react"
import Link from "next/link"

export default function EventRowCard({ event }: { event: EventItem }) {
  const start = new Date(event.startISO)
  const timeStr = start.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
  const price =
    event.tickets.some((t) => t.isPaid) && Math.min(...event.tickets.filter((t) => t.isPaid).map((t) => t.price))

  return (
    <Link
      href={`/events/${event.id}`}
      className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-xl border p-4 hover:bg-white/5 transition"
      style={{ borderColor: "rgba(255,255,255,0.12)" }}
    >
      <div>
        <div className="font-semibold text-white">{event.name}</div>
        <div className="mt-2 grid gap-2 text-xs" style={{ color: "var(--tp-muted)" }}>
          <div className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4" />
            <span>{timeStr}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>
        <div className="mt-2 text-sm font-medium">
          {price ? (
            <span style={{ color: "var(--tp-accent)" }}>${price.toFixed(2)}</span>
          ) : (
            <span className="text-white/80">Free</span>
          )}
        </div>
      </div>

      {/* Thumb on the right */}
      <div className="rounded-md overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.mediaUrl ?? "/placeholder.svg?height=120&width=120&query=event%20thumb"}
          alt="event thumb"
          className="h-20 w-20 object-cover"
        />
      </div>
    </Link>
  )
}
