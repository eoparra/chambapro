import Link from "next/link"
import { prisma } from "@/lib/prisma"
import SearchBar from "@/components/SearchBar"
import ProfessionalCard from "@/components/ProfessionalCard"
import {
  Wrench, Star, Shield, Users,
  Zap, Droplets, Paintbrush, Hammer,
  Wind, Leaf, Sparkles,
} from "lucide-react"
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

const CATEGORIES = [
  { label: "Plomero",                   icon: Droplets,   iconBg: "bg-blue-500" },
  { label: "Electricista",              icon: Zap,        iconBg: "bg-yellow-400" },
  { label: "Albañil",                   icon: Hammer,     iconBg: "bg-orange-500" },
  { label: "Pintor",                    icon: Paintbrush, iconBg: "bg-purple-500" },
  { label: "Jardinería y Paisajismo",   icon: Leaf,       iconBg: "bg-green-500" },
  { label: "Técnico en Refrigeración",  icon: Wind,       iconBg: "bg-red-500" },
  { label: "Carpintero",                icon: Wrench,     iconBg: "bg-amber-600" },
  { label: "Limpieza Profunda",         icon: Sparkles,   iconBg: "bg-teal-500" },
] as const

const FEATURES = [
  {
    icon: Shield,
    title: "Profesionales Verificados",
    desc: "Todos los profesionales pasan por nuestro proceso de verificación para tu tranquilidad.",
  },
  {
    icon: Star,
    title: "Reseñas Honestas",
    desc: "Opiniones reales de clientes reales para que tomes la mejor decisión.",
  },
  {
    icon: Users,
    title: "Amplia Selección",
    desc: "Elige entre cientos de profesionales capacitados en tu zona.",
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

      {/* ── Browse by Category ── */}
      {!hasSearch && (
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Busca por Categoría</h2>
              <p className="text-gray-500">Encuentra al profesional indicado para tu proyecto</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {CATEGORIES.map(({ label, icon: Icon, iconBg }) => (
                <Link
                  key={label}
                  href={`/?profession=${encodeURIComponent(label)}`}
                  className="flex flex-col gap-5 p-6 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors group"
                >
                  <div className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center shadow-sm`}>
                    <Icon className="h-7 w-7 text-white" strokeWidth={1.75} />
                  </div>
                  <span className="font-semibold text-gray-900 text-sm group-hover:text-brand-700 transition-colors leading-snug">
                    {label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Results ── */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {hasSearch
                ? `Resultados (${professionals.length})`
                : "Profesionales Más Valorados"}
            </h2>
            {!hasSearch && (
              <p className="text-gray-500 mt-1">Los mejor calificados por nuestra comunidad</p>
            )}
          </div>
          {!hasSearch && (
            <Link
              href="/?q="
              className="text-sm text-brand-600 hover:text-brand-700 font-medium"
            >
              Ver todos →
            </Link>
          )}
        </div>

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

      {/* ── Why Choose ChambaPro ── */}
      {!hasSearch && (
        <section className="bg-white border-t border-gray-200">
          <div className="max-w-5xl mx-auto px-4 py-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">¿Por qué ChambaPro?</h2>
              <p className="text-gray-500">Hacemos fácil encontrar profesionales de confianza</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="text-center">
                  <div className="bg-brand-50 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-7 w-7 text-brand-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA for Professionals ── */}
      {!hasSearch && (
        <section className="bg-gradient-to-br from-brand-700 to-brand-900 text-white">
          <div className="max-w-3xl mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl font-bold mb-3">¿Eres Profesional?</h2>
            <p className="text-blue-100 text-lg mb-8">
              Únete a ChambaPro y conecta con miles de clientes que buscan tus servicios.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/signup"
                className="bg-white text-brand-700 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors"
              >
                Crear mi perfil gratis
              </Link>
              <Link
                href="/signin"
                className="border border-white/40 text-white font-medium px-8 py-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                Ya tengo cuenta
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
