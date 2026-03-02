"use client"

import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { X, Upload } from "lucide-react"

interface Props {
  photos: string[]
  onChange: (photos: string[]) => void
  maxPhotos?: number
}

export default function ImageUpload({
  photos,
  onChange,
  maxPhotos = 3,
}: Props) {
  function remove(url: string) {
    onChange(photos.filter((p) => p !== url))
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-2">
        {photos.map((url) => (
          <div
            key={url}
            className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
          >
            <Image src={url} alt="Foto subida" fill className="object-cover" />
            <button
              type="button"
              onClick={() => remove(url)}
              className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow-sm text-gray-600 hover:text-red-600 transition-colors"
              aria-label="Eliminar foto"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {photos.length < maxPhotos && (
          <CldUploadWidget
            uploadPreset={
              process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ??
              "chambapro_unsigned"
            }
            options={{ maxFiles: maxPhotos - photos.length }}
            onSuccess={(result) => {
              if (
                result.info &&
                typeof result.info === "object" &&
                "secure_url" in result.info
              ) {
                onChange([...photos, result.info.secure_url as string])
              }
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-brand-400 hover:text-brand-600 transition-colors"
              >
                <Upload className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Agregar foto</span>
              </button>
            )}
          </CldUploadWidget>
        )}
      </div>
      <p className="text-xs text-gray-400">
        Hasta {maxPhotos} fotos · Recomendado: 800×600px o mayor
      </p>
    </div>
  )
}
