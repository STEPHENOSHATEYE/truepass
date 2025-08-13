"use client"

import { useEffect, useState } from "react"

function tzOffsetString(date: Date) {
  // getTimezoneOffset returns minutes behind UTC, so invert the sign
  const minutes = -date.getTimezoneOffset()
  const sign = minutes >= 0 ? "+" : "-"
  const abs = Math.abs(minutes)
  const h = Math.floor(abs / 60)
  const m = abs % 60
  return `GMT ${sign}${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
}

export default function CurrentTime() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(i)
  }, [])
  return (
    <span className="text-xs md:text-sm text-neutral-300 tabular-nums">
      {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} {tzOffsetString(now)}
    </span>
  )
}
