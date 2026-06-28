import SongCard from '../components/SongCard'
import { songs } from '../data/songs'

function SearchPage({ busqueda, onSelectSong }) {
  const texto = busqueda.trim().toLowerCase()

  const resultados = songs.filter((song) =>
    `${song.titulo} ${song.artista}`.toLowerCase().includes(texto)
  )

  return (
    <section>
      <h2 className="text-3xl font-bold">Buscar</h2>

      {!texto ? (
        <p className="mt-4 text-gray-400">
          Escribe el nombre de una canción o artista.
        </p>
      ) : resultados.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {resultados.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onSelect={onSelectSong}
            />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-gray-400">
          No se encontraron resultados.
        </p>
      )}
    </section>
  )
}

export default SearchPage