"use client"

import SiteHeader from "@/components/site-header"
import { useAppStore } from "@/store/use-app-store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function MarketPage() {
  const { listings, nfts, events, walletAddress, purchaseListing } = useAppStore()
  const items = listings
    .map((l) => {
      const nft = nfts.find((n) => n.id === l.tokenId)
      const ev = nft ? events.find((e) => e.id === nft.eventId) : undefined
      const tier = nft && ev ? ev.tickets.find((t) => t.id === nft.tierId) : undefined
      return { l, nft, ev, tier }
    })
    .filter((x) => x.nft && x.ev && x.tier)

  return (
    <main>
      <SiteHeader />
      <div className="container py-8">
        <h1 className="text-2xl font-bold">Secondary Market</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {items.map(({ l, nft, ev, tier }) => (
            <Card key={l.tokenId} className="p-4 grid gap-2">
              <div className="font-semibold">{ev!.name}</div>
              <div className="text-sm text-muted-foreground">{tier!.name}</div>
              <div className="text-sm">Price: ${l.price}</div>
              <Button
                disabled={!walletAddress}
                onClick={() => {
                  if (!walletAddress) return alert("Connect your wallet")
                  const res = purchaseListing(l.tokenId, walletAddress)
                  if (!res.ok) alert(res.error)
                }}
              >
                Buy
              </Button>
            </Card>
          ))}
        </div>
        {items.length === 0 && <p className="mt-8 text-muted-foreground">No listings yet.</p>}
      </div>
    </main>
  )
}
