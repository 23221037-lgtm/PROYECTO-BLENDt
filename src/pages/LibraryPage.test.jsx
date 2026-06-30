import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import LibraryPage from './LibraryPage'
import { useMusic } from '../context/MusicContext'

vi.mock('../context/MusicContext', () => ({
  useMusic: vi.fn(),
}))

describe('LibraryPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useMusic).mockReturnValue({
      favoritos: [],
      cambiarFavorito: vi.fn(),
      esFavorito: vi.fn().mockReturnValue(false),
    })
  })

  it('muestra un mensaje cuando la biblioteca está vacía', () => {
    render(<LibraryPage onSelectSong={vi.fn()} />)

    expect(screen.getByText(/Tu biblioteca todavía está vacía/i)).toBeInTheDocument()
  })

  it('muestra las canciones favoritas cuando existen', () => {
    const favoritos = [
      {
        id: 1,
        titulo: 'Caminos de arena',
        artista: 'Olas del Desierto',
        imagen: 'https://example.com/image-1.jpg',
      },
      {
        id: 2,
        titulo: 'Brisa lunar',
        artista: 'Luna Serena',
        imagen: 'https://example.com/image-2.jpg',
      },
    ]

    vi.mocked(useMusic).mockReturnValue({
      favoritos,
      cambiarFavorito: vi.fn(),
      esFavorito: vi.fn().mockReturnValue(false),
    })

    render(<LibraryPage onSelectSong={vi.fn()} />)

    expect(screen.getByText('Caminos de arena')).toBeInTheDocument()
    expect(screen.getByText('Brisa lunar')).toBeInTheDocument()
  })
})