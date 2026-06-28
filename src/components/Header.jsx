import { ChevronLeft, ChevronRight, User } from 'lucide-react'

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-6 py-4">
      <div className="flex gap-2">
        <button
          className="rounded-full bg-black p-2 hover:bg-zinc-700"
          title="Anterior"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          className="rounded-full bg-black p-2 hover:bg-zinc-700"
          title="Siguiente"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <button className="flex items-center gap-2 rounded-full bg-black px-4 py-2 hover:bg-zinc-700">
        <User size={18} />
        <span>Usuario</span>
      </button>
    </header>
  )
}

export default Header