"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { nanoid } from "nanoid"
import type { EventItem, TicketNFT, Listing, TicketTier } from "@/lib/types"

type AppState = {
  walletAddress: string | null
  displayName: string | null
  events: EventItem[]
  nfts: TicketNFT[]
  listings: Listing[]

  connectWallet: (provider?: "wallet" | "x" | "tiktok") => void
  disconnect: () => void

  seedIfEmpty: () => void

  addEvent: (e: Omit<EventItem, "id" | "createdAt">) => string
  updateEvent: (id: string, patch: Partial<EventItem>) => void
  deleteEvent: (id: string) => void

  buyTicket: (
    eventId: string,
    tierId: string,
    buyerAddr: string,
    email?: string,
  ) => { ok: boolean; error?: string; tokenId?: string }
  listForSale: (tokenId: string, price: number) => { ok: boolean; error?: string }
  cancelListing: (tokenId: string) => void
  purchaseListing: (tokenId: string, buyerAddr: string) => { ok: boolean; error?: string }

  scanTicket: (qrPayload: string) => { ok: boolean; error?: string; token?: TicketNFT }
  reviveTicket: (tokenId: string) => void
}

function formatAddr(addr: string) {
  return `${addr.slice(0, 4)}...${addr.slice(-4)}`
}

const nowISO = () => new Date().toISOString()

