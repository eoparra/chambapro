import Link from "next/link"
import Image from "next/image"
import {
  Wrench,
  Star,
  Shield,
  Clock,
  Search,
  MapPin,
  CheckCircle,
  ArrowRight,
  Zap,
  Paintbrush,
  Hammer,
  Leaf,
  Wind,
  Sparkles,
  Droplets,
  Users,
  BadgeCheck,
  ChevronRight,
  Phone,
  MessageCircle,
} from "lucide-react"

/* ── Mock data ── */
const STATS = [
  { value: "10,000+", label: "Usuarios registrados" },
  { value: "500+", label: "Profesionales verificados" },
  { value: "4.9", label: "Calificación promedio" },
  { value: "30+", label: "Oficios disponibles" },
]

const CATEGORIES = [
  { icon: Droplets, label: "Plomería", bg: "bg-blue-500/10", color: "text-blue-400" },
  { icon: Zap, label: "Electricidad", bg: "bg-yellow-500/10", color: "text-yellow-400" },
  { icon: Paintbrush, label: "Pintura", bg: "bg-purple-500/10", color: "text-purple-400" },
  { icon: Hammer, label: "Carpintería", bg: "bg-amber-500/10", color: "text-amber-400" },
  { icon: Leaf, label: "Jardinería", bg: "bg-green-500/10", color: "text-green-400" },
  { icon: Wind, label: "Climatización", bg: "bg-cyan-500/10", color: "text-cyan-400" },
  { icon: Sparkles, label: "Limpieza", bg: "bg-pink-500/10", color: "text-pink-400" },
  { icon: Wrench, label: "Reparaciones", bg: "bg-orange-500/10", color: "text-orange-400" },
]

const MOCK_PROS = [
  {
    seed: "handy1",
    name: "Juan Martínez",
    profession: "Plomero",
    rating: 4.8,
    reviews: 34,
    location: "Monterrey, Nuevo León",
    desc: "Especialista en instalaciones hidráulicas y reparación de fugas con más de 10 años de experiencia. Presupuesto sin costo.",
    years: 10,
    price: "$300–$800 / servicio",
  },
  {
    seed: "handy2",
    name: "Sofía Ramírez",
    profession: "Electricista",
    rating: 4.9,
    reviews: 57,
    location: "Guadalajara, Jalisco",
    desc: "Certificada por la CFE. Instalaciones eléctricas residenciales y comerciales. Atención los 7 días de la semana.",
    years: 8,
    price: "$400–$1,200 / servicio",
  },
  {
    seed: "handy3",
    name: "Carlos López",
    profession: "Pintor",
    rating: 4.7,
    reviews: 22,
    location: "Ciudad de México, CDMX",
    desc: "Pintura interior y exterior con acabados de alta calidad. Uso de materiales premium con garantía de 2 años.",
    years: 12,
    price: "$200–$600 / cuarto",
  },
]

