import { Home, Library, Search } from 'lucide-react'

function Sidebar() {
  const menu = [
    { nombre: 'Inicio', icono: Home },
    { nombre: 'Buscar', icono: Search },
    { nombre: 'Tu biblioteca', icono: Library },
  ]

  return (
    <aside className="hidden min-h-screen w-64 bg-black p-6 text-white md:block">
      <h1 className="mb-10 text-3xl font-bold text-green-400">
        Blend
      </h1>

      <nav>
        <ul className="space-y-4">
          {menu.map(({ nombre, icono: Icono }) => (
            <li key={nombre}>
              <button className="flex w-full items-center gap-3 text-gray-300 hover:text-white">
                <Icono size={22} />
                <span>{nombre}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar