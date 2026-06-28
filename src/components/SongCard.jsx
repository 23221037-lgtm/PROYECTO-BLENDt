import { Heart, Play } from 'lucide-react'
import { useMusic } from '../context/MusicContext'

function SongCard({ song, onSelect }) {
  const { titulo, artista, imagen } = song
  const { cambiarFavorito, esFavorito } = useMusic()
  const favorito = esFavorito(song.id)

  return (
    <article className="group rounded-lg bg-zinc-800 p-4 transition hover:bg-zinc-700">
      <div className="relative aspect-square overflow-hidden rounded-md">
        <img
          src={imagen}
          alt={`Portada de ${titulo}`}
          className="h-full w-full object-cover"
        />

        <button
          onClick={() => cambiarFavorito(song)}
          className="absolute right-3 top-3 rounded-full bg-black/80 p-2"
          title={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <Heart
            size={20}
            className={favorito ? 'text-green-400' : 'text-white'}
            fill={favorito ? 'currentColor' : 'none'}
          />
        </button>

        <button
          onClick={() => onSelect(song)}
          className="absolute bottom-3 right-3 rounded-full bg-green-400 p-3 text-black opacity-0 shadow-lg transition group-hover:opacity-100"
          title={`Seleccionar ${titulo}`}
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