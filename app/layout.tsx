import "./globals.css"
import Navbar from "./navbar"

export const metadata = {
  title: "JOKING | Pronostics Football Premium",
  description: "Pronostics football gratuits et VIP avec statistiques et historique",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
        
        {/* Navbar principale */}
        <Navbar />

        {/* Contenu principal */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>

      </body>
    </html>
  )
}