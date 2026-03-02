import { PrismaClient, Role } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

const SEED_PROFESSIONALS = [
  {
    name: "Carlos Hernández",
    profession: "Plomero",
    municipio: "Guadalajara",
    estado: "Jalisco",
    colonia: "Americana",
    codigoPostal: "44160",
    phone: "+52 33 1234 5601",
    whatsapp: "+52 33 1234 5601",
    description:
      "Plomero certificado con más de 15 años de experiencia. Especialista en instalaciones residenciales y comerciales, destape de drenajes, instalación de calentadores y reparación de tuberías. Disponible para emergencias las 24 horas. Trabajo garantizado y con factura.",
    pricing: "Desde $300 MXN · Diagnóstico gratis",
    avgRating: 4.8,
  },
  {
    name: "Ana Lucía Ramírez",
    profession: "Electricista",
    municipio: "Zapopan",
    estado: "Jalisco",
    colonia: "Providencia",
    codigoPostal: "45040",
    phone: "+52 33 1234 5602",
    whatsapp: "+52 33 1234 5602",
    description:
      "Electricista certificada con experiencia en instalaciones eléctricas residenciales e industriales, centros de carga, iluminación LED, y sistemas de tierra física. Más de 10 años sirviendo a la zona metropolitana de Guadalajara. Trabajo limpio y garantizado.",
    pricing: "Desde $400 MXN por visita",
    avgRating: 4.9,
  },
  {
    name: "Roberto Díaz Moreno",
    profession: "Pintor",
    municipio: "Tlaquepaque",
    estado: "Jalisco",
    colonia: "Centro",
    codigoPostal: "45500",
    phone: "+52 33 1234 5603",
    whatsapp: "+52 33 1234 5603",
    description:
      "Pintor profesional de interiores y exteriores con más de 12 años de experiencia. Trabajo con materiales de primera calidad, ofrezco asesoría de color gratuita. Especialista en acabados decorativos, pintura de muebles y remodelaciones completas.",
    pricing: "Desde $1,500 MXN por habitación",
    avgRating: 4.7,
  },
  {
    name: "Miguel Ángel Torres",
    profession: "Albañil",
    municipio: "Tonalá",
    estado: "Jalisco",
    colonia: "El Rosario",
    codigoPostal: "45400",
    phone: "+52 33 1234 5604",
    whatsapp: "+52 33 1234 5604",
    description:
      "Albañil con amplia experiencia en construcción y remodelación. Levantamiento de muros, firmes, aplanados, instalación de pisos y azulejos, impermeabilización y trabajos en general. Presupuestos sin compromiso. Trabajo limpio y puntual.",
    pricing: "Desde $500 MXN por día · Presupuesto sin costo",
    avgRating: 4.6,
  },
  {
    name: "Laura Mendoza García",
    profession: "Carpintero",
    municipio: "Tlajomulco de Zúñiga",
    estado: "Jalisco",
    colonia: "Valle de los Molinos",
    codigoPostal: "45640",
    phone: "+52 33 1234 5605",
    whatsapp: "+52 33 1234 5605",
    description:
      "Carpintería a la medida: cocinas integrales, closets, muebles de baño, puertas y pisos de madera. 18 años de experiencia. Trabajo directamente con el cliente para crear diseños funcionales y dentro de presupuesto. Entrega puntual garantizada.",
    pricing: "Cotización por proyecto",
    avgRating: 4.9,
  },
  {
    name: "Fernando Gutiérrez Rivas",
    profession: "Técnico en Refrigeración",
    municipio: "Chapala",
    estado: "Jalisco",
    colonia: "Centro",
    codigoPostal: "45900",
    phone: "+52 33 1234 5606",
    whatsapp: "+52 33 1234 5606",
    description:
      "Técnico certificado en refrigeración y aire acondicionado. Reparación, mantenimiento y instalación de minisplits, aire central y refrigeradores comerciales. Servicio el mismo día en la mayoría de los casos. Precios transparentes, sin cargos ocultos.",
    pricing: "Desde $350 MXN · Diagnóstico: $200 MXN",
    avgRating: 4.5,
  },
]

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-") +
    "-" +
    Math.random().toString(36).slice(2, 7)
  )
}

async function main() {
  console.log("🌱 Sembrando base de datos...")

  const reviewer = await prisma.user.upsert({
    where: { email: "usuario@chambapro.com" },
    update: {},
    create: {
      name: "María López",
      email: "usuario@chambapro.com",
      password: await bcrypt.hash("usuario123", 12),
      role: Role.USER,
    },
  })

  for (const data of SEED_PROFESSIONALS) {
    const email = `${data.name.split(" ")[0].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}@chambapro.com`

    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        name: data.name,
        email,
        password: await bcrypt.hash("pro123", 12),
        role: Role.PROFESSIONAL,
      },
    })

    const existing = await prisma.professional.findUnique({
      where: { userId: user.id },
    })

    const pro = existing
      ? await prisma.professional.update({
          where: { userId: user.id },
          data: { avgRating: data.avgRating },
        })
      : await prisma.professional.create({
          data: {
            userId: user.id,
            name: data.name,
            slug: slugify(data.name),
            profession: data.profession,
            municipio: data.municipio,
            estado: data.estado,
            colonia: data.colonia,
            codigoPostal: data.codigoPostal,
            phone: data.phone,
            whatsapp: data.whatsapp,
            email,
            description: data.description,
            pricing: data.pricing,
            photos: [],
            avgRating: data.avgRating,
            reviewCount: 2,
          },
        })

    const sampleReviews = [
      {
        rating: 5,
        comment:
          "Excelente trabajo, muy puntual y profesional. Sin duda lo volvería a contratar. Todo quedó perfecto.",
      },
      {
        rating: Math.max(1, Math.round(data.avgRating) - (Math.random() > 0.5 ? 0 : 1)),
        comment:
          "Buen trabajo a precio justo. Explicó todo con claridad y dejó todo limpio. Muy recomendable.",
      },
    ]

    for (const r of sampleReviews) {
      await prisma.review.upsert({
        where: {
          userId_professionalId: {
            userId: reviewer.id,
            professionalId: pro.id,
          },
        },
        update: {},
        create: {
          rating: r.rating,
          comment: r.comment,
          userId: reviewer.id,
          professionalId: pro.id,
        },
      })
    }
  }

  console.log("✅ ¡Datos sembrados exitosamente!")
  console.log("")
  console.log("📋 Cuentas de prueba:")
  console.log("   Usuario:       usuario@chambapro.com  /  usuario123")
  console.log("   Profesional:   carlos@chambapro.com   /  pro123")
  console.log("   (cualquier correo de profesional funciona con pro123)")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
