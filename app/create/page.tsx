import SiteHeader from "@/components/site-header"
import CreateEventBuilder from "@/components/create-event-builder"
import SiteFooter from "@/components/site-footer"

export default function CreatePage() {
  return (
    <main>
      <SiteHeader />
      {/* builder already uses container; ensure horizontal padding too */}
      <CreateEventBuilder />
      <SiteFooter />
    </main>
  )
}
