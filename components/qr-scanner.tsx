"use client"

import { useEffect, useRef } from "react"
import { BrowserMultiFormatReader } from "@zxing/browser"

type Props = {
  onResult: (text: string) => void
}

export default function QrScanner({ onResult }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader()
    let stopped = false

    async function start() {
      if (!videoRef.current) return
      try {
        const controls = await codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
          if (result && !stopped) {
            onResult(result.getText())
          }
        })
        return () => {
          stopped = true
          controls?.stop()
          codeReader.reset()
        }
      } catch (e) {
        // ignore
      }
    }
    const cleanup = start()
    return () => {
      stopped = true
      if (typeof cleanup === "function") cleanup()
      codeReader.reset()
    }
  }, [onResult])

  return (
    <div className="grid gap-2">
      <video ref={videoRef} className="w-full rounded-md border" />
      <p className="text-xs text-muted-foreground">If camera fails, paste QR content manually below.</p>
    </div>
  )
}
