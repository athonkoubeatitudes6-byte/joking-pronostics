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

export default function Pronostics() {
  const [matchs, setMatchs] = useState<Pronostic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMatchs()
  }, [])

  const fetchMatchs = async () => {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .eq("type", "Gratuit")
      .eq("status", "En attente")
      .order("date", { ascending: true })

    if (!error && data) {
      setMatchs(data)
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10">
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

      <div className="space-y-8">
        {matchs.map((match) => (
          <div
            key={match.id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {match.competition}
            </span>

            <h2 className="text-2xl font-bold text-gray-900">
              {match.match}
            </h2>

            <p className="text-gray-500 mt-1">
              📅 {match.date} • 🕒 {match.heure}
            </p>

            <p className="text-blue-600 font-semibold mt-3">
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