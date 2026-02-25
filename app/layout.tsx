import InstallButton from "./components/InstallButton"
import "./globals.css"
import Navbar from "./navbar"
import type { Metadata, Viewport } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "JOKING | Pronostics Football Premium",
  description:
    "Pronostics football gratuits et VIP avec statistiques et historique",
  applicationName: "JOKING",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "JOKING",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white antialiased overflow-x-hidden">
        
        {/* Navbar Desktop uniquement */}
        <div className="hidden md:block">
          <Navbar />
        </div>

        {/* Contenu principal */}
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 md:pb-8">
          {children}
        </main>

        {/* Bottom Navigation Mobile */}
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-950 border-t border-gray-800 shadow-lg">
          <div className="flex justify-around items-center py-3 text-xs">
            
            <Link
              href="/"
              className="flex flex-col items-center text-gray-400 hover:text-white transition"
            >
              <span className="text-lg">🏠</span>
              Accueil
            </Link>

            <Link
              href="/pronostics"
              className="flex flex-col items-center text-gray-400 hover:text-white transition"
            >
              <span className="text-lg">⚽</span>
              Gratuit
            </Link>

            <Link
              href="/vip"
              className="flex flex-col items-center text-gray-400 hover:text-white transition"
            >
              <span className="text-lg">👑</span>
              VIP
            </Link>

            <Link
              href="/historique"
              className="flex flex-col items-center text-gray-400 hover:text-white transition"
            >
              <span className="text-lg">📊</span>
              Historique
            </Link>

          </div>
        </div>
        <InstallButton />
      </body>
    </html>
  )
}