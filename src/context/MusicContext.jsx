
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
  const [canciones, setCanciones] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [favoritos, setFavoritos] = useState(obtenerFavoritosGuardados)

  useEffect(() => {
    async function cargarCanciones() {
      try {
        setCargando(true)

        const respuesta = await fetch('/data/canciones.json')

        if (!respuesta.ok) {
          throw new Error(`Error HTTP: ${respuesta.status}`)
        }

        const datos = await respuesta.json()
        setCanciones(datos)
      } catch (errorCapturado) {
        setError(`No se pudieron cargar las canciones: ${errorCapturado.message}`)
      } finally {
        setCargando(false)
      }
    }

    cargarCanciones()
  }, [])

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
      value={{
        canciones,
        cargando,
        error,
        favoritos,
        cambiarFavorito,
        esFavorito,
      }}
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