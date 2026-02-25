import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white relative">

      {/* HERO PREMIUM */}
      <section className="text-center pt-20 pb-16 px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
          Les meilleurs pronostics <br className="hidden sm:block" />
          <span className="text-yellow-400">football ⚽</span>
        </h1>

        <p className="text-gray-400 max-w-md mx-auto mt-6 text-sm sm:text-base">
          Analyse experte. Discipline. Résultats.
          Rejoins la communauté JOKING dès aujourd’hui.
        </p>
      </section>

      {/* STATISTIQUES PREMIUM */}
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

      {/* SECTION VIP PREMIUM */}
      <section className="px-6 pb-24">
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

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black/40 border-t border-white/10 text-gray-400 py-10 px-6 text-center relative">
        <h4 className="text-white text-xl font-semibold mb-3">
          JOKING
        </h4>

        <p className="mb-4 text-sm">
          Plateforme de pronostics football fiables et professionnels.
        </p>

        <p className="text-xs">
          © {new Date().getFullYear()} JOKING - Tous droits réservés
        </p>

        {/* PETIT POINT ADMIN */}
        <Link href="/admin">
          <div className="absolute bottom-4 right-4 w-3 h-3 bg-gray-600 rounded-full hover:bg-yellow-400 transition cursor-pointer"></div>
        </Link>
      </footer>

    </main>
  )
}