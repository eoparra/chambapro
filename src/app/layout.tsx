import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { auth } from "@/lib/auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ChambaPro — Encuentra Profesionales de Confianza",
  description:
    "Conecta con plomeros, electricistas, pintores y más profesionales verificados en tu zona.",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <html lang="es-MX">
      <body className={inter.className}>
        <Navbar session={session} />
        <div className="min-h-screen">{children}</div>
        <footer className="bg-gray-900 text-gray-400 py-10 mt-20">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm">
            <p className="font-semibold text-white text-lg mb-1">ChambaPro</p>
            <p>
              © {new Date().getFullYear()} ChambaPro. Conectando personas con
              profesionales de confianza.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
