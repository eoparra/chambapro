"use client"

import { useActionState, useState } from "react"
import { upsertProfessionalAction } from "@/lib/actions"
import { PROFESSIONS, ESTADOS_MEXICO } from "@/lib/constants"
import ImageUpload from "./ImageUpload"
import type { Professional } from "@prisma/client"

export default function ProfileForm({
  professional,
}: {
  professional: Professional | null
}) {
  const [photos, setPhotos] = useState<string[]>(professional?.photos ?? [])
  const [state, formAction, pending] = useActionState(
    upsertProfessionalAction,
    null
  )

  return (
    <form action={formAction} className="card p-8 space-y-5">
      <input type="hidden" name="photos" value={JSON.stringify(photos)} />

      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}
      {state?.success && (
        <p className="text-sm text-green-600 bg-green-50 rounded-lg px-3 py-2">
          {state.success}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="label">
            Nombre Completo <span className="text-red-400">*</span>
          </label>
          <input
            name="name"
            type="text"
            className="input"
            defaultValue={professional?.name ?? ""}
            placeholder="Juan Pérez"
            required
          />
        </div>

        <div>
          <label className="label">
            Oficio <span className="text-red-400">*</span>
          </label>
          <select
            name="profession"
            className="input"
            defaultValue={professional?.profession ?? ""}
            required
          >
            <option value="">Selecciona un oficio…</option>
            {PROFESSIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">
            Estado <span className="text-red-400">*</span>
          </label>
          <select
            name="estado"
            className="input"
            defaultValue={professional?.estado ?? ""}
            required
          >
            <option value="">Selecciona un estado…</option>
            {ESTADOS_MEXICO.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">
            Municipio/Delegación <span className="text-red-400">*</span>
          </label>
          <input
            name="municipio"
            type="text"
            className="input"
            defaultValue={professional?.municipio ?? ""}
            placeholder="Guadalajara"
            required
          />
        </div>

        <div>
          <label className="label">Colonia</label>
          <input
            name="colonia"
            type="text"
            className="input"
            defaultValue={professional?.colonia ?? ""}
            placeholder="Americana"
          />
        </div>

        <div>
          <label className="label">Código Postal</label>
          <input
            name="codigoPostal"
            type="text"
            className="input"
            defaultValue={professional?.codigoPostal ?? ""}
            placeholder="44160"
            maxLength={5}
          />
        </div>

        <div>
          <label className="label">Teléfono (+52)</label>
          <input
            name="phone"
            type="tel"
            className="input"
            defaultValue={professional?.phone ?? ""}
            placeholder="+52 33 1234 5678"
          />
        </div>

        <div>
          <label className="label">WhatsApp (opcional)</label>
          <input
            name="whatsapp"
            type="tel"
            className="input"
            defaultValue={professional?.whatsapp ?? ""}
            placeholder="+52 33 1234 5678"
          />
        </div>

        <div>
          <label className="label">Rango de Precios</label>
          <input
            name="pricing"
            type="text"
            className="input"
            defaultValue={professional?.pricing ?? ""}
            placeholder="Ej: Desde $300 MXN"
          />
        </div>
      </div>

      <div>
        <label className="label">
          Descripción <span className="text-red-400">*</span>
        </label>
        <textarea
          name="description"
          rows={5}
          className="input resize-none"
          defaultValue={professional?.description ?? ""}
          placeholder="Describe tus servicios, experiencia y qué te hace destacar…"
          required
          minLength={50}
        />
        <p className="text-xs text-gray-400 mt-1">Mínimo 50 caracteres.</p>
      </div>

      <div>
        <label className="label">Fotos</label>
        <ImageUpload photos={photos} onChange={setPhotos} maxPhotos={3} />
      </div>

      <div className="pt-2 border-t border-gray-100">
        <button type="submit" disabled={pending} className="btn-primary px-8">
          {pending
            ? "Guardando…"
            : professional
            ? "Guardar Cambios"
            : "Crear Perfil"}
        </button>
      </div>
    </form>
  )
}
