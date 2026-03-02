"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
  rating: number
  size?: "sm" | "md" | "lg"
  interactive?: boolean
  onChange?: (rating: number) => void
}

const sizes = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-6 w-6",
}

export default function StarRating({
  rating,
  size = "md",
  interactive,
  onChange,
}: Props) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? "button" : "button"}
          onClick={interactive && onChange ? () => onChange(star) : undefined}
          className={cn(
            "transition-transform",
            interactive
              ? "cursor-pointer hover:scale-110"
              : "cursor-default pointer-events-none"
          )}
          aria-label={interactive ? `Rate ${star} star${star !== 1 ? "s" : ""}` : undefined}
          tabIndex={interactive ? 0 : -1}
        >
          <Star
            className={cn(
              sizes[size],
              star <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-200"
            )}
          />
        </button>
      ))}
    </div>
  )
}
