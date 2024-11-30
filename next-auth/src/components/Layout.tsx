import React from "react"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">

      <main className="flex-1">
        <div className="mx-auto w-full max-w-[80%] py-8">
          {children}
        </div>
      </main>
    </div>
  )
}

