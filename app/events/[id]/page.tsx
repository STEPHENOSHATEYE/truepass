"use client"

import SiteHeader from "@/components/site-header"
import { useAppStore } from "@/store/use-app-store"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import SiteFooter from "@/components/site-footer"

export default function EventDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { events, walletAddress, buyTicket } = useAppStore()
  const event = events.find((e) => e.id === params.id)
  const [email, setEmail] = useState("")

  if (!event) {
    return (
      <main>
        <SiteHeader />
        <div className="container mx-auto px-4 py-12">
          <p className="text-muted-foreground">Event not found.</p>
          <Button className="mt-4" onClick={() => router.push("/explore")}>
            Back to Explore
          </Button>
        </div>
        <SiteFooter />
      </main>
    )
  }

  function handleBuy(tierId: string) {
    if (!walletAddress) {
      alert("Please connect your wallet or social.")
      return
    }
    const res = buyTicket(event.id, tierId, walletAddress, email || undefined)
    if (!res.ok) {
      alert(res.error)
    } else {
      alert("Ticket purchased! Find it under My Tickets.")
    }
  }

  return (
    <main>
      <SiteHeader />
      <div className="container mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.mediaUrl ?? "/placeholder.svg?height=400&width=800&query=event%20cover"}
            alt="cover"
            className="w-full rounded-lg border"
          />
          <h1 className="mt-6 text-3xl font-bold text-white">{event.name}</h1>
          <p className="mt-2" style={{ color: "var(--tp-muted)" }}>
            {event.description}
          </p>
          <div className="mt-4 text-sm" style={{ color: "var(--tp-muted)" }}>
            <div>
              When: {new Date(event.startISO).toLocaleString()} - {new Date(event.endISO).toLocaleString()} (
              {event.timezone})
            </div>
            <div>Where: {event.location}</div>
            <div>Type: {event.type}</div>
            <div>Theme: {event.theme}</div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-4 grid gap-3">
            <h3 className="font-semibold">Ticket Tiers</h3>
            <Input
              placeholder="Send ticket to email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {event.tickets.map((t) => {
              const sold = t.sold ?? 0
              const remaining = t.unlimited ? Number.POSITIVE_INFINITY : t.quantity - sold
              const disabled = !t.unlimited && remaining <= 0
              return (
                <div key={t.id} className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.isPaid ? `$${t.price}` : "Free"} • {t.unlimited ? "∞ available" : `${remaining} available`}
                    </div>
                  </div>
                  <Button size="sm" disabled={disabled} onClick={() => handleBuy(t.id)}>
                    {disabled ? "Sold out" : "Buy"}
                  </Button>
                </div>
              )
            })}
          </Card>
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}