const FEATURES = [
  {
    icon: BadgeCheck,
    title: "Perfiles Verificados",
    desc: "Cada profesional es revisado antes de aparecer en el directorio. Identidad, experiencia y referencias confirmadas.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Star,
    title: "Reseñas Auténticas",
    desc: "Solo quienes contrataron el servicio pueden calificar. Sin reseñas falsas, sin manipulación de puntajes.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Clock,
    title: "Contacto Directo",
    desc: "Sin intermediarios. Llama o manda WhatsApp al profesional directo y recibe cotización en horas.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
]

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-4 w-4 ${
            s <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-600 text-slate-600"
          }`}
        />
      ))}
    </div>
  )
}

export default function PreviewPage() {
  return (
    <main className="bg-slate-950 text-white overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[88vh] flex flex-col justify-center px-4 py-28">
        {/* Background layers */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(251,191,36,0.12),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Confiado por más de 10,000 hogares en México
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
            Encuentra{" "}
            <span className="text-amber-400">Profesionales</span>
            <br />
            de Confianza
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Plomeros, electricistas, pintores y más — verificados, con reseñas reales
            y contacto directo. Sin comisiones, sin intermediarios.
          </p>

          {/* Search bar */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-3 max-w-3xl mx-auto flex flex-col md:flex-row gap-2 shadow-2xl shadow-black/40">
            <div className="flex items-center gap-2.5 flex-1 bg-white/5 rounded-xl px-4 py-3">
              <Wrench className="h-4 w-4 text-amber-400 shrink-0" />
              <span className="text-sm text-slate-400">Todos los oficios</span>
            </div>
            <div className="flex items-center gap-2.5 flex-1 bg-white/5 rounded-xl px-4 py-3">
              <MapPin className="h-4 w-4 text-amber-400 shrink-0" />
              <span className="text-sm text-slate-400">Ciudad o municipio</span>
            </div>
            <div className="flex items-center gap-2.5 flex-1 bg-white/5 rounded-xl px-4 py-3">
              <Search className="h-4 w-4 text-slate-500 shrink-0" />
              <span className="text-sm text-slate-500">Palabras clave...</span>
            </div>
            <Link
              href="/"
              className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors text-sm shrink-0"
            >
              <Search className="h-4 w-4" />
              Buscar
            </Link>
          </div>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-slate-500">
            <Link href="/" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <ChevronRight className="h-4 w-4 text-amber-500" />
              Explorar directorio
            </Link>
            <Link href="/signup" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <ChevronRight className="h-4 w-4 text-amber-500" />
              Registrar mi negocio
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-extrabold text-amber-400">{value}</p>
              <p className="text-sm text-slate-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BROWSE BY CATEGORY ── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-2">Oficios</p>
              <h2 className="text-3xl md:text-4xl font-bold">Busca por Categoría</h2>
            </div>
            <Link href="/" className="hidden md:flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors">
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CATEGORIES.map(({ icon: Icon, label, bg, color }) => (
              <div
                key={label}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/10 transition-all cursor-pointer"
              >
                <div className={`${bg} p-3 rounded-xl`}>
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOP PROFESSIONALS ── */}
      <section className="py-20 px-4 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-2">Destacados</p>
              <h2 className="text-3xl md:text-4xl font-bold">Profesionales Mejor Valorados</h2>
            </div>
            <Link href="/" className="hidden md:flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors">
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {MOCK_PROS.map((pro) => (
              <div
                key={pro.name}
                className="group flex flex-col sm:flex-row gap-5 p-5 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-amber-500/20 transition-all"
              >
                {/* Photo */}
                <div className="relative shrink-0">
                  <Image
                    src={`https://picsum.photos/seed/${pro.seed}/120/120`}
                    alt={pro.name}
                    width={88}
                    height={88}
                    className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl object-cover"
                  />
                  <span className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <BadgeCheck className="h-2.5 w-2.5" /> Verificado
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start gap-2 mb-1">
                    <h3 className="font-bold text-white text-lg">{pro.name}</h3>
                    <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {pro.profession}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Stars rating={pro.rating} />
                    <span className="text-sm font-bold text-white">{pro.rating}</span>
                    <span className="text-xs text-slate-500">({pro.reviews} reseñas)</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {pro.location}
                  </div>
                  <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">{pro.desc}</p>
                </div>

                {/* Right column */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-between gap-3 shrink-0">
                  <div className="text-right">
                    <p className="text-xs text-slate-500 mb-0.5">Experiencia</p>
                    <p className="text-sm font-bold text-white">{pro.years} años</p>
                    <p className="text-xs text-slate-500 mt-2 hidden sm:block">{pro.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-white/5 border border-white/10 hover:border-amber-500/30 p-2.5 rounded-xl transition-colors" aria-label="WhatsApp">
                      <MessageCircle className="h-4 w-4 text-slate-400" />
                    </button>
                    <button className="bg-white/5 border border-white/10 hover:border-amber-500/30 p-2.5 rounded-xl transition-colors" aria-label="Llamar">
                      <Phone className="h-4 w-4 text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHAMBAPRO ── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-2">¿Por qué nosotros?</p>
            <h2 className="text-3xl md:text-4xl font-bold">Lo Que Nos Hace Diferentes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="p-7 rounded-2xl border border-white/5 bg-white/[0.03] hover:border-amber-500/20 transition-all"
              >
                <div className={`${bg} w-12 h-12 rounded-2xl flex items-center justify-center mb-5`}>
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROLES ── */}
      <section className="py-20 px-4 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-2">Dos roles</p>
            <h2 className="text-3xl md:text-4xl font-bold">Diseñado para Todos</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Customer */}
            <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.03]">
              <div className="bg-blue-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                <Search className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-1">Para Clientes</h3>
              <p className="text-slate-400 text-sm mb-5">Encuentra al profesional ideal para tu hogar o negocio.</p>
              <ul className="space-y-3 mb-8">
                {[
                  "Busca y compara profesionales gratis",
                  "Lee reseñas verificadas de otros clientes",
                  "Contacto directo sin formularios ni citas",
                  "Deja tu reseña y ayuda a la comunidad",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="flex items-center justify-center gap-2 w-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 px-5 rounded-xl transition-all text-sm"
              >
                Crear Cuenta de Cliente <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Professional */}
            <div className="p-8 rounded-2xl border border-amber-500/20 bg-amber-500/5">
              <div className="bg-amber-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                <Wrench className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold mb-1">Para Profesionales</h3>
              <p className="text-slate-400 text-sm mb-5">Consigue más clientes y haz crecer tu negocio.</p>
              <ul className="space-y-3 mb-8">
                {[
                  "Crea tu perfil y aparece en búsquedas locales",
                  "Sube fotos de tus trabajos anteriores",
                  "Recibe contactos directos sin comisiones",
                  "Administra tu perfil desde el panel",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-5 rounded-xl transition-colors text-sm"
              >
                Registrar mi Negocio <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,rgba(251,191,36,0.10),transparent)]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            ¿Listo para Empezar?
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            Únete a miles de usuarios que ya encuentran profesionales de confianza con ChambaPro.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-base"
            >
              Explorar el Directorio <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/signup"
              className="border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all text-base"
            >
              <Users className="h-5 w-5" />
              Crear Cuenta Gratis
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
