"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "../lib/firebase"
import Cookies from "js-cookie"

type UserPlan = "free" | "vip" | "vip_pro"

interface AuthContextType {
  user: User | null
  loading: boolean
  plan: UserPlan
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  plan: "free",
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // 🔥 Pour l’instant tous les utilisateurs sont FREE
  const [plan] = useState<UserPlan>("free")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)

      if (currentUser?.email) {
        Cookies.set("user_email", currentUser.email, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        })
      } else {
        Cookies.remove("user_email")
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, plan }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}