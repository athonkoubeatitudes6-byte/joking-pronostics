"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from "../lib/firebase"
import Cookies from "js-cookie"

type UserPlan = "free" | "vip" | "vip_pro"

interface AuthContextType {
  user: User | null
  loading: boolean
  plan: UserPlan | null
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  plan: null,
  isAdmin: false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [plan, setPlan] = useState<UserPlan | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)

      if (currentUser) {
        // 🔐 Cookie email
        if (currentUser.email) {
          Cookies.set("user_email", currentUser.email, {
            expires: 7,
            secure: true,
            sameSite: "strict",
          })
        }

        // 🔎 Vérifier si utilisateur existe dans Firestore
        const userRef = doc(db, "users", currentUser.uid)
        const userSnap = await getDoc(userRef)

        if (userSnap.exists()) {
          const data = userSnap.data()
          setPlan(data.plan || "free")
          setIsAdmin(data.role === "admin")
        } else {
          // 🆕 Si nouveau utilisateur → créer document par défaut
          await setDoc(userRef, {
            email: currentUser.email,
            plan: "free",
            role: "user",
            createdAt: new Date(),
          })

          setPlan("free")
          setIsAdmin(false)
        }
      } else {
        Cookies.remove("user_email")
        setPlan(null)
        setIsAdmin(false)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, plan, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}