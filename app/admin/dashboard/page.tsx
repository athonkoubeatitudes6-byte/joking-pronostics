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

  // ✅ METTRE GAGNÉ / PERDU
  const updateStatus = async (id: string, newStatus: string) => {
    await supabase
      .from("matches")
      .update({ status: newStatus })
      .eq("id", id)

    loadPronostics()
  }

  // ✅ SUPPRIMER
  const deletePronostic = async (id: string) => {
    await supabase
      .from("matches")
      .delete()
      .eq("id", id)

    loadPronostics()
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
            <h2 className="text-lg font-bold">{p.match}</h2>

            <p className="text-sm text-gray-400">
              {p.competition} • {p.date} • 🕒 {p.heure}
            </p>

            <p className="text-yellow-400 font-semibold mt-2">
              🎯 {p.prediction}
            </p>

            <p className="text-sm mt-1">
              💰 Cote: {p.cote}
            </p>

            <span className="inline-block mt-2 px-3 py-1 text-sm rounded-lg bg-gray-600">
              {p.status}
            </span>

            <div className="flex gap-2 mt-4">
              {p.status === "En attente" && (
                <>
                  <button
                    onClick={() => updateStatus(p.id, "Gagné")}
                    className="bg-green-600 px-3 py-2 rounded-lg hover:bg-green-500"
                  >
                    ✅ Gagné
                  </button>

                  <button
                    onClick={() => updateStatus(p.id, "Perdu")}
                    className="bg-red-600 px-3 py-2 rounded-lg hover:bg-red-500"
                  >
                    ❌ Perdu
                  </button>
                </>
              )}

              <button
                onClick={() => deletePronostic(p.id)}
                className="bg-gray-700 px-3 py-2 rounded-lg hover:bg-gray-600"
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