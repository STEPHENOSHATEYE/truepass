export type ThemeName = "Emerald" | "Teal" | "Lime" | "Amber" | "Orange" | "Rose" | "Violet" | "Slate"

export type TicketTier = {
  id: string
  name: string
  isPaid: boolean
  price: number // in "testnet" currency units
  quantity: number
  unlimited?: boolean
  perWalletLimit: number | null
  perks?: string
  royaltyPercent?: number // creator royalty on secondary
  maxResalePercent?: number // e.g. 110 means 110% of original price max
  imageUrl?: string
  sold?: number
}

export type EventType = "Concert" | "Conference" | "Meetup" | "Festival" | "Sports" | "Other"

export type EventItem = {
  id: string
  creatorAddress: string
  name: string
  description?: string
  startISO: string
  endISO: string
  timezone: string
  location: string
  type: EventType
  mediaUrl?: string
  theme: ThemeName
  tickets: TicketTier[]
  createdAt: string
}

export type TicketNFT = {
  id: string // token id
  eventId: string
  tierId: string
  owner: string // wallet address
  email?: string
  qrPayload: string
  listed?: boolean
  resalePrice?: number
  scanned?: boolean
  revived?: boolean
  mintedAt: string
}

export type Listing = {
  tokenId: string
  price: number
}
