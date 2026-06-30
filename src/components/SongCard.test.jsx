import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import SongCard from './SongCard'
import { useMusic } from '../context/MusicContext'

vi.mock('../context/MusicContext', () => ({
  useMusic: vi.fn(),
}))

describe('SongCard', () => {
  const song = {
    id: 1,
    titulo: 'Brisa lunar',
    artista: 'Luna Serena',
    imagen: 'https://example.com/image.jpg',
  }

  const cambiarFavorito = vi.fn()
  const onSelect = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useMusic).mockReturnValue({
      cambiarFavorito,
      esFavorito: () => false,
    })
  })

  it('renderiza el título, artista y la portada de la canción', () => {
    render(<SongCard song={song} onSelect={onSelect} />)

    expect(screen.getByText(song.titulo)).toBeInTheDocument()
    expect(screen.getByText(song.artista)).toBeInTheDocument()
    expect(screen.getByAltText(`Portada de ${song.titulo}`)).toBeInTheDocument()
  })

  it('llama a cambiarFavorito cuando se pulsa el botón de favoritos', async () => {
    const user = userEvent.setup()

    render(<SongCard song={song} onSelect={onSelect} />)

    const favoritoButton = screen.getByRole('button', {
      name: /Agregar a favoritos/i,
    })

    await user.click(favoritoButton)

    expect(cambiarFavorito).toHaveBeenCalledWith(song)
  })

  it('llama a onSelect cuando se pulsa el botón seleccionar', async () => {
    const user = userEvent.setup()

    render(<SongCard song={song} onSelect={onSelect} />)

    const seleccionarButton = screen.getByRole('button', {
      name: new RegExp(`Seleccionar ${song.titulo}`, 'i'),
    })

    await user.click(seleccionarButton)

    expect(onSelect).toHaveBeenCalledWith(song)
  })
})