import InstallButton from "./components/InstallButton"
import BottomNav from "./components/BottomNav"
import "./globals.css"
import Navbar from "./navbar"
import type { Metadata, Viewport } from "next"

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
    <html
      lang="fr"
      suppressHydrationWarning
      className="bg-black"
    >
      <body className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white antialiased overflow-x-hidden">

        {/* Navbar Desktop */}
        <div className="hidden md:block">
          <Navbar />
        </div>

        {/* Main Content */}
        <main className="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-8">
          {children}
        </main>

        {/* Bottom Navigation Mobile */}
        <BottomNav />

        {/* PWA Install Button */}
        <InstallButton />

      </body>
    </html>
  )
}