function isSoldOut(t: TicketTier) {
  const sold = t.sold ?? 0
  if (t.unlimited) return false
  return sold >= t.quantity
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      walletAddress: null,
      displayName: null,
      events: [],
      nfts: [],
      listings: [],

      connectWallet: (provider = "wallet") => {
        const addr = "0x" + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 6)
        set({ walletAddress: addr, displayName: provider === "wallet" ? null : `${provider}-${formatAddr(addr)}` })
      },
      disconnect: () => set({ walletAddress: null, displayName: null }),

      seedIfEmpty: () => {
        const { events } = get()
        if (events.length > 0) return
        const creator = "0x1234seed0000abcd"
        const e1: EventItem = {
          id: nanoid(),
          creatorAddress: creator,
          name: "Camp Fest Lagos",
          description: "A community festival celebrating web3 builders on Camp.",
          startISO: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
          endISO: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 60 * 4).toISOString(),
          timezone: "GMT+01:00 Lagos",
          location: "Landmark Centre, Lagos",
          type: "Festival",
          mediaUrl: "/placeholder.svg?height=400&width=600",
          theme: "Emerald",
          tickets: [
            {
              id: nanoid(),
              name: "General Admission",
              isPaid: false,
              price: 0,
              quantity: 0,
              unlimited: true,
              perWalletLimit: 2,
              perks: "Access to all open stages",
              royaltyPercent: 5,
              maxResalePercent: 110,
              imageUrl: "/placeholder.svg?height=120&width=120",
              sold: 0,
            },
            {
              id: nanoid(),
              name: "VIP",
              isPaid: true,
              price: 500,
              quantity: 20,
              perWalletLimit: 1,
              perks: "VIP lounge + backstage tour",
              royaltyPercent: 10,
              maxResalePercent: 110,
              imageUrl: "/placeholder.svg?height=120&width=120",
              sold: 0,
            },
          ],
          createdAt: nowISO(),
        }
        const e2: EventItem = {
          id: nanoid(),
          creatorAddress: creator,
          name: "Origin SDK Workshop",
          description: "Hands-on workshop to mint IP NFT tickets.",
          startISO: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
          endISO: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 + 1000 * 60 * 60 * 2).toISOString(),
          timezone: "GMT+01:00 Lagos",
          location: "Online",
          type: "Conference",
          mediaUrl: "/placeholder.svg?height=400&width=600",
          theme: "Violet",
          tickets: [
            {
              id: nanoid(),
              name: "Builder Pass",
              isPaid: true,
              price: 25,
              quantity: 100,
              perWalletLimit: 2,
              perks: "Workshop materials and POAP",
              royaltyPercent: 7,
              maxResalePercent: 110,
              imageUrl: "/placeholder.svg?height=120&width=120",
              sold: 0,
            },
          ],
          createdAt: nowISO(),
        }
        set({ events: [e1, e2] })
      },

      addEvent: (e) => {
        const id = nanoid()
        const created: EventItem = { ...e, id, createdAt: nowISO() }
        set((s) => ({ events: [created, ...s.events] }))
        return id
      },
      updateEvent: (id, patch) => {
        set((s) => ({ events: s.events.map((ev) => (ev.id === id ? { ...ev, ...patch } : ev)) }))
      },
      deleteEvent: (id) => {
        set((s) => ({
          events: s.events.filter((e) => e.id !== id),
          nfts: s.nfts.filter((n) => n.eventId !== id),
          listings: s.listings.filter((l) => s.nfts.find((n) => n.id === l.tokenId)?.eventId !== id),
        }))
      },

      buyTicket: (eventId, tierId, buyerAddr, email) => {
        const s = get()
        const ev = s.events.find((e) => e.id === eventId)
        if (!ev) return { ok: false, error: "Event not found" }
        const tier = ev.tickets.find((t) => t.id === tierId)
        if (!tier) return { ok: false, error: "Tier not found" }
        const sold = tier.sold ?? 0
        if (!tier.unlimited && sold >= tier.quantity) return { ok: false, error: "Sold out" }

        const ownedOfTier = s.nfts.filter(
          (n) => n.eventId === eventId && n.tierId === tierId && n.owner === buyerAddr,
        ).length
        if (tier.perWalletLimit && ownedOfTier >= tier.perWalletLimit) {
          return { ok: false, error: "Per-wallet limit reached" }
        }

        const tokenId = nanoid()
        const payload = JSON.stringify({ tokenId, eventId, tierId })
        const nft: TicketNFT = {
          id: tokenId,
          eventId,
          tierId,
          owner: buyerAddr,
          email,
          qrPayload: payload,
          mintedAt: nowISO(),
        }
        set((state) => ({
          nfts: [nft, ...state.nfts],
          events: state.events.map((e) =>
            e.id === eventId
              ? {
                  ...e,
                  tickets: e.tickets.map((t) => (t.id === tierId ? { ...t, sold: (t.sold ?? 0) + 1 } : t)),
                }
              : e,
          ),
        }))
        return { ok: true, tokenId }
      },

      listForSale: (tokenId, price) => {
        const s = get()
        const nft = s.nfts.find((n) => n.id === tokenId)
        if (!nft) return { ok: false, error: "Token not found" }
        const ev = s.events.find((e) => e.id === nft.eventId)
        const tier = ev?.tickets.find((t) => t.id === nft.tierId)
        if (!ev || !tier) return { ok: false, error: "Tier not found" }

        const cap = tier.isPaid ? Math.round((tier.price * (tier.maxResalePercent ?? 110)) / 100) : 0
        if (tier.isPaid && price > cap) return { ok: false, error: `Max resale is ${cap}` }

        set((state) => ({
          listings: [{ tokenId, price }, ...state.listings.filter((l) => l.tokenId !== tokenId)],
          nfts: state.nfts.map((n) => (n.id === tokenId ? { ...n, listed: true, resalePrice: price } : n)),
        }))
        return { ok: true }
      },

      cancelListing: (tokenId) =>
        set((state) => ({
          listings: state.listings.filter((l) => l.tokenId !== tokenId),
          nfts: state.nfts.map((n) => (n.id === tokenId ? { ...n, listed: false, resalePrice: undefined } : n)),
        })),

      purchaseListing: (tokenId, buyerAddr) => {
        const s = get()
        const listing = s.listings.find((l) => l.tokenId === tokenId)
        if (!listing) return { ok: false, error: "Listing not found" }
        const nft = s.nfts.find((n) => n.id === tokenId)
        if (!nft) return { ok: false, error: "Token not found" }

        set((state) => ({
          nfts: state.nfts.map((n) =>
            n.id === tokenId ? { ...n, owner: buyerAddr, listed: false, resalePrice: undefined } : n,
          ),
          listings: state.listings.filter((l) => l.tokenId !== tokenId),
        }))
        return { ok: true }
      },

      scanTicket: (qrPayload) => {
        try {
          const obj = JSON.parse(qrPayload) as { tokenId: string }
          const s = get()
          const token = s.nfts.find((n) => n.id === obj.tokenId)
          if (!token) return { ok: false, error: "Ticket not found" }
          if (token.scanned) return { ok: false, error: "Already scanned" }
          set((state) => ({ nfts: state.nfts.map((n) => (n.id === obj.tokenId ? { ...n, scanned: true } : n)) }))
          return { ok: true, token: { ...token, scanned: true } }
        } catch {
          return { ok: false, error: "Invalid QR" }
        }
      },

      reviveTicket: (tokenId) =>
        set((state) => ({ nfts: state.nfts.map((n) => (n.id === tokenId ? { ...n, revived: true } : n)) })),
    }),
    { name: "truepass-store" },
  ),
)
