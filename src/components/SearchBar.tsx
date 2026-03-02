"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search, MapPin } from "lucide-react"
import { PROFESSIONS } from "@/lib/constants"

interface Props {
  initialValues?: {
    profession?: string
    municipio?: string
    q?: string
  }
}

export default function SearchBar({ initialValues }: Props) {
  const router = useRouter()
  const [profession, setProfession] = useState(initialValues?.profession ?? "")
  const [municipio, setMunicipio] = useState(initialValues?.municipio ?? "")
  const [q, setQ] = useState(initialValues?.q ?? "")

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (profession) params.set("profession", profession)
    if (municipio) params.set("municipio", municipio)
    if (q) params.set("q", q)
    router.push(`/?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white rounded-2xl p-2 flex flex-col md:flex-row gap-2 shadow-xl max-w-3xl mx-auto"
    >
      {/* Profession */}
      <select
        value={profession}
        onChange={(e) => setProfession(e.target.value)}
        className="flex-1 px-4 py-3 text-gray-700 bg-transparent border-0 focus:outline-none focus:ring-0 text-sm rounded-xl hover:bg-gray-50 cursor-pointer"
      >
        <option value="">Todos los oficios</option>
        {PROFESSIONS.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <div className="hidden md:block w-px bg-gray-200 my-2" />

      {/* Municipio */}
      <div className="flex items-center flex-1 px-4 gap-2 hover:bg-gray-50 rounded-xl">
        <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Municipio o código postal"
          value={municipio}
          onChange={(e) => setMunicipio(e.target.value)}
          className="w-full py-3 bg-transparent border-0 focus:outline-none focus:ring-0 text-sm text-gray-700 placeholder:text-gray-400"
        />
      </div>

      <div className="hidden md:block w-px bg-gray-200 my-2" />

      {/* Keywords */}
      <div className="flex items-center flex-1 px-4 gap-2 hover:bg-gray-50 rounded-xl">
        <Search className="h-4 w-4 text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Palabras clave…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full py-3 bg-transparent border-0 focus:outline-none focus:ring-0 text-sm text-gray-700 placeholder:text-gray-400"
        />
      </div>

      <button type="submit" className="btn-primary px-6 py-3 rounded-xl shrink-0">
        <Search className="h-4 w-4 md:hidden" />
        <span className="hidden md:inline">Buscar</span>
      </button>
    </form>
  )
}
