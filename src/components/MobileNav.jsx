import { Home, Library, Search } from 'lucide-react'
import { NavLink } from 'react-router-dom'

function MobileNav() {
  const opciones = [
    { nombre: 'Inicio', icono: Home, ruta: '/' },
    { nombre: 'Buscar', icono: Search, ruta: '/buscar' },
    { nombre: 'Biblioteca', icono: Library, ruta: '/biblioteca' },
  ]

  return (
    <nav className="fixed bottom-[120px] left-0 right-0 z-30 flex justify-around border-t border-zinc-700 bg-black py-2 md:hidden">

      {opciones.map(({ nombre, icono: Icono, ruta }) => (
        <NavLink
          key={nombre}
          to={ruta}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-xs ${
              isActive ? 'text-green-400' : 'text-gray-400'
            }`
          }
        >
          <Icono size={21} />
          <span>{nombre}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default MobileNav