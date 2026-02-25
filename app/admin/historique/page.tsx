"use client"

import { useEffect, useState } from "react"

interface Pronostic {
  id: number
  match: string
  competition: string
  cote: string
  type: string
  date: string
  status: string
}

export default function Historique() {
  const [historique, setHistorique] = useState<Pronostic[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("pronostics") || "[]")
    const finished = stored.filter(
      (p: Pronostic) => p.status === "Gagné" || p.status === "Perdu"
    )
    setHistorique(finished)
  }, [])

  const gagnés = historique.filter((p) => p.status === "Gagné").length
  const perdus = historique.filter((p) => p.status === "Perdu").length
  const total = historique.length
  const taux = total > 0 ? ((gagnés / total) * 100).toFixed(1) : 0

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-yellow-500 mb-8">
        Historique des Pronostics
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
          <p className="text-gray-400">Total</p>
          <h2 className="text-2xl font-bold">{total}</h2>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
          <p className="text-green-400">Gagnés</p>
          <h2 className="text-2xl font-bold text-green-500">{gagnés}</h2>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
          <p className="text-red-400">Perdus</p>
          <h2 className="text-2xl font-bold text-red-500">{perdus}</h2>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
          <p className="text-blue-400">Taux de réussite</p>
          <h2 className="text-2xl font-bold text-blue-500">{taux}%</h2>
        </div>
      </div>

      {/* Liste */}
      <div className="space-y-4">
        {historique.length === 0 && (
          <p className="text-gray-400">Aucun pronostic terminé.</p>
        )}

        {historique.map((p) => (
          <div
            key={p.id}
            className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">{p.match}</h2>
                <p className="text-sm text-gray-400">
                  {p.competition} • {p.date}
                </p>
                <p className="text-sm">Cote: {p.cote}</p>
              </div>

              <span
                className={`px-4 py-2 rounded-lg font-bold ${
                  p.status === "Gagné"
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              >
                {p.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}