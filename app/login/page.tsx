"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signInWithGoogle } from "../lib/firebase"

export default function Login() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Page vers laquelle on redirige après connexion
  const redirect = searchParams.get("redirect") || "/"

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      setError("")

      await signInWithGoogle()

      router.push(redirect)
    } catch (err) {
      console.error(err)
      setError("Erreur lors de la connexion Google")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-800">

        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Connexion
        </h1>

        {error && (
          <p className="text-red-500 mb-4 text-sm text-center">
            {error}
          </p>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 bg-white text-black font-semibold rounded-lg 
                     hover:bg-gray-200 transition duration-200 disabled:opacity-50"
        >
          {loading ? "Connexion..." : "Se connecter avec Google"}
        </button>

      </div>
    </main>
  )
}