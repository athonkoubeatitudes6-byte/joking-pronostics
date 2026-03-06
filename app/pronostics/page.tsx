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

export default function Pronostics() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [matchs, setMatchs] = useState<Pronostic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/pronostics")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      fetchMatchs()
    }
  }, [user])

  const fetchMatchs = async () => {
     const { data, error } = await supabase
      .from("matches")
      .select("*")
      .in("type", ["FREE", "GRATUIT"])
      .eq("status", "En attente")
      .order("date", { ascending: true })
      
      
      
      


    if (!error && data) {
      setMatchs(data)
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
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 md:px-8">
      
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6">
        📅 Pronostics Gratuits ⚽
      </h1>

      {loading && (
        <p className="text-gray-500">Chargement...</p>
      )}

      {!loading && matchs.length === 0 && (
        <p className="text-gray-500">
          Aucun pronostic gratuit disponible.
        </p>
      )}

      <div className="space-y-5">
        {matchs.map((match) => (
          <div
            key={match.id}
            className="bg-white p-5 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 active:scale-[0.98]"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {match.competition}
              </span>

              <span className="text-xs text-gray-500">
                📅 {match.date}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
              {match.match}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              🕒 {match.heure}
            </p>

            <div className="mt-4 p-3 bg-gray-50 rounded-xl">
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