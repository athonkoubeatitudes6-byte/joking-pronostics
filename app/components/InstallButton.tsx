"use client"

import { useEffect, useState } from "react"

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setVisible(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const installApp = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setVisible(false)
    }

    setDeferredPrompt(null)
  }

  if (!visible) return null

  return (
    <button
      onClick={installApp}
      className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-6 py-3 rounded-full shadow-lg font-bold z-50"
    >
      📲 Installer l’application
    </button>
  )
}