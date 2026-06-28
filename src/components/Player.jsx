function Player({ song }) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-20 flex items-center gap-4 border-t border-zinc-700 bg-zinc-950 px-4 py-3 text-white">
      <img
        src={song.imagen}
        alt={`Portada de ${song.titulo}`}
        className="h-16 w-16 rounded object-cover"
      />

      <div className="min-w-0 w-40">
        <h3 className="truncate font-semibold">{song.titulo}</h3>
        <p className="truncate text-sm text-gray-400">{song.artista}</p>
      </div>

      <audio
        key={song.id}
        controls
        src={song.audio}
        className="mx-auto w-full max-w-xl"
      >
        Tu navegador no permite reproducir audio.
      </audio>
    </footer>
  )
}

export default Player