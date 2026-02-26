"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "../lib/firebase"
import Cookies from "js-cookie"

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)

      // 🔐 Si utilisateur connecté → on sauvegarde son email
      if (currentUser?.email) {
        Cookies.set("user_email", currentUser.email, {
          expires: 7, // expire dans 7 jours
          secure: true,
          sameSite: "strict",
        })
      } else {
        // 🔐 Si déconnecté → on supprime le cookie
        Cookies.remove("user_email")
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}