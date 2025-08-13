"use client"

import SiteHeader from "@/components/site-header"
import { useAppStore } from "@/store/use-app-store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useMemo } from "react"
import SiteFooter from "@/components/site-footer"

export default function RevivePage() {
  const { walletAddress, nfts, events, reviveTicket } = useAppStore()
  const eligible = useMemo(
    () => nfts.filter((n) => n.owner === walletAddress && n.scanned && !n.revived),
    [nfts, walletAddress],
  )

  return (
    <main>
      <SiteHeader />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white">Revive Your Tickets</h1>
        <p className="text-sm text-muted-foreground">
          Turn scanned tickets into personalized art and unlock future perks.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {eligible.map((t) => {
            const ev = events.find((e) => e.id === t.eventId)!
            return (
              <Card key={t.id} className="p-4 grid gap-3">
                <div className="font-semibold">{ev.name}</div>
                {/* Art preview */}
                <div className="rounded-lg border overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/placeholder.svg?height=300&width=500&query=${encodeURIComponent(
                      ev.theme + " personalized ticket art",
                    )}`}
                    alt="Revived art preview"
                    className="w-full h-40 object-cover"
                  />
                </div>
                <Button onClick={() => reviveTicket(t.id)}>Revive</Button>
              </Card>
            )
          })}
        </div>

        {eligible.length === 0 && (
          <p className="mt-8 text-muted-foreground">No eligible tickets. Attend an event and scan your ticket first.</p>
        )}
      </div>
      <SiteFooter />
    </main>
  )
}
