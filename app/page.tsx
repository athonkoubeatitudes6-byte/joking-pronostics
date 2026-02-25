import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 relative">

      {/* HERO */}
      <section className="text-center py-20 px-6">
        <h2 className="text-4xl font-bold mb-4">
          Les meilleurs pronostics football ⚽
        </h2>

        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          Accède à des pronostics fiables, gratuits et VIP.
          Rejoins la communauté JOKING dès aujourd'hui.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/pronostics">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Pronostics gratuits
            </button>
          </Link>

          <Link href="/vip">
            <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
              Devenir VIP
            </button>
          </Link>

          <Link href="/historique">
            <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
              Historique
            </button>
          </Link>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 px-6 bg-white">
        <h3 className="text-3xl font-bold text-center mb-12">
          Nos Catégories
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition bg-gray-50">
            <h4 className="text-xl font-semibold mb-2">🔓 Gratuits</h4>
            <p className="text-gray-600">
              Accède aux pronostics gratuits chaque jour.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition bg-blue-600 text-white">
            <h4 className="text-xl font-semibold mb-2">👑 VIP</h4>
            <p>
              Pronostics premium avec fortes cotes et analyses détaillées.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition bg-gray-50">
            <h4 className="text-xl font-semibold mb-2">🎯 Score Exact</h4>
            <p className="text-gray-600">
              Les meilleurs prédictions de scores précis.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition bg-gray-50">
            <h4 className="text-xl font-semibold mb-2">📈 Over / Under</h4>
            <p className="text-gray-600">
              Analyse des buts supérieurs et inférieurs.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition bg-gray-50">
            <h4 className="text-xl font-semibold mb-2">💎 Combos 10+</h4>
            <p className="text-gray-600">
              Combinaisons à haute cote pour maximiser tes gains.
            </p>
          </div>

        </div>
      </section>

      {/* STATISTIQUES */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

          <div>
            <h4 className="text-4xl font-bold text-blue-600">87%</h4>
            <p className="text-gray-600 mt-2">Taux de réussite</p>
          </div>

          <div>
            <h4 className="text-4xl font-bold text-blue-600">2 500+</h4>
            <p className="text-gray-600 mt-2">Membres actifs</p>
          </div>

          <div>
            <h4 className="text-4xl font-bold text-blue-600">10 000€+</h4>
            <p className="text-gray-600 mt-2">Gains générés</p>
          </div>

        </div>
      </section>

      {/* SECTION VIP PREMIUM */}
      <section className="py-20 px-6 bg-blue-700 text-white text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-6">
          Passe au niveau supérieur 👑
        </h3>

        <p className="max-w-2xl mx-auto mb-8 text-blue-100">
          Accède aux pronostics VIP exclusifs, analyses détaillées,
          grosses cotes et stratégies professionnelles.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/vip">
            <button className="px-8 py-4 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition">
              Devenir Membre VIP
            </button>
          </Link>

          {/* ✅ BOUTON CONTACT AJOUTÉ */}
          <Link href="/contact">
            <button className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition">
              Contact
            </button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-6 text-center relative">
        <h4 className="text-white text-xl font-semibold mb-4">
          JOKING
        </h4>

        <p className="mb-4">
          Plateforme de pronostics football fiables et professionnels.
        </p>

        <p className="text-sm">
          © {new Date().getFullYear()} JOKING - Tous droits réservés
        </p>

        {/* ✅ PETIT POINT ADMIN EN BAS A DROITE */}
        <Link href="/admin">
          <div className="absolute bottom-4 right-4 w-3 h-3 bg-gray-500 rounded-full hover:bg-blue-500 transition cursor-pointer"></div>
        </Link>

      </footer>

    </main>
  )
}