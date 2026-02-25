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
    <main className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-12 flex items-center justify-center gap-3">
        📊 Historique des pronostics
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {matchs.length === 0 && (
          <p className="text-center text-gray-500">
            Aucun match terminé pour le moment.
          </p>
        )}

        {matchs.map((item) => (
          <div
            key={item.id}
            className={`p-6 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-center transition duration-300 hover:scale-[1.02] ${
              item.type === "VIP"
                ? "bg-yellow-50 border-2 border-yellow-400"
                : "bg-white"
            }`}
          >
            <div>
              <p className="text-sm text-gray-500">
                {item.date} • 🕒 {item.heure}
              </p>

              <div className="flex items-center gap-3">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-wide">
                  {item.match}
                </h2>

                {item.type === "VIP" && (
                  <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                    👑 VIP
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-500 mt-1">
                {item.competition}
              </p>

              <p className="text-gray-600 mt-1">
                🎯 {item.prediction}
              </p>
            </div>

            <div className="text-center mt-4 md:mt-0">
              <p className="font-bold text-blue-600">
                Cote {item.cote}
              </p>

              <p
                className={`font-semibold mt-1 ${
                  item.status === "Gagné"
                    ? "text-green-600"
                    : "text-red-600"
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