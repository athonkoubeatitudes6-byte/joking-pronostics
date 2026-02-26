"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: "🏠", label: "Accueil" },
    { href: "/pronostics", icon: "⚽", label: "Gratuit" },
    { href: "/vip", icon: "👑", label: "VIP" },
    { href: "/historique", icon: "📊", label: "Historique" },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-950/95 backdrop-blur-md border-t border-gray-800 shadow-2xl">
      <div className="flex justify-around items-center py-3 text-xs">

        {navItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center transition duration-300 ${
                isActive
                  ? "text-yellow-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {/* Glow effect */}
              {isActive && (
                <span className="absolute -top-1 w-8 h-1 bg-yellow-400 rounded-full"></span>
              )}

              <span className="text-lg">{item.icon}</span>
              <span className="text-[11px] mt-1">{item.label}</span>
            </Link>
          )
        })}

      </div>
    </div>
  )
}