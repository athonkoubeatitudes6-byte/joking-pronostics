"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function FreePage() {
  const [matchs, setMatchs] = useState<any[]>([])

  useEffect(() => {
    loadMatchs()
  }, [])

  const loadMatchs = async () => {
    const { data } = await supabase
      .from("matches")
      .select("*")
      .eq("type", "FREE")
      .order("date", { ascending: true })

    if (data) setMatchs(data)
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Pronostics FREE</h1>

      {matchs.map((m) => (
        <div key={m.id} className="bg-gray-900 p-4 rounded-xl mb-4">
          <h2 className="font-bold">{m.match}</h2>
          <p>{m.competition}</p>
          <p>🎯 {m.prediction}</p>
          <p>💰 {m.cote}</p>
          <p>{m.date} • {m.heure}</p>
        </div>
      ))}
    </div>
  )
}