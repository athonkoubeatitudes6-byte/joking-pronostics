"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface Pronostic {
  id: number
  match: string
  competition: string
  prediction: string
  cote: string
  type: string
  date: string
  heure: string
  status: string
}

export default function Dashboard() {
  const [pronostics, setPronostics] = useState<Pronostic[]>([])

  useEffect(() => {
    loadPronostics()
  }, [])

  const loadPronostics = () => {
    const stored: Pronostic[] = JSON.parse(
      localStorage.getItem("pronostics") || "[]"
    )

    const sorted = stored.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.heure}`)
      const dateB = new Date(`${b.date}T${b.heure}`)
      return dateB.getTime() - dateA.getTime()
    })

    setPronostics(sorted)
  }

  // ✅ ENVOIE VERS HISTORIQUE
  const updateStatus = (id: number, newStatus: string) => {
    const stored: Pronostic[] = JSON.parse(
      localStorage.getItem("pronostics") || "[]"
    )

    const historique: Pronostic[] = JSON.parse(
      localStorage.getItem("historique") || "[]"
    )

    const match = stored.find((p) => p.id === id)

    if (!match) return

    const updatedMatch: Pronostic = {
      ...match,
      status: newStatus,
    }

    // Ajouter dans historique
    localStorage.setItem(
      "historique",
      JSON.stringify([...historique, updatedMatch])
    )

    // Supprimer des pronostics actifs
    const updatedPronostics = stored.filter((p) => p.id !== id)

    localStorage.setItem(
      "pronostics",
      JSON.stringify(updatedPronostics)
    )

    setPronostics(updatedPronostics)
  }

  const deletePronostic = (id: number) => {
    const filtered = pronostics.filter((p) => p.id !== id)
    localStorage.setItem("pronostics", JSON.stringify(filtered))
    setPronostics(filtered)
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-yellow-500">
          Dashboard Admin
        </h1>

        <Link
          href="/admin/pronostics/new"
          className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition"
        >
          + Ajouter
        </Link>
      </div>

      <div className="space-y-5">
        {pronostics.length === 0 && (
          <p className="text-gray-400">Aucun pronostic ajouté.</p>
        )}

        {pronostics.map((p) => (
          <div
            key={p.id}
            className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              
              <div>
                <h2 className="text-lg font-bold">{p.match}</h2>

                <p className="text-sm text-gray-400">
                  {p.competition} • {p.date} • 🕒 {p.heure}
                </p>

                <p className="text-yellow-400 font-semibold mt-2">
                  🎯 {p.prediction || "Non définie"}
                </p>

                <p className="text-sm mt-1">
                  💰 Cote: {p.cote}
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 text-sm rounded-lg ${
                    p.status === "Gagné"
                      ? "bg-green-600"
                      : p.status === "Perdu"
                      ? "bg-red-600"
                      : "bg-gray-600"
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <div className="flex gap-2 flex-wrap">
                {p.status === "En attente" && (
                  <>
                    <button
                      onClick={() => updateStatus(p.id, "Gagné")}
                      className="bg-green-600 px-3 py-2 rounded-lg hover:bg-green-500 transition"
                    >
                      ✅ Gagné
                    </button>

                    <button
                      onClick={() => updateStatus(p.id, "Perdu")}
                      className="bg-red-600 px-3 py-2 rounded-lg hover:bg-red-500 transition"
                    >
                      ❌ Perdu
                    </button>
                  </>
                )}

                <button
                  onClick={() => deletePronostic(p.id)}
                  className="bg-gray-700 px-3 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                  🗑 Supprimer
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}