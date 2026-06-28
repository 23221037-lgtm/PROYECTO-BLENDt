import { Home, Library, Search } from 'lucide-react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  const menu = [
    { nombre: 'Inicio', icono: Home, ruta: '/' },
    { nombre: 'Buscar', icono: Search, ruta: '/buscar' },
    {
      nombre: 'Tu biblioteca',
      icono: Library,
      ruta: '/biblioteca',
    },
  ]

  return (
    <aside className="hidden min-h-screen w-64 bg-black p-6 text-white md:block">
      <h1 className="mb-10 text-3xl font-bold text-green-400">
        Blend
      </h1>

      <nav>
        <ul className="space-y-2">
          {menu.map(({ nombre, icono: Icono, ruta }) => (
            <li key={nombre}>
              <NavLink
                to={ruta}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-2 py-2 ${
                    isActive
                      ? 'bg-zinc-800 text-white'
                      : 'text-gray-300 hover:text-white'
                  }`
                }
              >
                <Icono size={22} />
                <span>{nombre}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar