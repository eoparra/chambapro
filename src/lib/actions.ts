"use server"

import { prisma } from "@/lib/prisma"
import { auth, signIn } from "@/lib/auth"
import { revalidatePath } from "next/cache"

// ── Auth ─────────────────────────────────────────────────────────────────────

export async function signUpAction(prevState: unknown, formData: FormData) {
  const bcrypt = await import("bcryptjs")

  const name = (formData.get("name") as string)?.trim()
  const email = (formData.get("email") as string)?.trim().toLowerCase()
  const password = formData.get("password") as string
  const role =
    (formData.get("role") as string) === "PROFESSIONAL"
      ? "PROFESSIONAL"
      : "USER"

  if (!name || !email || !password || password.length < 6) {
    return {
      error:
        "Todos los campos son obligatorios. La contraseña debe tener al menos 6 caracteres.",
    }
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return { error: "Ya existe una cuenta con este correo electrónico." }

  const hashed = await bcrypt.hash(password, 12)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role: role as "USER" | "PROFESSIONAL",
    },
  })

  await signIn("credentials", {
    email,
    password,
    redirectTo: role === "PROFESSIONAL" ? "/dashboard" : "/",
  })
}

// ── Professional Profile ─────────────────────────────────────────────────────

export async function upsertProfessionalAction(
  prevState: unknown,
  formData: FormData
) {
  const session = await auth()
  if (!session?.user?.id || session.user.role !== "PROFESSIONAL") {
    return { error: "No autorizado" }
  }

  const name = (formData.get("name") as string)?.trim()
  const profession = formData.get("profession") as string
  const municipio = (formData.get("municipio") as string)?.trim()
  const estado = (formData.get("estado") as string)?.trim()
  const colonia = (formData.get("colonia") as string)?.trim() ?? ""
  const codigoPostal = (formData.get("codigoPostal") as string)?.trim() ?? ""
  const phone = (formData.get("phone") as string)?.trim() ?? ""
  const whatsapp = (formData.get("whatsapp") as string)?.trim() ?? ""
  const description = (formData.get("description") as string)?.trim()
  const pricing = (formData.get("pricing") as string)?.trim() ?? ""
  const photosRaw = formData.get("photos") as string
  const photos: string[] = photosRaw ? JSON.parse(photosRaw) : []

  if (!name || !profession || !municipio || !estado || !description) {
    return { error: "Por favor completa todos los campos obligatorios." }
  }

  const existing = await prisma.professional.findUnique({
    where: { userId: session.user.id },
  })

  if (existing) {
    await prisma.professional.update({
      where: { userId: session.user.id },
      data: { name, profession, municipio, estado, colonia, codigoPostal, phone, whatsapp, description, pricing, photos },
    })
  } else {
    const base = name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-")
    const slug = `${base}-${Date.now().toString(36)}`

    await prisma.professional.create({
      data: {
        userId: session.user.id,
        name,
        slug,
        profession,
        municipio,
        estado,
        colonia,
        codigoPostal,
        phone,
        whatsapp,
        email: session.user.email!,
        description,
        pricing,
        photos,
      },
    })
  }

  revalidatePath("/dashboard")
  revalidatePath("/")
  return { success: "¡Perfil guardado exitosamente!" }
}

// ── Reviews ──────────────────────────────────────────────────────────────────

export async function createReviewAction(
  professionalId: string,
  prevState: unknown,
  formData: FormData
) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "Debes iniciar sesión para dejar una reseña." }
  }

  const rating = parseInt(formData.get("rating") as string, 10)
  const comment = (formData.get("comment") as string)?.trim()

  if (!rating || rating < 1 || rating > 5) {
    return { error: "Por favor selecciona una calificación." }
  }
  if (!comment || comment.length < 10) {
    return { error: "El comentario debe tener al menos 10 caracteres." }
  }

  const existing = await prisma.review.findUnique({
    where: {
      userId_professionalId: {
        userId: session.user.id,
        professionalId,
      },
    },
  })
  if (existing) {
    return { error: "Ya has reseñado a este profesional." }
  }

  const pro = await prisma.professional.findUnique({
    where: { id: professionalId },
  })
  if (pro?.userId === session.user.id) {
    return { error: "No puedes reseñar tu propio perfil." }
  }

  await prisma.review.create({
    data: { rating, comment, userId: session.user.id, professionalId },
  })

  const all = await prisma.review.findMany({
    where: { professionalId },
    select: { rating: true },
  })
  const avg = all.reduce((s, r) => s + r.rating, 0) / all.length

  await prisma.professional.update({
    where: { id: professionalId },
    data: {
      avgRating: Math.round(avg * 10) / 10,
      reviewCount: all.length,
    },
  })

  revalidatePath(`/professionals/${professionalId}`)
  return { success: "¡Reseña publicada!" }
}
