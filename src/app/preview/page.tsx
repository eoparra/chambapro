import Link from "next/link"
import {
  Wrench,
  Star,
  Shield,
  Clock,
  Search,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  CheckCircle,
  ArrowRight,
  Users,
  Briefcase,
  BarChart3,
} from "lucide-react"

/* ── Static mock data for the UI preview ── */
const MOCK_PROS = [
  {
    initials: "JM",
    name: "Juan Martínez",
    profession: "Plomero",
    rating: 4.8,
    reviews: 34,
    location: "Monterrey, Nuevo León",
    desc: "Especialista en instalaciones hidráulicas y reparación de fugas con más de 10 años de experiencia.",
  },
  {
    initials: "SR",
    name: "Sofía Ramírez",
    profession: "Electricista",
    rating: 4.9,
    reviews: 57,
    location: "Guadalajara, Jalisco",
    desc: "Certificada por la CFE. Instalaciones eléctricas residenciales y comerciales a precio justo.",
  },
  {
    initials: "CL",
    name: "Carlos López",
    profession: "Pintor",
    rating: 4.7,
    reviews: 22,
    location: "Ciudad de México, CDMX",
    desc: "Pintura interior y exterior con acabados de alta calidad. Presupuesto sin costo.",
  },
]

const STEPS = [
  {
    icon: Search,
    number: "01",
    title: "Busca tu Profesional",
    desc: "Usa los filtros de profesión, municipio o palabras clave para encontrar al experto que necesitas.",
  },
  {
    icon: Users,
    number: "02",
    title: "Compara Perfiles",
    desc: "Revisa fotos de trabajos anteriores, calificaciones verificadas y rangos de precios.",
  },
  {
    icon: Phone,
    number: "03",
    title: "Contacta Directo",
    desc: "Llama, manda WhatsApp o email directamente al profesional. Sin intermediarios, sin comisiones.",
  },
]

const FEATURES = [
  {
    icon: Star,
    title: "Reseñas Verificadas",
    desc: "Solo clientes que contrataron el servicio pueden dejar reseña. Calificaciones 100% auténticas.",
  },
  {
    icon: Shield,
    title: "Perfiles Verificados",
    desc: "Cada profesional pasa por un proceso de validación antes de aparecer en el directorio.",
  },
  {
    icon: Clock,
    title: "Respuesta Rápida",
    desc: "Recibe cotizaciones en horas. Contacto directo sin formularios ni esperas.",
  },
  {
    icon: MapPin,
    title: "Búsqueda Local",
    desc: "Encuentra profesionales en tu municipio o colonia exacta.",
  },
  {
    icon: Briefcase,
    title: "Múltiples Oficios",
    desc: "Plomeros, electricistas, pintores, carpinteros y docenas de oficios más.",
  },
  {
    icon: BarChart3,
    title: "Panel de Profesional",
    desc: "Los profesionales gestionan su perfil, fotos y datos de contacto fácilmente.",
  },
]

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-3.5 w-3.5 ${
            s <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  )
}

