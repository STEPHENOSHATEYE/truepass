import Link from "next/link"

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 mt-12">
      <div className="container mx-auto px-4 flex items-center justify-between py-6 text-sm">
        <div className="font-semibold" style={{ color: "var(--tp-text)" }}>
          TruePass
        </div>
        <nav className="flex items-center gap-6" style={{ color: "var(--tp-text)" }}>
          <Link className="hover:opacity-100 opacity-80" href="/explore">
            Discover
          </Link>
          <Link className="hover:opacity-100 opacity-80" href="/my-tickets">
            Tickets
          </Link>
          <Link className="hover:opacity-100 opacity-80" href="/help">
            Help
          </Link>
        </nav>
      </div>
    </footer>
  )
}
