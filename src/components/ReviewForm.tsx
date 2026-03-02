"use client"

import { useActionState, useState } from "react"
import { createReviewAction } from "@/lib/actions"
import StarRating from "./StarRating"

export default function ReviewForm({
  professionalId,
}: {
  professionalId: string
}) {
  const [rating, setRating] = useState(0)
  const boundAction = createReviewAction.bind(null, professionalId)
  const [state, formAction, pending] = useActionState(boundAction, null)

  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-3">Dejar una Reseña</h3>
      <form action={formAction} className="space-y-3">
        <input type="hidden" name="rating" value={rating} />

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

        <div>
          <label className="label">Tu Calificación</label>
          <StarRating rating={rating} size="lg" interactive onChange={setRating} />
          {rating === 0 && (
            <p className="text-xs text-gray-400 mt-1">Haz clic en una estrella</p>
          )}
        </div>

        <div>
          <label className="label">Comentario</label>
          <textarea
            name="comment"
            rows={3}
            className="input resize-none"
            placeholder="Describe tu experiencia…"
            required
            minLength={10}
          />
        </div>

        <button
          type="submit"
          disabled={pending || rating === 0}
          className="btn-primary"
        >
          {pending ? "Enviando…" : "Publicar Reseña"}
        </button>
      </form>
    </div>
  )
}
