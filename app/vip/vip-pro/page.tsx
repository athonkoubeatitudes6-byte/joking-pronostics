"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

interface Pronostic {
  id: number
  match: string
  competition: string
  prediction: string
  cote: string
  date: string
  heure: string
  status: string
}

export default function VIPProPage() {

  const [matchs, setMatchs] = useState<Pronostic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVIPPro()
  }, [])

  const fetchVIPPro = async () => {

    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .eq("type", "VIP_PRO")
      .eq("status", "En attente")
      .order("date", { ascending: true })

    if (!error && data) {
      setMatchs(data)
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-50 px-4 py-6 text-gray-900">

      <h1 className="text-3xl font-bold mb-6">
        💎 Pronostics VIP PRO
      </h1>

      {loading && (
        <p>Chargement...</p>
      )}

      {!loading && matchs.length === 0 && (
        <p>Aucun pronostic VIP PRO disponible.</p>
      )}

      <div className="space-y-4">

        {matchs.map((match) => (

          <div
            key={match.id}
            className="bg-white p-4 rounded-2xl shadow"
          >

            <div className="flex justify-between mb-2">
              <span className="text-sm font-bold">
                {match.competition}
              </span>

              <span className="text-sm text-gray-500">
                {match.date}
              </span>
            </div>

            <h2 className="font-bold text-lg">
              {match.match}
            </h2>

            <p className="text-gray-500 text-sm">
              🕒 {match.heure}
            </p>

            <div className="mt-3 p-3 bg-purple-50 rounded-lg">

              <p className="text-blue-600 font-semibold">
                🎯 {match.prediction}
              </p>

              <p className="text-green-600 font-bold">
                💰 Cote {match.cote}
              </p>

            </div>

          </div>

        ))}

      </div>

    </main>
  )
}