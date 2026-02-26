import { initializeApp } from "firebase/app"
import { 
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth"
import { getMessaging, getToken, isSupported } from "firebase/messaging"

const firebaseConfig = {
  apiKey: "AIzaSyD2sp4YsZD1Er2r_RIq5zbE1hqgI20lmvw",
  authDomain: "joking-app-d3e29.firebaseapp.com",
  projectId: "joking-app-d3e29",
  storageBucket: "joking-app-d3e29.firebasestorage.app",
  messagingSenderId: "156633010732",
  appId: "1:156633010732:web:5ac80fcc9fcbb0aec9f789",
}

const app = initializeApp(firebaseConfig)

/* =========================
   🔐 AUTH CONFIGURATION
========================= */

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider)
}

export const logout = () => {
  return signOut(auth)
}

/* =========================
   🔔 MESSAGING (EXISTANT)
========================= */

export const messagingPromise = isSupported().then((supported) =>
  supported ? getMessaging(app) : null
)

export async function requestNotificationPermission() {
  try {
    const messaging = await messagingPromise

    if (!messaging) {
      console.log("❌ Messaging non supporté sur ce navigateur")
      return
    }

    const permission = await Notification.requestPermission()

    if (permission !== "granted") {
      console.log("❌ Permission refusée")
      return
    }

    if (!process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY) {
      console.log("❌ VAPID KEY manquante dans .env.local")
      return
    }

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    })

    if (!token) {
      console.log("❌ Aucun token généré")
      return
    }

    console.log("✅ TOKEN WEB:", token)

    const response = await fetch("/api/subscribe-topic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        topic: "free",
      }),
    })

    if (!response.ok) {
      console.log("❌ Erreur abonnement topic")
      return
    }

    console.log("🔥 Token enregistré et abonné au topic free")

  } catch (error) {
    console.error("❌ Erreur notification:", error)
  }
}