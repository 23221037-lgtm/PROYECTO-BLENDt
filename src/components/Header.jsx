import { ChevronLeft, ChevronRight, Search, User } from 'lucide-react'

function Header({ busqueda, onCambiarBusqueda }) {
  return (
    <header className="flex items-center gap-4 border-b border-zinc-800 bg-zinc-900 px-6 py-4">
      <div className="hidden gap-2 sm:flex">
        <button className="rounded-full bg-black p-2" title="Anterior">
          <ChevronLeft size={20} />
        </button>
        <button className="rounded-full bg-black p-2" title="Siguiente">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="relative w-full max-w-md">
        <Search
          size={19}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="search"
          value={busqueda}
          onChange={(event) => onCambiarBusqueda(event.target.value)}
          placeholder="Buscar canciones o artistas"
          aria-label="Buscar canciones o artistas"
          className="w-full rounded-full bg-white py-2 pl-10 pr-4 text-black outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <button className="ml-auto flex items-center gap-2 rounded-full bg-black px-4 py-2">
        <User size={18} />
        <span className="hidden sm:inline">Usuario</span>
      </button>
    </header>
  )
}

export default Header