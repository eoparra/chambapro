import Link from "next/link"
import { MapPin, Star, BadgeCheck } from "lucide-react"
import type { Professional } from "@prisma/client"

export default function ProfessionalCard({
  professional: p,
}: {
  professional: Professional
}) {
  const isVerified = p.reviewCount > 0

  return (
    <div className="card hover:shadow-md transition-shadow group flex flex-col">
      <div className="h-1.5 bg-gradient-to-r from-brand-500 to-brand-700 rounded-t-xl" />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start gap-4 mb-3">
          <div className="w-14 h-14 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xl font-bold shrink-0">
            {p.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
              <h3 className="font-bold text-gray-900 truncate group-hover:text-brand-700 transition-colors">
                {p.name}
              </h3>
              {isVerified && (
                <span className="inline-flex items-center gap-0.5 text-xs text-green-700 bg-green-50 border border-green-100 rounded-full px-2 py-0.5 font-medium shrink-0">
                  <BadgeCheck className="h-3 w-3" />
                  Verificado
                </span>
              )}
            </div>
            <span className="text-xs bg-brand-50 text-brand-700 rounded-full px-2.5 py-0.5 font-medium">
              {p.profession}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`h-3.5 w-3.5 ${
                  s <= Math.round(p.avgRating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-900">
            {p.avgRating.toFixed(1)}
          </span>
          <span className="text-xs text-gray-400">
            ({p.reviewCount} reseña{p.reviewCount !== 1 ? "s" : ""})
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          {p.municipio}, {p.estado}
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 flex-1 mb-4 leading-relaxed">
          {p.description}
        </p>

        <Link
          href={`/professionals/${p.id}`}
          className="btn-primary w-full text-center"
        >
          Ver Perfil
        </Link>
      </div>
    </div>
  )
}
