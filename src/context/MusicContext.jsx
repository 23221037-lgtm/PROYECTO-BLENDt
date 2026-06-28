import { createContext, useContext, useEffect, useState } from 'react'

const MusicContext = createContext()

function obtenerFavoritosGuardados() {
  try {
    const guardados = localStorage.getItem('blend-favoritos')
    return guardados ? JSON.parse(guardados) : []
  } catch {
    return []
  }
}

export function MusicProvider({ children }) {
  const [favoritos, setFavoritos] = useState(obtenerFavoritosGuardados)

  useEffect(() => {
    localStorage.setItem('blend-favoritos', JSON.stringify(favoritos))
  }, [favoritos])

  const cambiarFavorito = (song) => {
    setFavoritos((actuales) => {
      const existe = actuales.some((item) => item.id === song.id)

      return existe
        ? actuales.filter((item) => item.id !== song.id)
        : [...actuales, song]
    })
  }

  const esFavorito = (id) => {
    return favoritos.some((song) => song.id === id)
  }

  return (
    <MusicContext.Provider
      value={{ favoritos, cambiarFavorito, esFavorito }}
    >
      {children}
    </MusicContext.Provider>
  )
}
// eslint-disable-next-line react-refresh/only-export-components
export function useMusic() {
  const context = useContext(MusicContext)

  if (!context) {
    throw new Error('useMusic debe utilizarse dentro de MusicProvider')
  }

  return context
}