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

export default function Historique() {
  const [matchs, setMatchs] = useState<Pronostic[]>([])

  useEffect(() => {
    loadHistorique()
  }, [])

  const loadHistorique = async () => {
    const { data } = await supabase
      .from("matches")
      .select("*")
      .in("status", ["Gagné", "Perdu"])
      .order("date", { ascending: false })

    if (data) setMatchs(data)
  }

  return (
    <main className="min-h-screen">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">
        📊 Historique des pronostics
      </h1>

      <div className="space-y-5">
        {matchs.length === 0 && (
          <p className="text-center text-gray-400">
            Aucun match terminé pour le moment.
          </p>
        )}

        {matchs.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl p-5 backdrop-blur-md shadow-lg border transition-all duration-300 hover:scale-[1.02] ${
              item.type === "VIP"
                ? "bg-yellow-500/10 border-yellow-400"
                : "bg-white/5 border-white/10"
            }`}
          >
            {/* Date */}
            <p className="text-xs text-gray-400 mb-2">
              {item.date} • 🕒 {item.heure}
            </p>

            {/* Match */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-lg md:text-xl font-bold">
                {item.match}
              </h2>

              {item.type === "VIP" && (
                <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                  👑 VIP
                </span>
              )}
            </div>

            {/* Competition */}
            <p className="text-sm text-gray-400 mt-1">
              {item.competition}
            </p>

            {/* Prediction */}
            <p className="mt-2 text-sm">
              🎯 {item.prediction}
            </p>

            {/* Bottom Section */}
            <div className="flex justify-between items-center mt-4">
              <p className="font-bold text-blue-400">
                Cote {item.cote}
              </p>

              <p
                className={`font-semibold ${
                  item.status === "Gagné"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {item.status === "Gagné"
                  ? "✅ Gagné"
                  : "❌ Perdu"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}