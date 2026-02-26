import { initializeApp } from "firebase/app"
import { getMessaging, getToken, isSupported } from "firebase/messaging"

 const firebaseConfig = {

  apiKey: "AIzaSyD2sp4YsZD1Er2r_RIq5zbE1hqgI20lmvw",

  authDomain: "joking-app-d3e29.firebaseapp.com",

  projectId: "joking-app-d3e29",

  storageBucket: "joking-app-d3e29.firebasestorage.app",

  messagingSenderId: "156633010732",

  appId: "1:156633010732:web:5ac80fcc9fcbb0aec9f789"

 };


const app = initializeApp(firebaseConfig)

export const messagingPromise = isSupported().then((supported) =>
  supported ? getMessaging(app) : null
)

export async function requestNotificationPermission() {
  const messaging = await messagingPromise
  if (!messaging) return

  const permission = await Notification.requestPermission()
  if (permission !== "granted") return

  const token = await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
  })

  if (!token) return

  // 🔥 Abonnement au topic FREE par défaut
  await fetch("/api/subscribe-topic", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token,
      topic: "free",
    }),
  })

  console.log("Token enregistré et abonné au topic free")
}