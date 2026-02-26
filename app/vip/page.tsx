"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/navigation"

interface Pronostic {
  id: string
  match: string
  competition: string
  prediction: string
  cote: string
  type: string
  date: string
  heure: string
  status: string
}

export default function VIP() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [matchsVIP, setMatchsVIP] = useState<Pronostic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/vip")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      fetchVIP()
    }
  }, [user])

  const fetchVIP = async () => {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .eq("type", "VIP")
      .eq("status", "En attente")
      .order("date", { ascending: true })

    if (!error && data) {
      setMatchsVIP(data)
    }

    setLoading(false)
  }

  // Pendant vérification auth
  if (authLoading || (!user && !authLoading)) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Chargement...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-50 px-4 py-6 sm:px-6 md:px-8 text-gray-900">
      
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-6">
        👑 Pronostics VIP 💎
      </h1>

      {loading && (
        <p className="text-gray-600">Chargement...</p>
      )}

      {!loading && matchsVIP.length === 0 && (
        <p className="text-gray-600">
          Aucun pronostic VIP disponible.
        </p>
      )}

      <div className="space-y-5">
        {matchsVIP.map((match) => (
          <div
            key={match.id}
            className="bg-white p-5 rounded-3xl shadow-md border-2 border-yellow-400 transition-all duration-300 active:scale-[0.98]"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="bg-black text-yellow-400 text-xs font-bold px-3 py-1 rounded-full">
                {match.competition}
              </span>

              <span className="text-xs text-gray-600">
                📅 {match.date}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold leading-snug">
              {match.match}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              🕒 {match.heure}
            </p>

            <div className="mt-4 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
              <p className="text-blue-600 font-semibold text-sm">
                🎯 {match.prediction}
              </p>

              <p className="text-green-600 font-bold mt-1 text-sm">
                💰 Cote {match.cote}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}