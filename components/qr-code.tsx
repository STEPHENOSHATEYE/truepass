"use client"

import { QRCodeSVG } from "qrcode.react"

export default function TicketQRCode({ payload, size = 160 }: { payload: string; size?: number }) {
  return (
    <div className="inline-block rounded-md bg-white p-2">
      <QRCodeSVG value={payload} size={size} level="M" includeMargin />
    </div>
  )
}
