import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Expense Manager",
  description: "Track and manage your expenses easily",
  viewport: "width=device-width, initial-scale=1.0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
