import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import SearchPage from './SearchPage'
import { useMusic } from '../context/MusicContext'

vi.mock('../context/MusicContext', () => ({
  useMusic: vi.fn(),
}))

vi.mock('../components/SongCard', () => ({
  __esModule: true,
  default: ({ song }) => <div data-testid="song-card">{song.titulo}</div>,
}))

describe('SearchPage', () => {
  const canciones = [
    {
      id: 1,
      titulo: 'Noches de neón',
      artista: 'Ciudad Brillante',
      genero: 'Pop',
      album: 'Luces y Sombras',
    },
    {
      id: 2,
      titulo: 'Brisa lunar',
      artista: 'Luna Serena',
      genero: 'Ambient',
      album: 'Cantos de Luna',
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useMusic).mockReturnValue({
      canciones,
      cargando: false,
      error: '',
    })
  })

  it('muestra un mensaje inicial cuando no hay búsqueda', () => {
    render(<SearchPage busqueda="" onSelectSong={vi.fn()} />)

    expect(screen.getByText(/Escribe título, artista, género o álbum./i)).toBeInTheDocument()
  })

  it('muestra resultados de búsqueda y normaliza acentos', () => {
    render(<SearchPage busqueda="neon" onSelectSong={vi.fn()} />)

    expect(screen.getAllByTestId('song-card')).toHaveLength(1)
    expect(screen.getByText('Noches de neón')).toBeInTheDocument()
  })

  it('muestra mensaje de sin resultados cuando no hay coincidencias', () => {
    render(<SearchPage busqueda="xyz" onSelectSong={vi.fn()} />)

    expect(screen.getByText(/No se encontraron resultados/i)).toBeInTheDocument()
  })
})