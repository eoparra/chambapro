"use client"

import { useState, useActionState } from "react"
import Link from "next/link"
import { signUpAction } from "@/lib/actions"
import { Wrench } from "lucide-react"

export default function SignUpPage() {
  const [role, setRole] = useState<"USER" | "PROFESSIONAL">("USER")
  const [state, formAction, pending] = useActionState(signUpAction, null)

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-600 rounded-xl mb-3">
            <Wrench className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Únete a ChambaPro</h1>
          <p className="text-gray-500 text-sm mt-1">Crea tu cuenta gratuita</p>
        </div>

        <div className="card p-8">
          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {(["USER", "PROFESSIONAL"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`rounded-xl border-2 p-3 text-center transition-all ${
                  role === r
                    ? "border-brand-600 bg-brand-50 text-brand-700"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                <div className="text-2xl mb-1">
                  {r === "USER" ? "👤" : "🔧"}
                </div>
                <div className="font-medium text-sm">
                  {r === "USER" ? "Necesito un servicio" : "Soy profesional"}
                </div>
              </button>
            ))}
          </div>

          <form action={formAction} className="space-y-4">
            <input type="hidden" name="role" value={role} />

            {state?.error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                {state.error}
              </p>
            )}

            <div>
              <label className="label">Nombre completo</label>
              <input
                name="name"
                type="text"
                className="input"
                placeholder="Juan Pérez"
                required
              />
            </div>
            <div>
              <label className="label">Correo electrónico</label>
              <input
                name="email"
                type="email"
                className="input"
                placeholder="tu@ejemplo.com"
                required
              />
            </div>
            <div>
              <label className="label">Contraseña</label>
              <input
                name="password"
                type="password"
                className="input"
                placeholder="Mínimo 6 caracteres"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="btn-primary w-full"
            >
              {pending ? "Creando cuenta…" : "Crear Cuenta"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/signin"
              className="text-brand-600 font-medium hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
