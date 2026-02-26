import { NextResponse } from "next/server"
import admin from "firebase-admin"

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  })
}

export async function POST(req: Request) {
  try {
    const { match, competition, prediction, type } = await req.json()

    const topic = type === "VIP" ? "vip" : "free"

    const message = {
      token: "TON_TOKEN_ICI",
      notification: {
        title: type === "VIP" 
          ? "🔥 Nouveau Match VIP !" 
          : "⚽ Nouveau Match Gratuit !",
        body: `${match} • ${prediction}`,
      },
      data: {
        match,
        competition,
        prediction,
        type,
      },
    }

    await admin.messaging().send(message)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur FCM:", error)
    return NextResponse.json(
      { success: false, error: "Erreur notification" },
      { status: 500 }
    )
  }
}