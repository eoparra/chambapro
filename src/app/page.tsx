import { prisma } from "@/lib/prisma"
import SearchBar from "@/components/SearchBar"
import ProfessionalCard from "@/components/ProfessionalCard"
import { Wrench, Star, Shield, Clock } from "lucide-react"
import type { Professional } from "@prisma/client"

interface PageProps {
  searchParams: Promise<{
    profession?: string
    municipio?: string
    q?: string
  }>
}

async function searchProfessionals(params: {
  profession?: string
  municipio?: string
  q?: string
}): Promise<Professional[]> {
  const where: Parameters<typeof prisma.professional.findMany>[0]["where"] = {}

  if (params.profession) {
    where.profession = { equals: params.profession, mode: "insensitive" }
  }

  if (params.municipio) {
    where.OR = [
      { municipio: { contains: params.municipio, mode: "insensitive" } },
      { codigoPostal: { contains: params.municipio, mode: "insensitive" } },
    ]
  }

  if (params.q) {
    where.AND = [
      ...(where.OR ? [{ OR: where.OR }] : []),
      {
        OR: [
          { name: { contains: params.q, mode: "insensitive" } },
          { description: { contains: params.q, mode: "insensitive" } },
          { profession: { contains: params.q, mode: "insensitive" } },
        ],
      },
    ]
    delete where.OR
  }

  return prisma.professional.findMany({
    where,
    orderBy: { avgRating: "desc" },
    take: 24,
  })
}

const FEATURES = [
  {
    icon: Star,
    title: "Reseñas Verificadas",
    desc: "Calificaciones reales de clientes reales.",
  },
  {
    icon: Shield,
    title: "Profesionales de Confianza",
    desc: "Todos los profesionales son verificados.",
  },
  {
    icon: Clock,
    title: "Respuesta Rápida",
    desc: "Recibe cotizaciones en horas.",
  },
]

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams
  const hasSearch = params.profession || params.municipio || params.q

  const professionals = hasSearch
    ? await searchProfessionals(params)
    : await prisma.professional.findMany({
        orderBy: { avgRating: "desc" },
        take: 12,
      })

  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-brand-700 to-brand-900 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-5">
            <div className="bg-white/10 p-4 rounded-2xl">
              <Wrench className="h-10 w-10" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Encuentra Profesionales de Confianza
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Conecta con plomeros, electricistas, pintores y más en tu zona.
          </p>
          <SearchBar initialValues={params} />
        </div>
      </section>

      {/* ── Feature strip ── */}
      {!hasSearch && (
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="bg-brand-50 p-2 rounded-lg shrink-0">
                  <Icon className="h-5 w-5 text-brand-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{title}</p>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Results ── */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {hasSearch
            ? `Resultados (${professionals.length})`
            : "Profesionales Destacados"}
        </h2>

        {professionals.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-xl border border-gray-200">
            <Wrench className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No se encontraron profesionales
            </h3>
            <p className="text-gray-400">Intenta ajustar tus filtros de búsqueda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionals.map((pro) => (
              <ProfessionalCard key={pro.id} professional={pro} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
