import { Library } from 'lucide-react'
import SongCard from '../components/SongCard'
import { useMusic } from '../context/MusicContext'

function LibraryPage({ onSelectSong }) {
  const { favoritos } = useMusic()

  return (
    <section>
      <h2 className="text-3xl font-bold">Tu biblioteca</h2>

      {favoritos.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favoritos.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onSelect={onSelectSong}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 text-center text-gray-400">
          <Library size={48} className="mx-auto mb-4" />
          <p>Tu biblioteca todavía está vacía.</p>
        </div>
      )}
    </section>
  )
}

export default LibraryPage