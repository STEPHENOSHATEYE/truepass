"use client"

import SiteHeader from "@/components/site-header"
import { useAppStore } from "@/store/use-app-store"
import FeaturedEventCard from "@/components/featured-event-card"
import EventRowCard from "@/components/event-row-card"
import SiteFooter from "@/components/site-footer"
import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, SlidersHorizontal } from "lucide-react"

export default function ExplorePage() {
  const { events, walletAddress, displayName } = useAppStore()

  const upcoming = useMemo(() => {
    const now = Date.now()
    return [...events]
      .filter((e) => new Date(e.endISO).getTime() >= now)
      .sort((a, b) => new Date(a.startISO).getTime() - new Date(b.startISO).getTime())
  }, [events])

  const popular = useMemo(() => {
    // naive popularity: has paid tickets first, then by soonest
    return [...events].sort((a, b) => {
      const ap = a.tickets.some((t) => t.isPaid) ? 1 : 0
      const bp = b.tickets.some((t) => t.isPaid) ? 1 : 0
      if (bp !== ap) return bp - ap
      return new Date(a.startISO).getTime() - new Date(b.startISO).getTime()
    })
  }, [events])

  const name = displayName ?? (walletAddress ? walletAddress.slice(0, 6) : "friend")

  return (
    <main>
      <SiteHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm" style={{ color: "var(--tp-muted)" }}>
          Welcome, {name}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-1">Explore Events</h1>

        {/* Featured */}
        <section className="mt-8">
          <div className="text-sm font-semibold" style={{ color: "var(--tp-muted)" }}>
            Featured Events
          </div>
          <div className="text-xs" style={{ color: "var(--tp-muted)" }}>
            Nigeria
          </div>
          <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {(upcoming.length ? upcoming.slice(0, 4) : events.slice(0, 4)).map((e) => (
              <FeaturedEventCard key={e.id} event={e} />
            ))}
          </div>

          {/* Filters bar */}
          <div className="mt-6 flex items-center gap-2">
            <Button
              variant="secondary"
              className="h-8 rounded-md border border-white/15 bg-white/5 text-white/90 hover:bg-white/10"
            >
              All Events
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              className="h-8 rounded-md border border-white/15 bg-white/5 text-white/90 hover:bg-white/10"
            >
              Price
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              className="h-8 rounded-md border border-white/15 bg-white/5 text-white/90 hover:bg-white/10"
            >
              Date
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <div className="ml-auto">
              <Button
                variant="secondary"
                className="h-8 rounded-md border border-white/15 bg-white/5 text-white/90 hover:bg-white/10"
              >
                View all
                <SlidersHorizontal className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Popular */}
        <section className="mt-8">
          <h2 className="text-sm font-semibold" style={{ color: "var(--tp-muted)" }}>
            Popular Events
          </h2>
          <div className="mt-4 grid gap-3">
            {popular.map((e) => (
              <EventRowCard key={e.id} event={e} />
            ))}
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  )
}
