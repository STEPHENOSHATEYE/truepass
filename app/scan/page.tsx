"use client"

import SiteHeader from "@/components/site-header"
import QrScanner from "@/components/qr-scanner"
import { useAppStore } from "@/store/use-app-store"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import SiteFooter from "@/components/site-footer"

export default function ScanPage() {
  const { scanTicket, events } = useAppStore()
  const [result, setResult] = useState<string>("")
  const [status, setStatus] = useState<string>("")

  function handleScan(text: string) {
    setResult(text)
    const res = scanTicket(text)
    if (res.ok) {
      const ev = events.find((e) => e.id === res.token!.eventId)
      setStatus(`Success: ${ev?.name ?? "Event"} • token ${res.token?.id} checked-in`)
    } else {
      setStatus(`Error: ${res.error}`)
    }
  }

  return (
    <main>
      <SiteHeader />
      <div className="container mx-auto px-4 py-8 grid lg:grid-cols-2 gap-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-4">Scan Tickets</h1>
          <QrScanner onResult={handleScan} />
        </div>
        <div className="grid gap-3">
          <h2 className="font-semibold text-white">Manual input</h2>
          <Textarea placeholder="Paste QR content here" value={result} onChange={(e) => setResult(e.target.value)} />
          <Button onClick={() => handleScan(result)}>Validate</Button>
          <p className="text-sm text-muted-foreground">{status}</p>
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}
