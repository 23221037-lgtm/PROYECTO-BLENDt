import { Play } from 'lucide-react'

function SongCard({ song }) {
  const { titulo, artista, imagen } = song

  return (
    <article className="group rounded-lg bg-zinc-800 p-4 transition hover:bg-zinc-700">
      <div className="relative aspect-square overflow-hidden rounded-md">
        <img
          src={imagen}
          alt={`Portada de ${titulo}`}
          className="h-full w-full object-cover"
        />

        <button
          className="absolute bottom-3 right-3 rounded-full bg-green-400 p-3 text-black opacity-0 shadow-lg transition group-hover:opacity-100"
          title={`Reproducir ${titulo}`}
        >
          <Play size={22} fill="currentColor" />
        </button>
      </div>

      <h3 className="mt-4 font-bold">{titulo}</h3>
      <p className="mt-1 text-sm text-gray-400">{artista}</p>
    </article>
  )
}

export default SongCard