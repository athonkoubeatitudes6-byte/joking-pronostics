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
  const { user, loading: authLoading, plan } = useAuth()
  const router = useRouter()

  const [matchs, setMatchs] = useState<Pronostic[]>([])
  const [loading, setLoading] = useState(true)

  // 🔐 Redirection si non connecté
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/vip")
    }
  }, [user, authLoading, router])

  // 📥 Charger tous les types
  useEffect(() => {
    if (user) {
      fetchMatchs()
    }
  }, [user])

  const fetchMatchs = async () => {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .in("type", ["FREE", "VIP", "VIP_PRO"])
      .eq("status", "En attente")
      .order("date", { ascending: true })

    if (!error && data) {
      setMatchs(data)
    }

    setLoading(false)
  }

  // ⏳ Chargement auth
  if (authLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Chargement...</p>
      </main>
    )
  }

  // 🔒 Filtrer selon plan
  const matchsVisibles = matchs.filter((match, index) => {
    if (plan === "free") {
      if (match.type === "FREE") return true
      if (match.type === "VIP" && index < 2) return true
      return false
    }

    if (plan === "vip") {
      return match.type !== "VIP_PRO"
    }

    return true
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-50 px-4 py-6 sm:px-6 md:px-8 text-gray-900">
      
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-6">
        👑 Pronostics VIP 💎
      </h1>

      {loading && (
        <p className="text-gray-600">Chargement...</p>
      )}

      {!loading && matchsVisibles.length === 0 && (
        <p className="text-gray-600">
          Aucun pronostic disponible.
        </p>
      )}

      <div className="space-y-5">
        {matchsVisibles.map((match) => (
          <div
            key={match.id}
            className="bg-white p-5 rounded-3xl shadow-md border-2 border-yellow-400 transition-all duration-300 active:scale-[0.98]"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="bg-black text-yellow-400 text-xs font-bold px-3 py-1 rounded-full">
                {match.competition}
              </span>

              <span className="text-xs text-gray-600">
                📅 {match.date}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold leading-snug">
              {match.match}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              🕒 {match.heure}
            </p>

            <div className="mt-4 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
              <p className="text-blue-600 font-semibold text-sm">
                🎯 {match.prediction}
              </p>

              <p className="text-green-600 font-bold mt-1 text-sm">
                💰 Cote {match.cote}
              </p>
            </div>

            {/* 🔒 Bloc VIP si FREE */}
            {plan === "free" && match.type === "VIP" && (
              <p className="text-red-500 text-sm mt-3 font-semibold">
                🔒 Passe VIP pour voir plus de pronostics
              </p>
            )}

            {match.type === "VIP_PRO" && (
              <p className="text-purple-600 text-sm mt-3 font-semibold">
                👑 Pronostic VIP PRO
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}