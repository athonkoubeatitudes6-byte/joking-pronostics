"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useAuth } from "../context/AuthContext"
import { logout } from "../lib/firebase"

type MatchType = {
  id: string
  match: string
  competition: string
  prediction: string
  cote: string
  date: string
  heure: string
  type: "GRATUIT" | "FREE" | "VIP" | "VIP_PRO"
  status: "En attente" | "Gagné" | "Perdu"
}

export default function Admin() {

  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  const ADMIN_EMAIL = "beatitudeathonkou7@gmail.com"

  const [matchs, setMatchs] = useState<MatchType[]>([])
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  const competitions = [
    "Ligue des Champions",
    "Premier League",
    "Liga",
    "Serie A",
    "Bundesliga",
    "Ligue 1",
    "CAN",
    "Coupe du Monde",
    "Europa League",
  ]

  const [form, setForm] = useState({
    match: "",
    competition: "",
    prediction: "",
    cote: "",
    date: "",
    heure: "",
    type: "GRATUIT" as "GRATUIT" | "FREE" | "VIP" | "VIP_PRO",
  })

  // 🔐 Vérification admin
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/login?redirect=/admin")
      } else if (user.email !== ADMIN_EMAIL) {
        router.push("/")
      } else {
        setIsCheckingAuth(false)
      }
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (!isCheckingAuth) {
      fetchMatchs()
    }
  }, [isCheckingAuth])

  const fetchMatchs = async () => {

    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setMatchs(data)
    }

  }

  const handleChange = (e: any) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })

  }

  const handleSubmit = async (e: any) => {

    e.preventDefault()

    const { error } = await supabase
      .from("matches")
      .insert([
        {
          match: form.match,
          competition: form.competition,
          prediction: form.prediction,
          cote: form.cote,
          date: form.date,
          heure: form.heure,
          type: form.type,
          status: "En attente",
        },
      ])

    if (!error) {

      fetchMatchs()

      setForm({
        match: "",
        competition: "",
        prediction: "",
        cote: "",
        date: "",
        heure: "",
        type: "GRATUIT",
      })

    } else {
      alert("Erreur lors de l'ajout")
    }

  }

  const setResult = async (id: string, result: "Gagné" | "Perdu") => {

    await supabase
      .from("matches")
      .update({ status: result })
      .eq("id", id)

    fetchMatchs()

  }

  const supprimerMatch = async (id: string) => {

    await supabase
      .from("matches")
      .delete()
      .eq("id", id)

    fetchMatchs()

  }

  const handleLogout = async () => {

    await logout()
    router.push("/")

  }

  if (authLoading || isCheckingAuth) return null

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold">
          👑 Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded-lg font-semibold"
        >
          Logout
        </button>

      </div>

      {/* FORMULAIRE */}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-xl space-y-4 max-w-2xl"
      >

        <select
          name="competition"
          value={form.competition}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800"
          required
        >
          <option value="">Choisir une compétition</option>

          {competitions.map((comp) => (

            <option key={comp} value={comp}>
              {comp}
            </option>

          ))}

        </select>

        <input
          name="match"
          placeholder="Match"
          value={form.match}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800"
          required
        />

        <input
          name="heure"
          placeholder="Heure"
          value={form.heure}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800"
          required
        />

        <input
          name="prediction"
          placeholder="Pronostic"
          value={form.prediction}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800"
          required
        />

        <input
          name="cote"
          placeholder="Cote"
          value={form.cote}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800"
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800"
          required
        />

        {/* TYPE PRONOSTIC */}

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800"
        >

          <option value="GRATUIT">Gratuit</option>
          <option value="FREE">Free</option>
          <option value="VIP">VIP</option>
          <option value="VIP_PRO">VIP PRO</option>

        </select>

        <button className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold">
          ➕ Ajouter Match
        </button>

      </form>

      {/* MATCHS */}

      <div className="mt-10 space-y-6">

        {matchs.map((match) => (

          <div key={match.id} className="bg-gray-900 p-6 rounded-xl">

            <h2 className="text-xl font-bold">
              {match.match}
            </h2>

            <p>{match.competition}</p>

            <p>
              🕒 {match.date} • {match.heure}
            </p>

            <p>🎯 {match.prediction}</p>

            <p>💰 {match.cote}</p>

            <p className="mt-2 font-bold">
              {match.type}
            </p>

            <p className="font-bold">
              {match.status}
            </p>

            <div className="flex gap-3 mt-4">

              <button
                onClick={() => setResult(match.id, "Gagné")}
                className="bg-green-600 px-3 py-2 rounded"
              >
                Gagné
              </button>

              <button
                onClick={() => setResult(match.id, "Perdu")}
                className="bg-red-600 px-3 py-2 rounded"
              >
                Perdu
              </button>

              <button
                onClick={() => supprimerMatch(match.id)}
                className="bg-gray-700 px-3 py-2 rounded"
              >
                Supprimer
              </button>

            </div>

          </div>

        ))}

      </div>

    </main>

  )

}