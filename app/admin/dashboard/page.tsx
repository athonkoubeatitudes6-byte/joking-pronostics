"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

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

export default function Dashboard() {
  const [pronostics, setPronostics] = useState<Pronostic[]>([])

  useEffect(() => {
    loadPronostics()
  }, [])

  const loadPronostics = async () => {
    const { data } = await supabase
      .from("matches")
      .select("*")
      .order("date", { ascending: false })

    if (data) setPronostics(data)
  }

  const updateStatus = async (id: string, newStatus: string) => {
    await supabase
      .from("matches")
      .update({ status: newStatus })
      .eq("id", id)

    loadPronostics()
  }

  const deletePronostic = async (id: string) => {
    await supabase
      .from("matches")
      .delete()
      .eq("id", id)

    loadPronostics()
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 py-8">

      {/* HEADER RESPONSIVE */}
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-yellow-500">
          Dashboard Admin
        </h1>

        <Link
          href="/admin/pronostics/new"
          className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-bold hover:bg-yellow-400 transition text-center"
        >
          + Ajouter
        </Link>
      </div>

      {/* LISTE */}
      <div className="max-w-4xl mx-auto space-y-5">

        {pronostics.length === 0 && (
          <p className="text-gray-400 text-center">
            Aucun pronostic ajouté.
          </p>
        )}

        {pronostics.map((p) => (
          <div
            key={p.id}
            className="bg-gradient-to-r from-gray-900 to-gray-800 p-5 sm:p-6 rounded-xl border border-gray-700"
          >
            <h2 className="text-base sm:text-lg font-bold break-words">
              {p.match}
            </h2>

            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              {p.competition} • {p.date} • 🕒 {p.heure}
            </p>

            <p className="text-yellow-400 font-semibold mt-3 text-sm sm:text-base">
              🎯 {p.prediction}
            </p>

            <p className="text-sm mt-1">
              💰 Cote: {p.cote}
            </p>

            <span className="inline-block mt-3 px-3 py-1 text-xs sm:text-sm rounded-lg bg-gray-600">
              {p.status}
            </span>

            {/* BOUTONS RESPONSIVE */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4">

              {p.status === "En attente" && (
                <>
                  <button
                    onClick={() => updateStatus(p.id, "Gagné")}
                    className="bg-green-600 px-3 py-2 rounded-lg hover:bg-green-500 text-sm"
                  >
                    ✅ Gagné
                  </button>

                  <button
                    onClick={() => updateStatus(p.id, "Perdu")}
                    className="bg-red-600 px-3 py-2 rounded-lg hover:bg-red-500 text-sm"
                  >
                    ❌ Perdu
                  </button>
                </>
              )}

              <button
                onClick={() => deletePronostic(p.id)}
                className="bg-gray-700 px-3 py-2 rounded-lg hover:bg-gray-600 text-sm"
              >
                🗑 Supprimer
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}