import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import ProfileForm from "@/components/ProfileForm"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Panel — ChambaPro",
}

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) redirect("/signin")
  if (session.user.role !== "PROFESSIONAL") redirect("/")

  const professional = await prisma.professional.findUnique({
    where: { userId: session.user.id },
  })

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {professional ? "Editar Tu Perfil" : "Crear Tu Perfil"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {professional
              ? "Mantén tu información actualizada para atraer más clientes."
              : "Completa tus datos para empezar a recibir solicitudes."}
          </p>
        </div>
        {professional && (
          <Link
            href={`/professionals/${professional.id}`}
            className="btn-outline flex items-center gap-1.5 text-sm"
          >
            <ExternalLink className="h-4 w-4" />
            Ver Perfil
          </Link>
        )}
      </div>

      {professional && (
        <div className="bg-blue-50 rounded-xl p-4 mb-6 text-sm">
          <span className="font-medium text-blue-900">Tu calificación: </span>
          <span className="text-blue-700">
            {professional.avgRating.toFixed(1)} ★ &middot; {professional.reviewCount} reseña
            {professional.reviewCount !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      <ProfileForm professional={professional} />
    </main>
  )
}
