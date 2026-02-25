"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
            JOKING
          </h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/pronostics">Pronostics</Link>
          <Link href="/vip">VIP</Link>

          {!user ? (
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Connexion
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {user.email}
              </span>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Déconnexion
              </button>
            </div>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-blue-600"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 space-y-4 bg-white border-t">
          <Link
            href="/pronostics"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            Pronostics
          </Link>

          <Link
            href="/vip"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            VIP
          </Link>

          {!user ? (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 bg-blue-600 text-white rounded-lg text-center"
            >
              Connexion
            </Link>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                {user.email}
              </p>

              <button
                onClick={() => {
                  handleLogout()
                  setMenuOpen(false)
                }}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  )
}