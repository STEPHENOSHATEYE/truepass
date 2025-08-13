export default function DesignNotes() {
  return (
    <div className="container py-10 prose dark:prose-invert">
      <h1>TruePass MVP Frontend</h1>
      <p>
        This project implements the core UX shown in the provided design shots using shadcn/ui and Next.js App Router.
      </p>
      <ul>
        <li>Wallet/social onboarding (stubbed) via header button</li>
        <li>Event creation with media, theme, and ticket tiers</li>
        <li>Buying, QR generation, resale caps, secondary market</li>
        <li>Scanning page (camera + manual)</li>
        <li>Revive tickets into art (demo preview)</li>
      </ul>
      <p>Replace the stubbed actions with Origin SDK calls on Camp Network for production.</p>
    </div>
  )
}
