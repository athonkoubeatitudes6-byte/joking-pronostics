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
    const { token, topic } = await req.json()

    if (!token || !topic) {
      return NextResponse.json({ error: "Missing token or topic" }, { status: 400 })
    }

    await admin.messaging().subscribeToTopic(token, topic)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Subscription error:", error)
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 })
  }
}