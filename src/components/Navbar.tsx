"use client"

import Link from "next/link"
import { signOut } from "next-auth/react"
import { Wrench, Menu, X } from "lucide-react"
import { useState } from "react"
import type { Session } from "next-auth"

export default function Navbar({ session }: { session: Session | null }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-brand-700"
        >
          <Wrench className="h-5 w-5" />
          ChambaPro
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <>
              {session.user.role === "PROFESSIONAL" && (
                <Link href="/dashboard" className="btn-outline text-sm">
                  Panel
                </Link>
              )}
              <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                <span className="text-sm text-gray-600">
                  {session.user.name?.split(" ")[0]}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Cerrar sesión
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/signin" className="btn-outline text-sm">
                Iniciar sesión
              </Link>
              <Link href="/signup" className="btn-primary text-sm">
                Regístrate
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setOpen(!open)}
          aria-label="Alternar menú"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          {session ? (
            <>
              {session.user.role === "PROFESSIONAL" && (
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setOpen(false)}
                >
                  Panel
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="block w-full text-left px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                Iniciar sesión
              </Link>
              <Link
                href="/signup"
                className="block px-3 py-2 rounded-lg text-sm font-medium text-brand-600 hover:bg-brand-50"
                onClick={() => setOpen(false)}
              >
                Regístrate
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}
