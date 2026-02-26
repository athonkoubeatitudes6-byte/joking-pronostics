"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Trophy, Crown, BarChart3 } from "lucide-react"

export default function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Home, label: "Accueil" },
    { href: "/pronostics", icon: Trophy, label: "Gratuit" },
    { href: "/vip", icon: Crown, label: "VIP" },
    { href: "/historique", icon: BarChart3, label: "Historique" },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-950/95 backdrop-blur-xl border-t border-gray-800 shadow-2xl">
      <div className="flex justify-around items-center py-3 text-xs">

        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center group"
            >
              {/* Glow bar animé */}
              {isActive && (
                <span className="absolute -top-1 w-8 h-1 bg-yellow-400 rounded-full animate-pulse"></span>
              )}

              <Icon
                size={22}
                className={`transition-all duration-300 ${
                  isActive
                    ? "text-yellow-400 scale-110 drop-shadow-[0_0_6px_rgba(250,204,21,0.7)]"
                    : "text-gray-400 group-hover:text-white"
                }`}
              />

              <span
                className={`mt-1 text-[11px] transition-all duration-300 ${
                  isActive
                    ? "text-yellow-400 font-medium"
                    : "text-gray-400 group-hover:text-white"
                }`}
              >
                {item.label}
              </span>
            </Link>
          )
        })}

      </div>
    </div>
  )
}