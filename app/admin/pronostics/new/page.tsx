"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function NewPronostic() {
  const router = useRouter()

  const [match, setMatch] = useState("")
  const [competition, setCompetition] = useState("")
  const [prediction, setPrediction] = useState("")
  const [cote, setCote] = useState("")
  const [type, setType] = useState("Gratuit")
  const [date, setDate] = useState("")
  const [heure, setHeure] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!competition || !prediction || !heure) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }

    setLoading(true)

    const { error } = await supabase.from("matches").insert([
      {
        match,
        competition,
        prediction,
        cote,
        type,
        date,
        heure,
        status: "En attente",
      },
    ])

    if (error) {
      alert("Erreur lors de l'ajout du match")
      setLoading(false)
      return
    }

    try {
      await fetch("/api/send-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ match, competition, prediction, type }),
      })
    } catch (err) {
      console.error(err)
    }

    setMatch("")
    setCompetition("")
    setPrediction("")
    setCote("")
    setType("Gratuit")
    setDate("")
    setHeure("")
    setLoading(false)

    router.push("/admin/dashboard")
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-start md:items-center justify-center px-4 py-8">
      
      <div className="w-full max-w-xl bg-gradient-to-br from-gray-900 to-gray-800 
                      p-5 sm:p-8 
                      rounded-xl sm:rounded-2xl 
                      shadow-2xl 
                      border border-gray-700">

        {/* Titre responsive */}
        <h1 className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-6 sm:mb-8 text-center">
          Ajouter Pronostic
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

          <input
            type="text"
            placeholder="Match (ex: PSG vs Real Madrid)"
            className="w-full p-3 sm:p-4 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-500 transition"
            value={match}
            onChange={(e) => setMatch(e.target.value)}
            required
          />

          <select
            className="w-full p-3 sm:p-4 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-500 transition"
            value={competition}
            onChange={(e) => setCompetition(e.target.value)}
            required
          >
            <option value="">Choisir compétition</option>
            <option>Ligue des Champions</option>
            <option>Premier League</option>
            <option>La Liga</option>
            <option>Serie A</option>
            <option>Bundesliga</option>
            <option>Ligue 1</option>
            <option>Coupe du Monde</option>
            <option>CAN</option>
          </select>

          <input
            type="text"
            placeholder="Prédiction"
            className="w-full p-3 sm:p-4 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-500 transition"
            value={prediction}
            onChange={(e) => setPrediction(e.target.value)}
            required
          />

          <input
            type="number"
            step="0.01"
            placeholder="Cote (ex: 1.85)"
            className="w-full p-3 sm:p-4 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-500 transition"
            value={cote}
            onChange={(e) => setCote(e.target.value)}
            required
          />

          <select
            className="w-full p-3 sm:p-4 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-500 transition"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Gratuit</option>
            <option>VIP</option>
          </select>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="date"
              className="w-full p-3 sm:p-4 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-500 transition"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <input
              type="time"
              className="w-full p-3 sm:p-4 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-500 transition"
              value={heure}
              onChange={(e) => setHeure(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 sm:p-4 text-sm sm:text-base bg-yellow-500 text-black font-bold rounded-lg sm:rounded-xl hover:bg-yellow-400 transition transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Publication..." : "Publier"}
          </button>

        </form>
      </div>
    </div>
  )
}