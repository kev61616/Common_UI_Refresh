import React from 'react'

export default function SATLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {/* Common layout elements for all SAT pages can go here */}
      <main>{children}</main>
    </div>
  )
}
