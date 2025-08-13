"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { EventItem } from "@/lib/types"
import { CalendarClock, MapPin } from "lucide-react"

export default function EventCard({ event }: { event: EventItem }) {
  const start = new Date(event.startISO)
  const dateStr = start.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <Card className="overflow-hidden">
      <div className="aspect-[16/9] w-full bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.mediaUrl ?? "/placeholder.svg?height=400&width=600&query=event%20image"}
          alt={`${event.name} cover`}
          className="h-full w-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{event.name}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CalendarClock className="h-4 w-4" />
          <span>{dateStr}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span className="line-clamp-1">{event.location}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm">
          {event.tickets.some((t) => t.isPaid) ? (
            <span>From ${Math.min(...event.tickets.filter((t) => t.isPaid).map((t) => t.price))}</span>
          ) : (
            <span>Free</span>
          )}
        </div>
        <Button asChild size="sm">
          <Link href={`/events/${event.id}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
