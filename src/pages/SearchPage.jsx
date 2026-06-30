import SongCard from '../components/SongCard'
import { useMusic } from '../context/MusicContext'

function SearchPage({ busqueda, onSelectSong }) {
  const { canciones, cargando, error } = useMusic()
  const texto = busqueda.trim()

  const normalizar = (valor = '') =>
    valor.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

  const textoNormalizado = normalizar(texto)

  const resultados = canciones.filter((song) => {
    const valores = [song.titulo, song.artista, song.genero, song.album]
      .filter(Boolean)
      .join(' ')

    return normalizar(valores).includes(textoNormalizado)
  })

  if (cargando) {
    return <p className="text-gray-400">Cargando canciones...</p>
  }

  if (error) {
    return <p className="text-red-400">{error}</p>
  }

  return (
    <section>
      <h2 className="text-3xl font-bold">Buscar</h2>

      {!texto ? (
        <p className="mt-4 text-gray-400">
          Escribe título, artista, género o álbum.
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
