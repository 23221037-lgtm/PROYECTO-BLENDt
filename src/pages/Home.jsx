import SongCard from '../components/SongCard'
import { songs } from '../data/songs'

function Home({ onSelectSong }) {
  return (
    <section>
      <h2 className="text-3xl font-bold">Buenas tardes</h2>
      <p className="mt-2 text-gray-400">
        Descubre música seleccionada para ti.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {songs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            onSelect={onSelectSong}
          />
        ))}
      </div>
    </section>
  )
}

export default Home