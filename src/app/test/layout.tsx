import React from 'react'

export default function TestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {/* Common layout elements for all Test pages can go here */}
      <main>{children}</main>
    </div>
  )
}
