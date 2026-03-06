"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function FreePage() {

  const [matchs, setMatchs] = useState<any[]>([])

  useEffect(() => {
    fetchMatchs()
  }, [])

  const fetchMatchs = async () => {

    const { data } = await supabase
      .from("matches")
      .select("*")
      .eq("type", "FREE")
      .eq("status", "En attente")

    if (data) setMatchs(data)
  }

  return (
    <main className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        🎁 Pronostics FREE
      </h1>

      {matchs.map((match) => (
        <div key={match.id} className="bg-white p-4 rounded-xl shadow mb-4">
          <h2 className="font-bold">{match.match}</h2>
          <p>{match.prediction}</p>
          <p className="text-green-600">Cote {match.cote}</p>
        </div>
      ))}

    </main>
  )
}