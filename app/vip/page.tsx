"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

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
  const [matchsVIP, setMatchsVIP] = useState<Pronostic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVIP()
  }, [])

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

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-50 p-10 text-gray-900">
      <h1 className="text-4xl font-extrabold mb-10">
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

      <div className="space-y-8">
        {matchsVIP.map((match) => (
          <div
            key={match.id}
            className="bg-white p-6 rounded-2xl shadow-lg border-2 border-yellow-400"
          >
            <span className="inline-block bg-black text-yellow-400 text-xs font-bold px-3 py-1 rounded-full mb-3">
              {match.competition}
            </span>

            <h2 className="text-2xl font-bold">
              {match.match}
            </h2>

            <p className="text-gray-500 mt-1">
              📅 {match.date} • 🕒 {match.heure}
            </p>

            <p className="text-blue-600 font-semibold mt-4">
              🎯 {match.prediction}
            </p>

             <p className="text-green-600 font-bold mt-2">
              💰 Cote {match.cote}
             </p>
          </div>
        ))}
      </div>
    </main>
  )
}