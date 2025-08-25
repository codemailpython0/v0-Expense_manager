import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <div className="min-h-screen flex flex-col relative">
          <main className="flex-1">{children}</main>
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10">
            <p className="text-sm text-white">© made by KKB</p>
          </div>
        </div>
      </body>
    </html>
  )
}