export default function PreviewPage() {
  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-brand-700 to-brand-900 text-white py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-blue-100 text-xs font-medium px-3 py-1 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Vista Previa de la Aplicación
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            ChambaPro
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-4 max-w-3xl mx-auto leading-relaxed">
            El directorio de profesionales de confianza para México.
          </p>
          <p className="text-blue-200 mb-10 max-w-2xl mx-auto">
            Conecta a usuarios con plomeros, electricistas, pintores y más —
            con reseñas verificadas, perfiles detallados y contacto directo sin
            intermediarios.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn-primary text-base px-6 py-3">
              Explorar el Directorio
            </Link>
            <Link
              href="/signup"
              className="btn border border-white/30 bg-white/10 text-white hover:bg-white/20 text-base px-6 py-3"
            >
              Crear Cuenta Gratis
            </Link>
          </div>
        </div>
      </section>

      {/* ── Tech Stack Badge ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 font-medium">
          {["Next.js 15", "React 19", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "NextAuth v5", "Cloudinary"].map(
            (tech) => (
              <span
                key={tech}
                className="bg-gray-100 px-3 py-1 rounded-full"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </section>

      {/* ── Mockup: Home / Search ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-brand-600 text-sm font-semibold uppercase tracking-wide">
                Pantalla Principal
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
                Búsqueda Inteligente
              </h2>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Los usuarios buscan por tipo de oficio, municipio o palabras
                clave. Los resultados se ordenan por calificación promedio y se
                muestran en una cuadrícula responsiva.
              </p>
              <ul className="space-y-3">
                {[
                  "Filtro por más de 30 oficios",
                  "Búsqueda por municipio o C.P.",
                  "Palabras clave en nombre o descripción",
                  "Hasta 24 resultados ordenados por rating",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-brand-600 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Search mockup */}
            <div className="card p-4 shadow-lg">
              {/* Fake browser chrome */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-gray-100 rounded text-xs text-gray-400 px-3 py-1 text-center">
                  chambapro.mx
                </div>
              </div>

              {/* Hero mini */}
              <div className="bg-gradient-to-r from-brand-700 to-brand-900 rounded-lg p-4 text-white mb-4">
                <div className="flex justify-center mb-2">
                  <div className="bg-white/10 p-2 rounded-xl">
                    <Wrench className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-center text-xs font-semibold mb-3">
                  Encuentra Profesionales de Confianza
                </p>
                {/* Search bar mock */}
                <div className="bg-white rounded-lg p-2 flex flex-col sm:flex-row gap-1.5">
                  <div className="flex items-center gap-1.5 flex-1 bg-gray-50 border border-gray-200 rounded px-2 py-1.5 text-xs text-gray-400">
                    <Briefcase className="h-3 w-3 shrink-0" />
                    Plomero
                  </div>
                  <div className="flex items-center gap-1.5 flex-1 bg-gray-50 border border-gray-200 rounded px-2 py-1.5 text-xs text-gray-400">
                    <MapPin className="h-3 w-3 shrink-0" />
                    Monterrey
                  </div>
                  <button className="bg-brand-600 text-white rounded px-3 py-1.5 text-xs font-medium flex items-center gap-1">
                    <Search className="h-3 w-3" /> Buscar
                  </button>
                </div>
              </div>

              {/* Results mini grid */}
              <div className="grid grid-cols-2 gap-2">
                {MOCK_PROS.slice(0, 2).map((pro) => (
                  <div key={pro.name} className="border border-gray-100 rounded-lg p-2.5">
                    <div className="h-1 bg-gradient-to-r from-brand-500 to-brand-700 rounded-t -mx-2.5 -mt-2.5 mb-2" />
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-7 h-7 rounded-full bg-brand-100 text-brand-700 text-xs font-bold flex items-center justify-center shrink-0">
                        {pro.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate">{pro.name}</p>
                        <span className="text-[10px] bg-brand-50 text-brand-700 px-1.5 py-0.5 rounded-full">{pro.profession}</span>
                      </div>
                    </div>
                    <StarRow rating={pro.rating} />
                    <p className="text-[10px] text-gray-400 mt-1">{pro.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mockup: Professional Profile ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile mockup */}
            <div className="card p-4 shadow-lg order-2 md:order-1">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-gray-100 rounded text-xs text-gray-400 px-3 py-1 text-center">
                  chambapro.mx/professionals/...
                </div>
              </div>

              {/* Profile header */}
              <div className="bg-gradient-to-r from-brand-700 to-brand-900 rounded-lg p-4 text-white mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-white/20 text-white text-xl font-bold flex items-center justify-center">
                    SR
                  </div>
                  <div>
                    <p className="font-bold">Sofía Ramírez</p>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Electricista</span>
                    <div className="flex items-center gap-1 mt-1">
                      <StarRow rating={4.9} />
                      <span className="text-xs font-semibold">4.9</span>
                      <span className="text-xs text-blue-200">(57 reseñas)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact buttons */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { icon: Phone, label: "Llamar", color: "bg-brand-50 text-brand-700" },
                  { icon: MessageCircle, label: "WhatsApp", color: "bg-green-50 text-green-700" },
                  { icon: Mail, label: "Email", color: "bg-purple-50 text-purple-700" },
                ].map(({ icon: Icon, label, color }) => (
                  <button key={label} className={`${color} rounded-lg py-2 text-xs font-medium flex flex-col items-center gap-1`}>
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </div>

              {/* Info */}
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                  Guadalajara, Jalisco
                </div>
                <p className="text-gray-500 text-[11px] leading-relaxed border-t pt-2">
                  Certificada por la CFE. Instalaciones eléctricas residenciales y
                  comerciales a precio justo. Presupuesto sin compromiso.
                </p>
              </div>

              {/* Review */}
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs font-semibold text-gray-700 mb-2">Reseñas</p>
                <div className="bg-gray-50 rounded-lg p-2.5 text-xs">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center text-[10px]">A</div>
                    <span className="font-medium text-gray-800">Ana G.</span>
                    <StarRow rating={5} />
                  </div>
                  <p className="text-gray-500">"Excelente trabajo, muy puntual y profesional."</p>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <span className="text-brand-600 text-sm font-semibold uppercase tracking-wide">
                Perfil del Profesional
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
                Todo lo que Necesitas Saber
              </h2>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Cada profesional tiene una página completa con su información de
                contacto, descripción de servicios, rango de precios, fotos de
                trabajos y reseñas verificadas.
              </p>
              <ul className="space-y-3">
                {[
                  "Contacto directo por teléfono, WhatsApp o email",
                  "Galería de hasta 3 fotos de trabajos",
                  "Descripción detallada y rango de precios",
                  "Reseñas verificadas con calificación 1–5",
                  "Ubicación exacta (colonia, municipio, estado)",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-brand-600 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <span className="text-brand-600 text-sm font-semibold uppercase tracking-wide">
            ¿Cómo Funciona?
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            Tres Pasos, Cero Complicaciones
          </h2>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map(({ icon: Icon, number, title, desc }) => (
            <div key={number} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-600 text-white mb-4 relative">
                <Icon className="h-7 w-7" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-brand-600 text-brand-700 text-xs font-bold flex items-center justify-center">
                  {number.replace("0", "")}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Professional Cards Grid ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-brand-600 text-sm font-semibold uppercase tracking-wide">
              Directorio de Ejemplo
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              Así Se Ven los Profesionales
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_PROS.map((pro) => (
              <div key={pro.name} className="card flex flex-col hover:shadow-md transition-shadow group">
                <div className="h-1.5 bg-gradient-to-r from-brand-500 to-brand-700 rounded-t-xl" />
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-14 h-14 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xl font-bold shrink-0">
                      {pro.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 truncate group-hover:text-brand-700 transition-colors">
                        {pro.name}
                      </h3>
                      <span className="text-xs bg-brand-50 text-brand-700 rounded-full px-2.5 py-0.5 font-medium">
                        {pro.profession}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <StarRow rating={pro.rating} />
                    <span className="text-sm font-semibold text-gray-900">{pro.rating}</span>
                    <span className="text-xs text-gray-400">({pro.reviews} reseñas)</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {pro.location}
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 flex-1 mb-4 leading-relaxed">
                    {pro.desc}
                  </p>
                  <span className="btn-primary w-full text-center text-sm opacity-60 cursor-default">
                    Ver Perfil
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-brand-600 text-sm font-semibold uppercase tracking-wide">
              Características
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              Por Qué ChambaPro
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6 hover:shadow-md transition-shadow">
                <div className="bg-brand-50 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-brand-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roles ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-brand-600 text-sm font-semibold uppercase tracking-wide">
              Dos Roles
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              Diseñado para Todos
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Customer */}
            <div className="card p-8">
              <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-5">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Para Clientes</h3>
              <ul className="space-y-2.5">
                {[
                  "Busca y compara profesionales gratis",
                  "Lee reseñas verificadas de otros clientes",
                  "Contacto directo, sin formularios",
                  "Deja tu propia reseña tras contratar",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="btn-outline mt-6 w-full justify-center">
                Crear Cuenta de Cliente
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            {/* Professional */}
            <div className="card p-8 border-brand-200 bg-brand-50/30">
              <div className="bg-brand-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-5">
                <Wrench className="h-6 w-6 text-brand-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Para Profesionales</h3>
              <ul className="space-y-2.5">
                {[
                  "Crea tu perfil y empieza a recibir clientes",
                  "Sube fotos de tus trabajos anteriores",
                  "Aparece en búsquedas de tu municipio",
                  "Gestiona tu información desde el panel",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-brand-600 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="btn-primary mt-6 w-full justify-center">
                Registrar mi Negocio
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-br from-brand-700 to-brand-900 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para Probar ChambaPro?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Explora el directorio completo o crea tu cuenta para acceder a todas
            las funciones.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn-primary text-base px-8 py-3">
              Ver Directorio
            </Link>
            <Link
              href="/signup"
              className="btn border border-white/30 bg-white/10 text-white hover:bg-white/20 text-base px-8 py-3"
            >
              Crear Cuenta Gratis
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
