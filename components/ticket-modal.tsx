"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TicketTier } from "@/lib/types"
import { nanoid } from "nanoid"

type Props = {
  onAdd: (tier: TicketTier) => void
  trigger?: React.ReactNode
  defaultOpen?: boolean
}

export default function TicketModal({ onAdd, trigger, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen)
  const [tab, setTab] = useState<"free" | "paid">("free")
  const [name, setName] = useState("")
  const [quantityMode, setQuantityMode] = useState<"limited" | "infinite">("limited")
  const [quantity, setQuantity] = useState<number>(50)
  const [limit, setLimit] = useState<number | null>(null)
  const [perks, setPerks] = useState("")
  const [royalty, setRoyalty] = useState<number>(5)
  const [maxResale, setMaxResale] = useState<number>(110)
  const [price, setPrice] = useState<number>(0)

  const canSave =
    name.trim().length > 0 && (quantityMode === "infinite" || quantity > 0) && (tab === "free" || price >= 0)

  function save() {
    if (!canSave) return
    const tier: TicketTier = {
      id: nanoid(),
      name: name.trim(),
      isPaid: tab === "paid",
      price: tab === "paid" ? Number(price) : 0,
      quantity: quantityMode === "infinite" ? 0 : Number(quantity),
      unlimited: quantityMode === "infinite",
      perWalletLimit: limit ? Number(limit) : null,
      perks: perks.trim() || undefined,
      royaltyPercent: Number(royalty),
      maxResalePercent: Number(maxResale),
      imageUrl: "/placeholder.svg?height=120&width=120",
      sold: 0,
    }
    onAdd(tier)
    setOpen(false)
    setName("")
    setQuantityMode("limited")
    setQuantity(50)
    setLimit(null)
    setPerks("")
    setRoyalty(5)
    setMaxResale(110)
    setPrice(0)
    setTab("free")
  }

  const inputGreen = "border-transparent text-white placeholder:text-white/60"
  const selectGreen = "border-transparent text-white"

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button className="bg-white text-black hover:bg-white/90 rounded-lg px-5">+ Add new ticket</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-neutral-900 text-neutral-100 border-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-xl">Add a new single ticket</DialogTitle>
          <DialogDescription className="text-neutral-400">Configure a free or paid ticket tier</DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as "free" | "paid")} className="w-full">
          <TabsList className="grid grid-cols-2 w-full bg-neutral-800">
            <TabsTrigger value="free">Free</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
          </TabsList>
          <TabsContent value="free" />
          <TabsContent value="paid" />
        </Tabs>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="tname">Add Ticket Name</Label>
            <Input
              id="tname"
              placeholder="Name your ticket"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputGreen}
              style={{ backgroundColor: "var(--tp-surface2)" }}
            />
          </div>

          {tab === "paid" && (
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                min={0}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className={inputGreen}
                style={{ backgroundColor: "var(--tp-surface2)" }}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label>Ticket quantity</Label>
              <Select value={quantityMode} onValueChange={(v) => setQuantityMode(v as "limited" | "infinite")}>
                <SelectTrigger className={`${selectGreen}`} style={{ backgroundColor: "var(--tp-surface2)" }}>
                  <SelectValue placeholder="Limited quantity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="limited">Limited quantity</SelectItem>
                  <SelectItem value="infinite">Infinite quantity</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="qty">Enter amount</Label>
              <Input
                id="qty"
                type="number"
                min={1}
                value={quantity}
                disabled={quantityMode === "infinite"}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className={inputGreen}
                style={{ backgroundColor: "var(--tp-surface2)" }}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Ticket purchase limit</Label>
            <Select value={String(limit ?? "")} onValueChange={(v) => setLimit(v ? Number(v) : null)}>
              <SelectTrigger className={selectGreen} style={{ backgroundColor: "var(--tp-surface2)" }}>
                <SelectValue placeholder="how many tickets per wallet.." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">No limit</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="perks">Perks for this ticket</Label>
            <Input
              id="perks"
              placeholder="What is the benefit of this ticket?"
              value={perks}
              onChange={(e) => setPerks(e.target.value)}
              className={inputGreen}
              style={{ backgroundColor: "var(--tp-surface2)" }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="royalty">Secondary market royalty (%)</Label>
              <Input
                id="royalty"
                type="number"
                min={0}
                max={100}
                value={royalty}
                onChange={(e) => setRoyalty(Number(e.target.value))}
                className={inputGreen}
                style={{ backgroundColor: "var(--tp-surface2)" }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maxresale">Max resale (% of original)</Label>
              <Input
                id="maxresale"
                type="number"
                min={100}
                max={1000}
                value={maxResale}
                onChange={(e) => setMaxResale(Number(e.target.value))}
                className={inputGreen}
                style={{ backgroundColor: "var(--tp-surface2)" }}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            className="border-neutral-700 text-neutral-100 bg-transparent"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={save} disabled={!canSave} className="bg-white text-black hover:bg-white/90">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
