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

  const [matchs, setMatchs] = useState<Pronostic[]>([])
  const [loading, setLoading] = useState(true)

  const [filter, setFilter] = useState("FREE")

  useEffect(() => {
    fetchMatchs()
  }, [filter])

  const fetchMatchs = async () => {

    setLoading(true)

    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .eq("type", filter)
      .eq("status", "En attente")
      .order("date", { ascending: true })

    if (!error && data) {
      setMatchs(data)
    }

    setLoading(false)
  }

  return (

    <main className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-50 px-4 py-6 text-gray-900">

      <h1 className="text-2xl font-extrabold mb-6">
        👑 Pronostics VIP
      </h1>

      {/* BOUTONS */}

      <div className="flex gap-3 mb-6">

        <button
          onClick={() => setFilter("FREE")}
          className={`px-4 py-2 rounded-full font-bold ${
            filter === "FREE"
              ? "bg-black text-yellow-400"
              : "bg-white border"
          }`}
        >
          FREE
        </button>

        <button
          onClick={() => setFilter("VIP")}
          className={`px-4 py-2 rounded-full font-bold ${
            filter === "VIP"
              ? "bg-black text-yellow-400"
              : "bg-white border"
          }`}
        >
          VIP
        </button>

        <button
          onClick={() => setFilter("VIP_PRO")}
          className={`px-4 py-2 rounded-full font-bold ${
            filter === "VIP_PRO"
              ? "bg-black text-yellow-400"
              : "bg-white border"
          }`}
        >
          VIP PRO
        </button>

      </div>

      {loading && <p>Chargement...</p>}

      {!loading && matchs.length === 0 && (
        <p>Aucun pronostic disponible.</p>
      )}

      <div className="space-y-5">

        {matchs.map((match) => (

          <div
            key={match.id}
            className="bg-white p-5 rounded-2xl shadow border border-yellow-300"
          >

            <div className="flex justify-between mb-2">

              <span className="text-xs bg-black text-yellow-400 px-2 py-1 rounded">
                {match.competition}
              </span>

              <span className="text-xs">
                {match.date}
              </span>

            </div>

            <h2 className="font-bold text-lg">
              {match.match}
            </h2>

            <p className="text-sm text-gray-500">
              🕒 {match.heure}
            </p>

            <div className="mt-3 bg-yellow-50 p-3 rounded">

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