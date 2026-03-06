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
  const [type, setType] = useState("FREE")
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

    // reset formulaire
    setMatch("")
    setCompetition("")
    setPrediction("")
    setCote("")
    setType("FREE")
    setDate("")
    setHeure("")
    setLoading(false)

    router.push("/admin/dashboard")
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-start md:items-center justify-center px-4 py-8">

      <div className="w-full max-w-xl bg-gradient-to-br from-gray-900 to-gray-800 
                      p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-700">

        <h1 className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-8 text-center">
          Ajouter Pronostic
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* MATCH */}
          <input
            type="text"
            placeholder="Match (ex: PSG vs Real Madrid)"
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700"
            value={match}
            onChange={(e) => setMatch(e.target.value)}
            required
          />

          {/* COMPETITION */}
          <select
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700"
            value={competition}
            onChange={(e) => setCompetition(e.target.value)}
            required
          >

            <option value="">Choisir compétition</option>

            {/* EUROPE */}
            <option>Ligue des Champions</option>
            <option>Europa League</option>
            <option>Europa Conference League</option>

            {/* TOP LIGUES */}
            <option>Premier League</option>
            <option>La Liga</option>
            <option>Serie A</option>
            <option>Bundesliga</option>
            <option>Ligue 1</option>

            {/* AUTRES EUROPE */}
            <option>Eredivisie</option>
            <option>Primeira Liga</option>
            <option>Super Lig</option>
            <option>Belgian Pro League</option>
            <option>Scottish Premiership</option>

            {/* AFRIQUE */}
            <option>CAN</option>
            <option>CAF Champions League</option>
            <option>CAF Confederation Cup</option>

            {/* MONDE */}
            <option>Coupe du Monde</option>
            <option>Coupe du Monde des Clubs</option>

            {/* AMERIQUE */}
            <option>Copa Libertadores</option>
            <option>Copa Sudamericana</option>
            <option>MLS</option>

          </select>

          {/* PREDICTION */}
          <input
            type="text"
            placeholder="Prédiction (ex: +2.5 buts)"
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700"
            value={prediction}
            onChange={(e) => setPrediction(e.target.value)}
            required
          />

          {/* COTE */}
          <input
            type="number"
            step="0.01"
            placeholder="Cote (ex: 1.85)"
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700"
            value={cote}
            onChange={(e) => setCote(e.target.value)}
            required
          />

          {/* TYPE PRONOSTIC */}
         <select
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required>

            <option value="GRATUIT">Gratuit</option>
            <option value="FREE">Free</option>
            <option value="VIP">VIP</option>
            <option value="VIP_PRO">VIP PRO</option>

          </select>

          {/* DATE + HEURE */}
          <div className="flex flex-col sm:flex-row gap-4">

            <input
              type="date"
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <input
              type="time"
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700"
              value={heure}
              onChange={(e) => setHeure(e.target.value)}
              required
            />

          </div>

          {/* BOUTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition"
          >
            {loading ? "Publication..." : "Publier"}
          </button>

        </form>
      </div>
    </div>
  )
}