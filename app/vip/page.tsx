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

  const [matchs, setMatchs] = useState<Pronostic[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedType, setSelectedType] = useState("FREE")

  useEffect(() => {
    fetchMatchs()
  }, [selectedType])

  const fetchMatchs = async () => {

    setLoading(true)

    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .eq("type", selectedType)
      .eq("status", "En attente")
      .order("date", { ascending: true })

    if (!error && data) {
      setMatchs(data)
    }

    setLoading(false)
  }

  return (

    <main className="min-h-screen bg-yellow-50 px-4 py-6">

      <h1 className="text-3xl font-bold mb-6">
        👑 Pronostics VIP
      </h1>


      {/* BOUTONS */}

      <div className="flex gap-3 mb-6">

        <button
          onClick={() => setSelectedType("FREE")}
          className={`px-4 py-2 rounded-lg font-bold ${
            selectedType === "FREE"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          FREE
        </button>

        <button
          onClick={() => setSelectedType("VIP")}
          className={`px-4 py-2 rounded-lg font-bold ${
            selectedType === "VIP"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200"
          }`}
        >
          VIP
        </button>

        <button
          onClick={() => setSelectedType("VIP PRO")}
          className={`px-4 py-2 rounded-lg font-bold ${
            selectedType === "VIP PRO"
              ? "bg-black text-white"
              : "bg-gray-200"
          }`}
        >
          VIP PRO
        </button>

      </div>


      {/* MATCHS */}

      {loading && (
        <p>Chargement...</p>
      )}

      {!loading && matchs.length === 0 && (
        <p>Aucun pronostic disponible.</p>
      )}

      <div className="space-y-4">

        {matchs.map((match) => (

          <div
            key={match.id}
            className="bg-white p-4 rounded-xl shadow"
          >

            <p className="text-sm text-gray-500">
              {match.competition}
            </p>

            <h2 className="font-bold text-lg">
              {match.match}
            </h2>

            <p className="text-gray-500 text-sm">
              {match.date} - {match.heure}
            </p>

            <div className="mt-3">

              <p className="text-blue-600 font-bold">
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