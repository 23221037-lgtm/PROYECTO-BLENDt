import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Header from './Header'

describe('Header', () => {
  it('muestra el buscador y el usuario', () => {
    render(
      <Header
        busqueda=""
        onCambiarBusqueda={() => {}}
      />,
    )

    expect(
      screen.getByRole('searchbox', {
        name: 'Buscar canciones o artistas',
      }),
    ).toBeInTheDocument()

    expect(screen.getByText('Usuario')).toBeInTheDocument()
  })

  it('envia el texto escrito al componente padre', async () => {
    const user = userEvent.setup()
    const cambiarBusqueda = vi.fn()

    render(
      <Header
        busqueda=""
        onCambiarBusqueda={cambiarBusqueda}
      />,
    )

    const buscador = screen.getByRole('searchbox')
    await user.type(buscador, 'r')

    expect(cambiarBusqueda).toHaveBeenCalledWith('r')
  })
})