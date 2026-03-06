"use client"

import { useRouter } from "next/navigation"

export default function VIPHome() {

  const router = useRouter()

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-50 px-6 py-8 text-center">

      <h1 className="text-3xl font-bold mb-10">
        👑 Pronostics VIP
      </h1>

      <div className="space-y-6 max-w-md mx-auto">

        <button
          onClick={() => router.push("/vip/free")}
          className="w-full bg-green-500 text-white py-4 rounded-xl font-bold text-lg"
        >
          FREE 🎁
        </button>

        <button
          onClick={() => router.push("/vip/vip")}
          className="w-full bg-yellow-400 text-black py-4 rounded-xl font-bold text-lg"
        >
          VIP 👑
        </button>

        <button
          onClick={() => router.push("/vip/vip-pro")}
          className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold text-lg"
        >
          VIP PRO 💎
        </button>

      </div>

    </main>
  )
}