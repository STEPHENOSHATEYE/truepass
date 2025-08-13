import Link from "next/link"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export default function Page() {
  return (
    <main className="relative">
      <SiteHeader />

      <section className="relative container mx-auto px-4 grid lg:grid-cols-[1.05fr_1fr] gap-10 py-12 md:py-20">
        {/* Left: Copy */}
        <div className="flex flex-col justify-center">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 w-max text-xs"
            style={{ backgroundColor: "rgba(255,255,255,0.25)", color: "var(--tp-accent)" }}
          >
            Built On Camp
          </div>
          <div className="font-semibold text-sm mb-2" style={{ color: "var(--tp-accent)" }}>
            TruePass
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05]" style={{ color: "var(--tp-text)" }}>
            {"your Tickets, your"}
            <br />
            {"Rules"}
          </h1>
          <p className="mt-5 max-w-xl text-base md:text-lg" style={{ color: "var(--tp-muted)" }}>
            Set up an event page, create immutable tickets, invite friends and retain fans. Host a memorable event today
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              asChild
              className="px-5"
              style={{ backgroundColor: "var(--tp-accent)", color: "var(--tp-accent-contrast)" }}
            >
              <Link href="/create">Create Your First Event</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="px-5"
              style={{ backgroundColor: "rgba(0,0,0,0.35)", color: "#fff" }}
            >
              <Link href="/explore">Explore events</Link>
            </Button>
          </div>
        </div>

        {/* Right: Media placeholder */}
        <div
          className="rounded-xl border w-full aspect-[4/3] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)]"
          style={{ backgroundColor: "rgba(229,231,235,0.85)", borderColor: "rgba(209,213,219,0.6)" }}
        />
      </section>

      <SiteFooter />
    </main>
  )
}
