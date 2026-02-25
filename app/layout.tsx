import "./globals.css"
import Navbar from "./navbar"
import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "JOKING | Pronostics Football Premium",
  description:
    "Pronostics football gratuits et VIP avec statistiques et historique",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white antialiased overflow-x-hidden">
        
        {/* Navbar principale */}
        <Navbar />

        {/* Contenu principal */}
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </main>

      </body>
    </html>
  )
}