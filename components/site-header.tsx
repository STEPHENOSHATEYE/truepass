"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/store/use-app-store"
import { ArrowUpRight, Ticket, Sparkles, User } from "lucide-react"
import CurrentTime from "./current-time"

function short(addr: string) {
  return `${addr.slice(0, 4)}...${addr.slice(-3)}`
}

export default function SiteHeader() {
  const { walletAddress, displayName, connectWallet, disconnect, seedIfEmpty } = useAppStore()

  if (typeof window !== "undefined") {
    setTimeout(() => seedIfEmpty(), 0)
  }

  return (
    <header className="top-0 z-40 w-full">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Left: Brand + Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="font-semibold text-lg" style={{ color: "var(--tp-text)" }}>
            TruePass
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              className="inline-flex items-center gap-2 hover:opacity-100"
              style={{ color: "var(--tp-muted)" }}
              href="/explore"
            >
              <ArrowUpRight className="h-4 w-4" />
              Explore Events
            </Link>
            <Link
              className="inline-flex items-center gap-2 hover:opacity-100"
              style={{ color: "var(--tp-muted)" }}
              href="/create"
            >
              <Sparkles className="h-4 w-4" />
              Create Event
            </Link>
            <Link
              className="inline-flex items-center gap-2 hover:opacity-100"
              style={{ color: "var(--tp-muted)" }}
              href="/my-tickets"
            >
              <Ticket className="h-4 w-4" />
              My Tickets
            </Link>
          </nav>
        </div>

        {/* Right: Time + Wallet */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <CurrentTime />
          </div>

          {walletAddress ? (
            <Button
              variant="secondary"
              className="rounded-lg"
              style={{ backgroundColor: "#ffffff", color: "#000" }}
              onClick={() => disconnect()}
            >
              <User className="mr-2 h-4 w-4" />
              {displayName ?? short(walletAddress)}
            </Button>
          ) : (
            <Button
              className="rounded-lg"
              style={{ backgroundColor: "#ffffff", color: "#000" }}
              onClick={() => connectWallet("wallet")}
            >
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
