"use client"

import SiteHeader from "@/components/site-header"
import { useAppStore } from "@/store/use-app-store"
import { Card } from "@/components/ui/card"
import TicketQRCode from "@/components/qr-code"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMemo, useState } from "react"
import SiteFooter from "@/components/site-footer"

export default function MyTicketsPage() {
  const { walletAddress, nfts, events, listForSale, cancelListing } = useAppStore()
  const mine = useMemo(() => nfts.filter((n) => n.owner === walletAddress), [nfts, walletAddress])
  const [prices, setPrices] = useState<Record<string, number>>({})

  function maxCap(tokenId: string): number | null {
    const nft = nfts.find((n) => n.id === tokenId)
    if (!nft) return null
    const ev = events.find((e) => e.id === nft.eventId)
    const tier = ev?.tickets.find((t) => t.id === nft.tierId)
    if (!tier || !tier.isPaid) return null
    return Math.round((tier.price * (tier.maxResalePercent ?? 110)) / 100)
  }

  return (
    <main>
      <SiteHeader />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white">My Tickets</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {mine.map((t) => {
            const ev = events.find((e) => e.id === t.eventId)!
            const tier = ev.tickets.find((x) => x.id === t.tierId)!
            const cap = maxCap(t.id)
            const price = prices[t.id] ?? cap ?? 0

            return (
              <Card key={t.id} className="p-4 grid gap-3">
                <div className="text-sm text-muted-foreground">{ev.name}</div>
                <div className="font-semibold">
                  {tier.name} {tier.isPaid ? `• $${tier.price}` : "• Free"}
                </div>
                <TicketQRCode payload={t.qrPayload} />
                <div className="text-xs text-muted-foreground">
                  {t.scanned ? "Checked-in ✓" : "Not scanned"}
                  {t.revived ? " • Revived art ✓" : ""}
                </div>

                {cap !== null && (
                  <div className="grid gap-2">
                    <div className="text-xs text-muted-foreground">List for resale (max ${cap})</div>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        min={0}
                        max={cap}
                        value={price}
                        onChange={(e) => setPrices({ ...prices, [t.id]: Number(e.target.value) })}
                      />
                      {t.listed ? (
                        <Button variant="outline" onClick={() => cancelListing(t.id)}>
                          Cancel
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            const res = listForSale(t.id, Number(price))
                            if (!res.ok) alert(res.error)
                          }}
                        >
                          List
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
        {mine.length === 0 && <p className="mt-8 text-muted-foreground">No tickets yet. Buy one from Explore.</p>}
      </div>
      <SiteFooter />
    </main>
  )
}
