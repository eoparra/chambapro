import { notFound } from "next/navigation"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import StarRating from "@/components/StarRating"
import ReviewForm from "@/components/ReviewForm"
import { MapPin, Phone, Mail, Briefcase, DollarSign, MessageSquare } from "lucide-react"
import Link from "next/link"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const pro = await prisma.professional.findUnique({ where: { id } })
  if (!pro) return { title: "No encontrado" }
  return {
    title: `${pro.name} — ${pro.profession} en ${pro.municipio} | ChambaPro`,
    description: pro.description.slice(0, 160),
  }
}

export default async function ProfessionalPage({ params }: Props) {
  const { id } = await params
  const session = await auth()

  const pro = await prisma.professional.findUnique({
    where: { id },
    include: {
      reviews: {
        include: { user: { select: { name: true, image: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  })

  if (!pro) notFound()

  const hasReviewed = session?.user?.id
    ? pro.reviews.some((r) => r.userId === session.user.id)
    : false

  const isOwner = session?.user?.id === pro.userId

  const locationParts = [pro.colonia, pro.municipio, pro.estado].filter(Boolean)
  const whatsappUrl = pro.whatsapp
    ? `https://wa.me/${pro.whatsapp.replace(/[^0-9]/g, "")}`
    : null

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Left: Sidebar ── */}
        <div className="lg:col-span-1 space-y-4">
          <div className="card p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4 text-brand-700 text-3xl font-bold">
              {pro.name.charAt(0)}
            </div>
            <h1 className="text-xl font-bold text-gray-900">{pro.name}</h1>
            <span className="inline-block mt-1 text-sm bg-brand-50 text-brand-700 rounded-full px-3 py-0.5 font-medium">
              {pro.profession}
            </span>
            <div className="flex items-center justify-center gap-2 mt-3">
              <StarRating rating={pro.avgRating} size="md" />
              <span className="font-semibold text-gray-900">
                {pro.avgRating.toFixed(1)}
              </span>
              <span className="text-gray-400 text-sm">({pro.reviewCount})</span>
            </div>
            {isOwner && (
              <Link href="/dashboard" className="btn-outline w-full mt-4 text-sm">
                Editar Perfil
              </Link>
            )}
          </div>

          <div className="card p-5 space-y-3">
            <h2 className="font-semibold text-gray-900 mb-2">Contacto</h2>
            <InfoRow icon={MapPin} text={locationParts.join(", ")} />
            {pro.codigoPostal && <InfoRow icon={MapPin} text={`C.P. ${pro.codigoPostal}`} />}
            {pro.phone && <InfoRow icon={Phone} text={pro.phone} />}
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
              >
                <Phone className="h-4 w-4 shrink-0" />
                WhatsApp
              </a>
            )}
            <InfoRow icon={Mail} text={pro.email} />
            {pro.pricing && <InfoRow icon={DollarSign} text={pro.pricing} />}
          </div>
        </div>

        {/* ── Right: Main content ── */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-brand-600" />
              Acerca de
            </h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {pro.description}
            </p>
          </div>

          {pro.photos.length > 0 && (
            <div className="card p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Fotos</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {pro.photos.map((url, i) => (
                  <div
                    key={i}
                    className="aspect-square relative rounded-lg overflow-hidden bg-gray-100"
                  >
                    <Image
                      src={url}
                      alt={`${pro.name} foto ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="card p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-brand-600" />
              Reseñas ({pro.reviewCount})
            </h2>

            {!isOwner && (
              <div className="mb-6 pb-6 border-b border-gray-100">
                {!session ? (
                  <p className="text-sm text-gray-500 bg-gray-50 rounded-lg px-4 py-3">
                    <Link
                      href="/signin"
                      className="text-brand-600 font-medium hover:underline"
                    >
                      Inicia sesión
                    </Link>{" "}
                    para dejar una reseña.
                  </p>
                ) : hasReviewed ? (
                  <p className="text-sm text-green-600 bg-green-50 rounded-lg px-4 py-3">
                    Ya has reseñado a este profesional. ¡Gracias!
                  </p>
                ) : (
                  <ReviewForm professionalId={pro.id} />
                )}
              </div>
            )}

            {pro.reviews.length === 0 ? (
              <p className="text-gray-400 text-sm">Aún no hay reseñas. ¡Sé el primero!</p>
            ) : (
              <div className="space-y-5">
                {pro.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-100 last:border-0 pb-5 last:pb-0"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600 shrink-0">
                          {review.user.name?.charAt(0) ?? "A"}
                        </div>
                        <span className="font-medium text-sm text-gray-900">
                          {review.user.name ?? "Anónimo"}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 shrink-0">
                        {new Intl.DateTimeFormat("es-MX", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }).format(review.createdAt)}
                      </span>
                    </div>
                    <StarRating rating={review.rating} size="sm" />
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

function InfoRow({
  icon: Icon,
  text,
}: {
  icon: React.ElementType
  text: string
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <Icon className="h-4 w-4 text-gray-400 shrink-0" />
      <span className="break-all">{text}</span>
    </div>
  )
}
