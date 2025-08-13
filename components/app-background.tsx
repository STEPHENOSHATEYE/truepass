"use client"

export default function AppBackground() {
  // Global background for all pages, keeps navbar readable and consistent.
  return (
    <>
      <div
        className="fixed inset-0 -z-50"
        style={{
          background: "linear-gradient(to bottom right, var(--tp-bg-start), var(--tp-bg-end))",
        }}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 -z-40"
        style={{
          background: "radial-gradient(1200px 600px at 10% 10%, var(--tp-accent-20), transparent 60%)",
        }}
        aria-hidden="true"
      />
    </>
  )
}
