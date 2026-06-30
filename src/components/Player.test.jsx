import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Player from './Player'
import { useMusic } from '../context/MusicContext'

vi.mock('../context/MusicContext', () => ({
  useMusic: vi.fn(),
}))

describe('Player', () => {
  const song = {
    id: 1,
    titulo: 'Pulso urbano',
    artista: 'Metro Ritmo',
    imagen: 'https://example.com/image.jpg',
    audio: 'https://example.com/audio.mp3',
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useMusic).mockReturnValue({
      canciones: [song],
    })

    Object.defineProperty(HTMLMediaElement.prototype, 'play', {
      configurable: true,
      value: vi.fn().mockResolvedValue(),
    })

    Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
      configurable: true,
      value: vi.fn(),
    })
  })

  it('muestra el título y el artista de la canción', () => {
    render(<Player song={song} onSelectSong={vi.fn()} />)

    expect(screen.getByText(song.titulo)).toBeInTheDocument()
    expect(screen.getByText(song.artista)).toBeInTheDocument()
  })

  it('reproduce audio cuando se pulsa play y cambia a pausar', async () => {
    const playMock = vi.spyOn(HTMLMediaElement.prototype, 'play')

    render(<Player song={song} onSelectSong={vi.fn()} />)

    const playButton = screen.getByTitle(/Reproducir/i)
    fireEvent.click(playButton)

    await waitFor(() => expect(playMock).toHaveBeenCalled())
    expect(screen.getByTitle(/Pausar/i)).toBeInTheDocument()
  })

  it('ajusta el volumen y muestra el porcentaje', () => {
    render(<Player song={song} onSelectSong={vi.fn()} />)

    const volumeSlider = screen.getByLabelText(/Control de volumen/i)
    fireEvent.change(volumeSlider, { target: { value: '1' } })

    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('actualiza el tiempo actual cuando cambia la posición del audio', async () => {
    const { container } = render(<Player song={song} onSelectSong={vi.fn()} />)
    const audio = container.querySelector('audio')

    if (audio) {
      Object.defineProperty(audio, 'currentTime', {
        value: 10,
        configurable: true,
      })
      fireEvent(audio, new Event('timeupdate'))
    }

    await waitFor(() => expect(screen.getByText('0:10')).toBeInTheDocument())
  })
})