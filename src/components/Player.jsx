import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  Shuffle,
  Repeat,
  Volume2,
} from 'lucide-react'
import { useMusic } from '../context/MusicContext'

function formatTime(seconds) {
  if (!seconds || Number.isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function Player({ song, onSelectSong }) {
  const { canciones } = useMusic()
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)

  const trackIndex = useMemo(
    () => canciones.findIndex((item) => item.id === song.id),
    [canciones, song.id]
  )

  const hasNext = trackIndex < canciones.length - 1
  const hasPrev = trackIndex > 0

  const handleNext = useCallback(() => {
    if (!onSelectSong) return
    if (shuffle) {
      const nextIndex = Math.floor(Math.random() * canciones.length)
      onSelectSong(canciones[nextIndex])
      return
    }

    if (hasNext) {
      onSelectSong(canciones[trackIndex + 1])
    } else {
      setIsPlaying(false)
    }
  }, [canciones, hasNext, onSelectSong, shuffle, trackIndex])

  const handlePrev = useCallback(() => {
    if (!onSelectSong) return
    if (shuffle) {
      const prevIndex = Math.floor(Math.random() * canciones.length)
      onSelectSong(canciones[prevIndex])
      return
    }

    if (hasPrev) {
      onSelectSong(canciones[trackIndex - 1])
    }
  }, [canciones, hasPrev, onSelectSong, shuffle, trackIndex])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      setCurrentTime(audio.currentTime)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      if (repeat) {
        audio.currentTime = 0
        audio.play().catch(() => setIsPlaying(false))
      } else {
        handleNext()
      }
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [repeat, handleNext])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false))
    } else {
      audio.pause()
    }
  }, [isPlaying, song])

  useEffect(() => {
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
  }, [song])

  const togglePlay = () => {
    setIsPlaying((prev) => !prev)
  }

  const seek = (value) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = value
    setCurrentTime(value)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
  }, [volume])

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-20 border-t border-zinc-700 bg-zinc-950 px-4 py-3 text-white">
      <div className="relative flex flex-col gap-3 min-h-[96px] items-center sm:flex-row sm:items-center">
        <div className="flex w-full min-w-0 items-center gap-3 sm:absolute sm:left-4 sm:top-1/2 sm:-translate-y-1/2">
          <img
            src={song.imagen}
            alt={`Portada de ${song.titulo}`}
            className="h-14 w-14 rounded object-cover"
          />
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-white">{song.titulo}</h3>
            <p className="truncate text-sm text-gray-400">{song.artista}</p>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[520px] flex-col items-center gap-3 sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
          <div className="flex items-center justify-center gap-4 text-white">
            <button
              type="button"
              onClick={() => setShuffle((prev) => !prev)}
              className={`rounded-full p-3 transition ${shuffle ? 'bg-green-400 text-black' : 'bg-zinc-800 hover:bg-zinc-700'}`}
              title="Shuffle"
            >
              <Shuffle size={18} />
            </button>
            <button
              type="button"
              onClick={handlePrev}
              className="rounded-full bg-zinc-800 p-3 transition hover:bg-zinc-700"
              title="Anterior"
              disabled={!hasPrev && !shuffle}
            >
              <ArrowLeft size={20} />
            </button>
            <button
              type="button"
              onClick={togglePlay}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:scale-105"
              title={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="rounded-full bg-zinc-800 p-3 transition hover:bg-zinc-700"
              title="Siguiente"
              disabled={!hasNext && !shuffle}
            >
              <ArrowRight size={20} />
            </button>
            <button
              type="button"
              onClick={() => setRepeat((prev) => !prev)}
              className={`rounded-full p-3 transition ${repeat ? 'bg-green-400 text-black' : 'bg-zinc-800 hover:bg-zinc-700'}`}
              title="Repetir"
            >
              <Repeat size={18} />
            </button>
          </div>

          <div className="flex w-full items-center justify-center gap-3 text-[10px] text-gray-400 sm:max-w-3xl sm:mx-auto">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={currentTime}
              onChange={(event) => seek(Number(event.target.value))}
              aria-label="Barra de progreso"
              className="flex-1 h-1 cursor-pointer appearance-none rounded-full bg-zinc-800 accent-green-400"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:absolute sm:right-4 sm:top-1/2 sm:-translate-y-1/2">
          <Volume2 size={18} className="text-gray-300" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            aria-label="Control de volumen"
            className="h-1 w-28 cursor-pointer appearance-none rounded-full bg-zinc-800 accent-green-400"
          />
          <span className="text-xs text-gray-400">{Math.round(volume * 100)}%</span>
        </div>
      </div>

      <audio ref={audioRef} src={song.audio} preload="metadata" />
    </footer>
  )
}

export default Player