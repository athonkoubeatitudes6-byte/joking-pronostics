"use client"

import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { requestNotificationPermission } from "./lib/firebase"
import { useAuth } from "./context/AuthContext"
import { signOut } from "firebase/auth"
import { auth } from "./lib/firebase"

export default function Home() {

  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    requestNotificationPermission()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    window.location.reload()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white relative">

      {/* PHOTO GOOGLE */}
      {user && (
        <div className="absolute top-6 right-6" ref={dropdownRef}>
          <img
            src={user.photoURL || "/avatar.png"}
            alt="profile"
            onClick={() => setOpen(!open)}
            className="w-12 h-12 rounded-full border-2 border-yellow-400 cursor-pointer hover:scale-105 transition"
          />

          {open && (
            <div className="absolute right-0 mt-3 w-48 bg-gray-900 border border-white/10 rounded-xl shadow-xl backdrop-blur-md overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10 text-sm text-gray-300">
                {user.email}
              </div>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm hover:bg-red-500/20 hover:text-red-400 transition"
              >
                🚪 Déconnexion
              </button>
            </div>
          )}
        </div>
      )}

      {/* HERO */}
      <section className="text-center pt-20 pb-16 px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
          Les meilleurs pronostics <br className="hidden sm:block" />
          <span className="text-yellow-400">football ⚽</span>
        </h1>

        <p className="text-gray-400 max-w-md mx-auto mt-6 text-sm sm:text-base">
          Analyse experte. Discipline. Résultats.
          Rejoins la communauté JOKING dès aujourd’hui.
        </p>

        {/* BOUTON PRONOSTICS GRATUITS */}
        <div className="mt-6">
          <Link href="/pronostics">
            <button className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition">
              Voir les pronostics gratuits
            </button>
          </Link>
        </div>
      </section>

      {/* STATISTIQUES */}
      <section className="px-6 mb-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-md">
            <h3 className="text-3xl font-bold text-yellow-400">87%</h3>
            <p className="text-gray-400 mt-2 text-sm">Taux de réussite</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-md">
            <h3 className="text-3xl font-bold text-yellow-400">2 500+</h3>
            <p className="text-gray-400 mt-2 text-sm">Membres actifs</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-md">
            <h3 className="text-3xl font-bold text-yellow-400">10 000€+</h3>
            <p className="text-gray-400 mt-2 text-sm">Gains générés</p>
          </div>

        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="px-6 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10">
            Comment ça marche ?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <h3 className="font-semibold text-yellow-400 mb-2">1. Analyse des matchs</h3>
              <p className="text-gray-400 text-sm">
                Nos experts analysent les matchs à l’aide de statistiques avancées et d’une stratégie éprouvée.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <h3 className="font-semibold text-yellow-400 mb-2">2. Publication des pronostics</h3>
              <p className="text-gray-400 text-sm">
                Les pronostics sont publiés chaque jour, avec des explications claires et précises.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <h3 className="font-semibold text-yellow-400 mb-2">3. Gagner intelligemment</h3>
              <p className="text-gray-400 text-sm">
                Les membres appliquent les conseils avec discipline pour maximiser leurs chances de gains.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION VIP */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-yellow-500/10 to-yellow-400/10 border border-yellow-400 rounded-3xl p-8 text-center shadow-lg">

          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Passe au niveau supérieur 👑
          </h2>

          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Accède aux pronostics VIP exclusifs, analyses détaillées,
            grosses cotes et stratégies professionnelles.
          </p>

          <Link href="/vip">
            <button className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition">
              🔓 Devenir Membre VIP
            </button>
          </Link>

          {/* TEXTE RASSURANCE */}
          <p className="text-xs text-gray-400 mt-6">
            Accès immédiat après inscription • Support disponible • Mises mises à jour chaque jour
          </p>

        </div>
      </section>

      {/* PREUVE SOCIALE */}
      <section className="px-6 mb-16 text-center">
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          Plus de 2 500 membres actifs font confiance à JOKING chaque jour pour leurs pronostics football.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="bg-black/40 border-t border-white/10 text-gray-400 py-10 px-6 text-center relative">

        {/* AVERTISSEMENT LÉGAL */}
        <p className="text-xs text-red-400 mb-6">
          Les paris sportifs comportent des risques. JOKING ne garantit aucun gain. Jouez de manière responsable.
        </p>

        <h4 className="text-white text-xl font-semibold mb-3">
          JOKING
        </h4>

        <p className="mb-4 text-sm">
          Plateforme de pronostics football fiables et professionnels.
        </p>

        {/* CONDITIONS & CONFIDENTIALITÉ */}
        <div className="text-xs space-y-2 mb-4">
          <p>
            En utilisant cette plateforme, vous acceptez nos conditions d’utilisation. Les pronostics sont fournis à titre informatif et ne constituent pas une incitation au jeu.
          </p>
          <p>
            JOKING respecte la confidentialité de vos données personnelles. Aucune information n’est partagée avec des tiers sans votre consentement.
          </p>
        </div>

        <p className="text-xs">
          © {new Date().getFullYear()} JOKING – Plateforme de pronostics football. Tous droits réservés.
        </p>

        <Link href="/admin">
          <div className="absolute bottom-4 right-4 w-3 h-3 bg-gray-600 rounded-full hover:bg-yellow-400 transition cursor-pointer"></div>
        </Link>

      </footer>

    </main>
  )
}